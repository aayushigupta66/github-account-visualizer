import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo';
import { token } from './Safe';
import { QueryResult, GET_REPOSITORY } from "./RepositoryParser"

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
 * Style sheet for repository screen.
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
    repoContainer: {
        paddingTop: '7%',
        paddingBottom: '5%',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    owner: {
        fontStyle: 'italic',
        color: '#E94B26',
    },
});

/**
 * Repository component that renders a screen that provides a list of the user's public repositories including
 * repository name, owner's username, and the description.
 */
export default function Repository() {
    return (
        <ApolloProvider client={client}>
            <View style={styles.container}>
                <Text style={styles.title}>Repositories</Text>
                <Query<QueryResult> query={GET_REPOSITORY}>
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
                                {data.viewer.repositories.nodes.map((repository, idx) => (
                                    <View key={idx} style={styles.repoContainer}>
                                        <View>
                                            <Text style={styles.name}>{repository.name}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.owner}>{repository.owner.login}</Text>
                                        </View>
                                        <View>
                                              <Text>{repository.description}</Text>
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
