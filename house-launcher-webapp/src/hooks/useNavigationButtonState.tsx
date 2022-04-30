import { CSSProperties, MouseEvent } from 'react';
import { useState } from 'react';
import { useSpring } from 'react-spring';

export const useNavigationButtonState = (navigationButtonCss: CSSProperties) => {
    const [currentButtonHighlight, setCurrentButtonHighlight] = useState(navigationButtonCss);
    const [currentButtonBeingHoveredOn, setCurrentButtonBeingHoveredOn] = useState(false);
    const [styles, api] = useSpring(() => (navigationButtonCss))

    const handleButtonHighlight = (event: MouseEvent<HTMLButtonElement>) => {
        api.start({
            ...currentButtonHighlight,
            backgroundColor: currentButtonBeingHoveredOn ? 'white': 'aliceblue',
            color: currentButtonBeingHoveredOn ? 'black' :  'darkblue',
        });

        setCurrentButtonBeingHoveredOn(!currentButtonBeingHoveredOn);
    }

    return {
        currentButtonHighlight,
        currentButtonBeingHoveredOn,
        handleButtonHighlight,
        styles,
    }
}