import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { View } from 'react-native'
import { ProgressText } from 'src/BubbleSlider.styled'

function AirBalloon({ children, progressText, ...rest }) {
    return (
        <View>
            <Svg
                {...rest}
                width={20}
                fill="none"
                height={28}>
                <Path
                    fill="#6045B9"
                    d="M13.333 23.333h-.532l-.4-3.142C16.655 18.971 20 14.637 20 9.8 20 4.396 15.514 0 10 0S0 4.396 0 9.8c0 4.837 3.344 9.17 7.6 10.391l-.401 3.142h-.532a.471.471 0 00-.477.467c0 .258.213.467.477.467h.539l-.46.674a.46.46 0 00.133.647.481.481 0 00.66-.129l.08-.118V26.6c0 .772.641 1.4 1.429 1.4h1.904c.788 0 1.429-.628 1.429-1.4v-1.259l.08.118a.478.478 0 00.66.13.46.46 0 00.132-.648l-.459-.674h.54c.263 0 .476-.21.476-.467a.471.471 0 00-.477-.467zM11.43 26.6a.472.472 0 01-.477.467H9.048a.472.472 0 01-.477-.467v-2.333h.953v.933c0 .258.213.467.476.467s.476-.21.476-.467v-.933h.953V26.6zm-3.27-3.267l.373-2.927c.327.057.658.095.992.113V21a.471.471 0 00-.476.467c0 .257.212.466.476.466h.952a.471.471 0 00.476-.466.471.471 0 00-.476-.467v-.48c.334-.02.665-.057.992-.114l.373 2.927H8.16z"/>
            </Svg>
            <ProgressText text={progressText}/>
        </View>
    )
}

export default AirBalloon