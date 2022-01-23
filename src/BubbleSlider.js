import React from 'react'
import { Dimensions } from 'react-native'
import {
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    withTiming,
    Easing,
    withSpring
} from 'react-native-reanimated'
import {
    Container,
    ProgressBottomLine,
    ProgressLine,
    circleSize,
    AirBalloonContainer,
    Circle,
    SwipeItemsContainer,
    circleBorderWithDefaultValue,
    circleBorderWithMinimumValue,
    circleBorderRadiusMinimumValue,
    progressLineWidth,
    airBalloonHeight
} from 'src/BubbleSlider.styled'
import { PanGestureHandler } from 'react-native-gesture-handler'
import AirBalloon from 'src/AirBalloon'

const { width: screenWidth } = Dimensions.get('window')
const circleTranslateXMinimumValue = -1
const circleTranslateXMaximumValue = (screenWidth * 0.9) - circleSize
const airBalloonMaximumScaleValue = 2.3

const clamp = (value, lowerBound, upperBound) => {
    'worklet'
    return Math.min(Math.max(lowerBound, value), upperBound)
}

const mix = (value, x, y) => {
    'worklet'
    return x * (1 - value) + y * value
}

export const BubbleSlider = () => {
    const translationX = useSharedValue(-1)
    const airBalloonTranslateX = useSharedValue(-1)
    const airBalloonRotate = useSharedValue(0)
    const swipeStateChangeProgress = useSharedValue(0)
    const progress = useSharedValue(0)
    const onGestureEvent = useAnimatedGestureHandler({
        onActive: (event, context) => {
            translationX.value = clamp(
                event.translationX + context.startX,
                circleTranslateXMinimumValue,
                circleTranslateXMaximumValue
            )
            progress.value = interpolate(
                translationX.value,
                [circleTranslateXMinimumValue, circleTranslateXMaximumValue],
                [0, 100]
            ).toFixed(0)
            const airBalloonSpacing = interpolate(
                event.velocityX,
                [-500, 500],
                [40, -40]
            )
            airBalloonRotate.value = withSpring(
                interpolate(
                    event.velocityX,
                    [-500, 500],
                    [30, -30]
                )
            )
            airBalloonTranslateX.value = translationX.value + airBalloonSpacing
        },
        onStart: (_, context) => {
            context.startX = translationX.value
            swipeStateChangeProgress.value = withTiming(1, {
                duration: 600,
                easing: Easing.elastic(1.00002)
            })
        },
        onEnd: () => {
            airBalloonTranslateX.value = withTiming(translationX.value)
            airBalloonRotate.value = withTiming(0)
            swipeStateChangeProgress.value = withTiming(0, {
                duration: 400,
                easing: Easing.elastic(1.00002)
            })
        }
    }, [])
    const circleStyle = useAnimatedStyle(() => {
        return {
            borderWidth: mix(
                swipeStateChangeProgress.value,
                circleBorderWithDefaultValue,
                circleBorderWithMinimumValue
            ),
            borderRadius: mix(
                swipeStateChangeProgress.value,
                circleBorderWithDefaultValue,
                circleBorderRadiusMinimumValue
            ),
            transform: [
                {
                    translateX: translationX.value
                }
            ]
        }
    }, [])
    const progressLineStyle = useAnimatedStyle(() => {
        return {
            width: interpolate(
                progress.value,
                [0, 100],
                [0, progressLineWidth]
            )
        }
    }, [])
    const airBalloonContainerStyle = useAnimatedStyle(() => {
        return {
            opacity: mix(
                swipeStateChangeProgress.value,
                0,
                1
            ),
            transform: [
                {
                    translateX: airBalloonTranslateX.value
                },
                {
                    translateY: mix(
                        swipeStateChangeProgress.value,
                        0,
                        -airBalloonHeight * airBalloonMaximumScaleValue * 0.9
                    )
                },
                {
                    scale: mix(
                        swipeStateChangeProgress.value,
                        1,
                        airBalloonMaximumScaleValue
                    )
                },
                {
                    rotate: `${airBalloonRotate.value}deg`
                }
            ]
        }
    }, [])

    return (
        <Container>
            <ProgressBottomLine>
                <ProgressLine style={progressLineStyle}/>
            </ProgressBottomLine>
            <PanGestureHandler {...{ onGestureEvent }}>
                <SwipeItemsContainer>
                    <Circle style={circleStyle}/>
                    <AirBalloonContainer style={airBalloonContainerStyle}>
                        <AirBalloon progressText={progress}/>
                    </AirBalloonContainer>
                </SwipeItemsContainer>
            </PanGestureHandler>
        </Container>
    )
}

BubbleSlider.displayName = 'BubbleSlider'