import styled from 'styled-components/native'
import Animated from 'react-native-reanimated'
import { Dimensions } from 'react-native'
import { AnimatedText } from 'src/AnimatedText'

const { width: screenWidth } = Dimensions.get('window')

export const progressLineWidth = screenWidth * 0.9
export const circleSize = 30
export const circleInitialLeft = screenWidth * 0.05
export const circleBorderWithDefaultValue = 10
export const circleBorderWithMinimumValue = 2
export const circleBorderRadiusDefaultValue = 10
export const circleBorderRadiusMinimumValue = 20
const airBalloonWidth = 20
export const airBalloonHeight = 28

const progressLineHeight = 3

export const Container = styled(Animated.View)`
  width: 100%;
  align-items: center;
  border: 1px solid white;
`

export const ProgressBottomLine = styled.View`
  width: ${progressLineWidth}px;
  height: ${progressLineHeight}px;
  border-radius: 2px;
  background: #0000002D
`

export const ProgressLine = styled(Animated.View)`
  background: #6045B9FF;
  height: ${progressLineHeight}px;
  border-radius: 2px;
  position: absolute;
  z-index: 100;
  left: 0;
`

export const SwipeItemsContainer = styled(Animated.View)`
  position: absolute;
  left: ${(screenWidth - progressLineWidth) / 2}px;
  top: -${(circleSize - progressLineHeight) / 2}px;
  justify-content: center;
  align-items: center;
`

export const Circle = styled(Animated.View)`
  width: ${circleSize}px;
  height: ${circleSize}px;
  border-width: ${circleBorderWithDefaultValue}px;
  border-color: #6045B9FF;
  border-radius: ${circleBorderRadiusDefaultValue}px;
  background: white;
`

export const AirBalloonContainer = styled(Animated.View)`
  position: absolute;
`

export const ProgressText = styled(AnimatedText)`
  position: absolute;
  top: 5px;
  color: white;
  font-size: 8px;
  align-self: center
`