import React from 'react';
import { Text, View } from "react-native";

/**
 * Temporary home component that renders a screen that welcomes the user.
 */
export default class Home extends React.Component<{ navigation: any }> {
    render() {
        let { navigation: any } = this.props;
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Welcome to Github!</Text>
            </View>
        );
    }
}