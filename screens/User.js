import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import ContactThumbnail from '../components/ContactThumbnail';
import colors from '../utility/colors';
import { fetchUserContact } from '../utility/api';

const User = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Function to load data
  const loadUserData = useCallback(() => {
    setLoading(true);
    fetchUserContact()
      .then((user) => {
        setUser(user);
        setLoading(false);
        setError(false);
        setRefreshing(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
        setRefreshing(false);
      });
  }, []);

  // Load data when component mounts
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadUserData();
  };

  const { avatar, name = 'User', phone = 'No phone available' } = user;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      {loading && <ActivityIndicator size="large" color={colors.white} />}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>An error occurred. Please try again.</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadUserData}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      {!loading && !error && (
        <>
          <ContactThumbnail avatar={avatar} name={name} phone={phone} large />
          <Text style={styles.welcomeText}>Welcome, {name}!</Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
    padding: 20,
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 18,
    color: colors.white,
  },
  errorContainer: {
    alignItems: 'center',
  },
  errorText: {
    color: colors.white,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryText: {
    color: colors.blue,
    fontWeight: 'bold',
  },
});

export default User;
