import { url } from "inspector";
import { CSSProperties } from "react";

export const headerStyle: CSSProperties =
{
    fontFamily: 'Just Another Hand',
    boxShadow: '1px 1px 5px #ccc',
    border: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    flexDirection: 'row',
    flexFlow: 'row',
    gap: '10%',
}

export const logoStyle: CSSProperties =
{
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '20px',
}

export const logoImgStyle: CSSProperties =
{
    height: '40px',
    width: '50px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: 'url(house_launcher_logo.svg)',
}

export const logoTextStyle: CSSProperties =
{
    whiteSpace: 'nowrap',
}

export const navBarStyle: CSSProperties =
{
    display: 'grid',
    alignItems: 'end',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    justifyContent: 'space-around',
    width: '100%',
}

export const hamburgerButtonStyle: CSSProperties =
{
    margin: '20px 20px',
}