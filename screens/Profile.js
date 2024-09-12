import React, { useMemo } from 'react';
import { StyleSheet, View, Text, Linking, TouchableOpacity } from 'react-native';
import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';
import colors from '../utility/colors';

const Profile = ({ route }) => {
  const { contact } = route.params || {};
  const { avatar = '', name = 'No name available', email = 'No email available', phone = 'No phone available', cell = 'No cell available' } = contact || {};

  const handleEmailPress = () => {
    if (email !== 'No email available') {
      Linking.openURL(`mailto:${email}`);
    }
  };

  const handlePhonePress = (number) => {
    if (number !== 'No phone available' && number !== 'No cell available') {
      Linking.openURL(`tel:${number}`);
    }
  };

  const contactDetails = useMemo(() => (
    <>
      <DetailListItem icon="mail" title="Email" subtitle={email} onPress={handleEmailPress} />
      <DetailListItem icon="phone" title="Work" subtitle={phone} onPress={() => handlePhonePress(phone)} />
      <DetailListItem icon="smartphone" title="Personal" subtitle={cell} onPress={() => handlePhonePress(cell)} />
    </>
  ), [email, phone, cell]);

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThumbnail avatar={avatar} name={name} phone={phone} large />
      </View>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.detailsSection}>
        {contactDetails}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
    paddingVertical: 20,
  },
  header: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
});

export default Profile;
