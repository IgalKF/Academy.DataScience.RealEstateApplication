import * as styles from './Header.Navigation.Button.Styles';
import { useNavigationButtonState } from 'hooks/useNavigationButtonState';
import { animated } from 'react-spring';

type headerNavigationButtonProps = {
    buttonText: string;
}
const HeaderNavigationButton = ({ buttonText }: headerNavigationButtonProps) => {
    const navigationButtonState = useNavigationButtonState(styles.headerNavigationButtonStyle);
    
    return (
        <animated.button
            onMouseOut={navigationButtonState.handleButtonHighlight}
            onMouseEnter={navigationButtonState.handleButtonHighlight}
            style={navigationButtonState.styles}>
            {buttonText}
        </animated.button>
    )
}

export default HeaderNavigationButton;