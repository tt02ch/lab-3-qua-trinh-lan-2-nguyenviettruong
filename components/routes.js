import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Contacts from '../screens/Contacts'
import Profile from '../screens/Profile'
import Favorites from '../screens/Favourites';
import colors from '../utility/colors'
import { MaterialIcons } from '@expo/vector-icons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Options from '../screens/Options';
import User from '../screens/User';
const getDrawerItemIcon = icon => ({tintColor}) => (
    <MaterialIcons name={icon} size={22} style={{color: tintColor}} />
)

const getTabBarIcon = icon => ({tintColor}) => (
    <MaterialIcons name={icon} size={26} style={{color: tintColor}} />
)

const Stack = createStackNavigator();
const ContactsScreens = () => {
    return (
        <Stack.Navigator
            initialRouteName="Contacts"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'tomato' },
                headerTitleAlign: 'center',
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Contacts"
                component={Contacts}
                options={{ title: 'Contacts' }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={({ route }) => {
                    const { contact } = route.params;
                    const { name } = contact;
                    return {
                        title: name.split(' ')[0],
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: colors.blue,
                        },
                    };
                }}
            />
        </Stack.Navigator>
    );
};
const StackNavigation = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Contacts'
                screenOptions={{
                    headerTintColor: 'white',
                    headerStyle: {backgroundColor: 'tomato'},
                    headerTitleAlign: 'center',
                }}
            >
                <Stack.Screen name='Contacts' component={Contacts}
                    options={{title: "Contacts"}}/>
                <Stack.Screen 
                    name='Profile' 
                    component={Profile}
                    options={({route}) =>{
                        const {contact} = route.params;
                        const {name} = contact;
                        return {
                            title: name.split(' ')[0],
                            headerTintColor: 'white',
                            headerStyle:{
                                backgroundColor: colors.blue,
                            }
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
const FavoritesScreens = () =>
{
    return(
        <Stack.Navigator
            initialRouteName='Favorites'
            screenOptions={{
                headerShown:false
            }}
        >
            <Stack.Screen name='Favorites' component={Favorites}
                    options={{title: "Favorites"}}/>
            <Stack.Screen name='Profile' component={Profile}
                    options={{title: "Profile"}}/>
        </Stack.Navigator>
    )
}
const Drawer = createDrawerNavigator()
const DrawerNavigator = ()=>{
    return(
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName='ContactsScreens'
            >
                <Drawer.Screen name='ContactsScreens' component={ContactsScreens}
                    options={{
                        drawerIcon: getDrawerItemIcon('list'),
                    }}
                />
                <Drawer.Screen name='FavoritesScreens' component={FavoritesScreens}
                    options={{
                        drawerIcon: getDrawerItemIcon('star'),
                    }}
                />
                <Drawer.Screen name='UserScreens' component={UserScreens}
                    options={{
                        drawerIcon: getDrawerItemIcon('person'),
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
const UserScreens = ({navigation}) =>
{
    return(
        <Stack.Navigator
            initialRouteName='User'
        >
            <Stack.Screen name='User' component={User}
                options={{
                    headerTitle:"Me",
                    headerTintColor: 'white',
                    headerStyle:{
                        backgroundColor: colors.blue,
                    },
                    headerRight: ()=>(
                        <MaterialIcons
                            name='settings'
                            size={24}
                            style={{color: 'white', marginRight: 10}}
                            onPress={() => navigation.navigate('Options')}
                        />
                    )
                }}
            />
            <Stack.Screen name='Options' component={Options}
                options={{title: 'Options'}}/>
        </Stack.Navigator>
    )
}
const Tab = createMaterialBottomTabNavigator();
const TabNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="ContactsScreens"
                screenOptions={{
                    tabBarStyle: { backgroundColor: colors.blue },
                    tabBarActiveTintColor: colors.greyLight,
                    tabBarInactiveTintColor: colors.greyDark,
                    headerShown: false,  // Hide header for all screens in this navigator
                    contentContainerStyle: { marginTop: 20 } // This is less common for tab screens
                }}
            >
                <Tab.Screen
                    name="ContactsScreens"
                    component={ContactsScreens}
                    options={{
                        tabBarIcon: getTabBarIcon('list'),
                        tabBarLabel: 'Contacts',
                    }}
                />
                <Tab.Screen
                    name="FavoritesScreens"
                    component={FavoritesScreens}
                    options={{
                        tabBarIcon: getTabBarIcon('star'),
                        tabBarLabel: 'Favorites',
                    }}
                />
                <Tab.Screen
                    name="UserScreens"
                    component={UserScreens}
                    options={{
                        tabBarIcon: getTabBarIcon('person'),
                        tabBarLabel: 'User',
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
export default TabNavigation;