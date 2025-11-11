import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchContactsSuccess } from './Store';
import { mapContacts } from './Store';
import { View, FlatList, StyleSheet } from 'react-native';
import ContactListItem from './ContactListItem';

const keyExtractor = ({ phone }) => phone;

const fetchContacts = async () => {
    const data = await fetch('https://randomuser.me/api/?results=50');
    const ContactData = await data.json();
    return ContactData.results.map(mapContacts);
};

const Contacts = ({ navigation }) => {
    const { contacts } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchContacts()
            .then(contacts => {
                dispatch(fetchContactsSuccess(contacts));
            })
            .catch(e => {});
    }, []);

    const rederContacts = ({ item }) => {
        const { name, avatar, phone } = item;
        return (
            <ContactListItem
                name={name}
                avatar={avatar}
                phone={phone}
                onPress={() =>
                    navigation.navigate('ProfileContact', { contact: item })
                }
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={keyExtractor}
                renderItem={rederContacts}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
});

export default Contacts;
