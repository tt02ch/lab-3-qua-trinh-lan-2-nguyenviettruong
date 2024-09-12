import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../utility/colors';

const DetailListItem = ({ icon, title, subtitle }) => {
  return (
    <View style={styles.borderContainer}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          {icon && (
            <Icon
              name={icon}
              size={24}
              style={styles.icon}
            />
          )}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
      </View>
    </View>
  );
};

DetailListItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,  // title bắt buộc
  subtitle: PropTypes.string,
};

DetailListItem.defaultProps = {
  icon: null,
  subtitle: '',  // Mặc định subtitle là chuỗi rỗng
};

export default DetailListItem;

const styles = StyleSheet.create({
  borderContainer: {
    paddingLeft: 24,
  },
  wrapper: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingRight: 24,
    borderBottomColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: colors.black,
    marginRight: 20,
  },
  contentContainer: {
    justifyContent: 'center',
    flexShrink: 1, // Đảm bảo nội dung không vượt quá khung
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 4,
  },
  subtitle: {
    color: colors.black,
    marginTop: 2,
    fontSize: 13,
  },
});
