import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Button,
  Image,
} from 'react-native';
import { fetchContacts } from '../utility/api';
import ContactThumbnail from '../components/ContactThumbnail';

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
  // State
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Load data
  const loadFavorites = useCallback(() => {
    setLoading(true);
    fetchContacts()
      .then((contacts) => {
        setContacts(contacts);
        setLoading(false);
        setError(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // Filter only favorite contacts
  const favorites = useMemo(
    () => contacts.filter((contact) => contact.favorite),
    [contacts]
  );

  const renderFavoriteThumbnail = useCallback(({ item }) => {
    const { avatar } = item;
    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigation.navigate('Profile', { contact: item })}
      />
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="blue" />}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load contacts.</Text>
          <Button title="Retry" onPress={loadFavorites} />
        </View>
      )}
      {!loading && !error && (
        <>
          {favorites.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image
                style={styles.emptyImage}
                source={require('../assets/icon.png')}
              />
              <Text style={styles.emptyText}>No favorite contacts found.</Text>
            </View>
          ) : (
            <FlatList
              data={favorites}
              keyExtractor={keyExtractor}
              numColumns={3}
              contentContainerStyle={styles.list}
              renderItem={renderFavoriteThumbnail}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 40,
  },
  list: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  emptyImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export default Favorites;
