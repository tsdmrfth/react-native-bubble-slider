import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { BubbleSlider } from 'src/BubbleSlider'

export default function App() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'}/>
            <Text style={styles.titleText}>
                {`Choose\nballoon\nquantity`}
            </Text>
            <BubbleSlider/>
        </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 140,
        marginLeft: 20,
        marginBottom: 160
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})
