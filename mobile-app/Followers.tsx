import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo';
import { token } from './Safe';
import { QueryResult, GET_FOLLOWERS } from "./FollowerParser"

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
 * Style sheet for followers screen.
 */
const styles = StyleSheet.create({
    container: {
        paddingTop: '15%',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#E94B26',
        paddingTop: '5%',
    },
    followingContainer: {
        paddingTop: '10%',
        flexDirection: 'row'
    },
    textContainer: {
        paddingTop: '3%',
        paddingLeft: '7%'
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    login: {
        fontStyle: 'italic',
        color: '#E94B26',
    },
    profilePic: {
        width: 75,
        height: 75,
    },
    picContainer: {

    },
});

/**
 * Followers component that renders a screen that provides a list of the user's following including
 * avatar picture, name, and username.
 */
export default function Followers() {
    return (
        <ApolloProvider client={client}>
            <View style={styles.container}>
                <Text style={styles.title}>Followers</Text>
                <Query<QueryResult> query={GET_FOLLOWERS}>
                    {({ data, loading, error }) => {
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
                            <View>
                                {data.viewer.followers.nodes.map((follower, idx) => (
                                    <View key={idx} style={styles.followingContainer}>
                                        <View style={styles.picContainer}>
                                            <Image source={{uri: follower.avatarUrl}} style={styles.profilePic}/>
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.name}>{follower.name}</Text>
                                            <Text style={styles.login}>{follower.login}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        );
                    }}
                </Query>
            </View>
        </ApolloProvider>
    )
};