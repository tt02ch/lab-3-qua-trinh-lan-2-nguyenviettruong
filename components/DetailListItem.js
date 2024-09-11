import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../utility/colors';

const DetailListItem = ({icon, title, subtitle }) =>
{   
    return (
        <View  style={styles.borderContainer}>
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    {icon && (
                        <Icon
                            name={icon}
                            size={24}
                            style={{
                                color: colors.black,
                                marginRight: 20,
                            }}
                            />
                    )}
                    <View style={styles.contentContainer}>
                        <Text style={[styles.title]}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default DetailListItem;

DetailListItem.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
};

const styles = StyleSheet.create({
    borderContainer: {
        paddingLeft: 24,
    },
    wrapper: {
        flexDirection: 'row',
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 24,
        borderBottomColor: colors.grey,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    contentContainer: {
        justifyContent: 'center',
        width:'100%'
    },
    title: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 4,
    },
    subtitle:{
        color:'black'
    }
});