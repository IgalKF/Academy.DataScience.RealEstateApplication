import HeaderNavigationButton from 'components/Header.Navigation.Button/Header.Navigation.Button';
import * as styles from './Header.Styles';

type headerProps = {
}

const Header = ({ }: headerProps) => {
    return (
        <div className='header' style={styles.headerStyle}>
            <div style={styles.logoStyle} className='logo'>
                <div style={styles.logoImgStyle}></div>
                <div style={styles.logoTextStyle}><h3>House Launcher</h3></div>
            </div>
            <nav className="nav-bar" style={styles.navBarStyle}>
                <HeaderNavigationButton buttonText='Home' />
                <HeaderNavigationButton buttonText='Find a rocket' />
                <HeaderNavigationButton buttonText='Contact us' />
                <HeaderNavigationButton buttonText='About' />
            </nav>
            <div className='hamburger-button' style={styles.hamburgerButtonStyle}>
                <div className="hamburger-layer"></div>
                <div className="hamburger-layer"></div>
                <div className="hamburger-layer"></div>
            </div>
        </div>
    )
}

export default Header;