import React from 'react'
import { TextInput } from 'react-native'
import Animated, { useAnimatedProps } from 'react-native-reanimated'

Animated.addWhitelistedNativeProps({ text: true })

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

export const AnimatedText = ({ text, ...rest }) => {
    const animatedProps = useAnimatedProps(() => {
        return {
            text: text.value.toString()
        }
    })

    return (
        <AnimatedTextInput
            {...rest}
            editable={false}
            {...{ animatedProps }}
            underlineColorAndroid="transparent"/>
    )
}