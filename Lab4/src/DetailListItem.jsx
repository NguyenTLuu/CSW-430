import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

const DetailListItem = ({ icon, title, subtitle }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon name={icon} size={24} color="grey" />
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>
    );
};

DetailListItem.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
};

DetailListItem.defaultProps = {
    subtitle: '',
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#c0c0c0',
        backgroundColor: 'white',
    },
    iconContainer: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 14,
        color: 'grey',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: 'black',
        marginTop: 2,
    },
});

export default DetailListItem;
