import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

const ContactThumbnail = ({ name, phone, avatar, textColor, onPress }) => {
  const colorStyle = {
    color: textColor,
  };

  // Fallback avatar nếu không có URL hoặc ảnh lỗi
  const defaultAvatar = 'https://via.placeholder.com/90';  // Đường dẫn ảnh mặc định

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} disabled={!onPress}>
        <Image
          source={{
            uri: avatar || defaultAvatar,
          }}
          style={styles.avatar}
        />
      </TouchableOpacity>
      {name !== '' && <Text style={[styles.name, colorStyle]}>{name}</Text>}

      {phone !== '' && (
        <View style={styles.phoneSection}>
          <Icon name="phone" size={16} style={[styles.icon, colorStyle]} />
          <Text style={[styles.phone, colorStyle]}>{phone}</Text>
        </View>
      )}
    </View>
  );
};

export default ContactThumbnail;

ContactThumbnail.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  phone: PropTypes.string,
  textColor: PropTypes.string,
  onPress: PropTypes.func,
};

ContactThumbnail.defaultProps = {
  name: '',
  phone: '',
  avatar: '',
  textColor: 'white',
  onPress: null,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: 'white',
    borderWidth: 2,
  },
  name: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  phoneSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  phone: {
    marginLeft: 8,
    fontSize: 16,
  },
  icon: {
    marginRight: 4,
  },
});
