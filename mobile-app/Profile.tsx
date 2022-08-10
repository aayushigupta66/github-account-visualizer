import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Button } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo';
import { token } from "./Safe";
import { QueryResult, GET_PROFILE } from "./ProfileParser"

/**
 * Apollo client connecting to API.
 */
const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: {
        authorization: `Bearer ` + token,
    },
});

/**
 * Style sheet for profile screen.
 */
const styles = StyleSheet.create({
    container: {
        paddingTop: '15%',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    profileContainer: {
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    profilePic: {
        width: 200,
        height: 200,
    },
    picContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '5%',
        paddingBottom: '5%',
    },
    name: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#E94B26',
        paddingTop: '7%',
    },
    login: {
        fontSize: 15,
        fontStyle: 'italic',
        paddingTop: '2%',
    },
    bio: {
        paddingTop: '7%',
    },
    urlContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '10%'
    },
    websiteUrl: {
        paddingLeft: '3%'
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '3%'
    },
    email: {
        paddingLeft: '3%'
    },
    createdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '3%',
        paddingBottom: '10%'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#E94B26',
        paddingLeft: '5%'
    }
});

/**
 * Profile component that renders a screen that provides the current user's avatar, name, username, bio, website, email,
 * public repository count, followers count, following count, and profile creation date.
 */
export default class Profile extends React.Component<{ navigation: any }> {
    render() {
        let { navigation: any } = this.props;
        return (
            <ApolloProvider client={client}>
                <View style={styles.container}>
                    <Query<QueryResult> query={GET_PROFILE}>
                        {({data, loading, error}) => {
                            if (!data || !data.viewer) {
                                return null;
                            }
                            if (error) {
                                return <View>{error.toString()}</View>;
                            }
                            if (loading) {
                                return <View>Loading...</View>;
                            }
                            return (
                                <View style={styles.profileContainer}>
                                    <View style={styles.picContainer}>
                                        <Image source={{uri: data.viewer.avatarUrl}} style={styles.profilePic}/>
                                    </View>
                                    <View>
                                        <Text style={styles.name}>{data.viewer.name}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.login}>{data.viewer.login}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.bio}>{data.viewer.bio}</Text>
                                    </View>
                                    <View style={styles.urlContainer}>
                                        <MaterialCommunityIcons name="web" color={'#E94B26'} size={20}/>
                                        <Text style={styles.websiteUrl}>{data.viewer.websiteUrl}</Text>
                                    </View>
                                    <View style={styles.emailContainer}>
                                        <MaterialCommunityIcons name="email" color={'#E94B26'} size={20}/>
                                        <Text style={styles.email}>{data.viewer.email}</Text>
                                    </View>
                                    <View style={styles.createdContainer}>
                                        <MaterialCommunityIcons name="calendar-week-begin" color={'#E94B26'} size={20}/>
                                        <Text style={styles.email}>{data.viewer.createdAt}</Text>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <MaterialCommunityIcons name="book" color={'#E94B26'} size={20}/>
                                        <Text style={styles.buttonText}>{data.viewer.repositories.totalCount}</Text>
                                        <Button
                                            color='#E94B26'
                                            title="Repositories"
                                            onPress={() => this.props.navigation.navigate('Repository')}
                                        />
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <MaterialCommunityIcons name="account-group" color={'#E94B26'} size={20}/>
                                        <Text style={styles.buttonText}>{data.viewer.followers.totalCount}</Text>
                                        <Button
                                            color='#E94B26'
                                            title="Followers"
                                            onPress={() => this.props.navigation.navigate('Followers')}
                                        />
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <MaterialCommunityIcons name="account-check" color={'#E94B26'} size={20}/>
                                        <Text style={styles.buttonText}>{data.viewer.following.totalCount}</Text>
                                        <Button
                                            color='#E94B26'
                                            title="Following"
                                            onPress={() => this.props.navigation.navigate('Following')}
                                        />

                                    </View>
                                </View>
                            );
                        }}
                    </Query>
                </View>
            </ApolloProvider>
        )
    }
};

