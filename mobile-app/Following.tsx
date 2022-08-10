import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo';
import { token } from './Safe';
import { QueryResult, GET_FOLLOWING } from "./FollowingParser"

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
 * Style sheet for following screen.
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
 * Following component that renders a screen that provides a list of the user's following including
 * avatar picture, name, and username.
 */
export default function Following() {
    return (
        <ApolloProvider client={client}>
            <View style={styles.container}>
                <Text style={styles.title}>Following</Text>
                <Query<QueryResult> query={GET_FOLLOWING}>
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
                                {data.viewer.following.nodes.map((following, idx) => (
                                    <View key={idx} style={styles.followingContainer}>
                                        <View style={styles.picContainer}>
                                            <Image source={{uri: following.avatarUrl}} style={styles.profilePic}/>
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.name}>{following.name}</Text>
                                            <Text style={styles.login}>{following.login}</Text>
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

