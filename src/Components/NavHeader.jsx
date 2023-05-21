import React, { useEffect, useState } from 'react';
import '../assets/styles/Header.css';
const themes = {
    'Water': '#00BFFF',
    'Fire': '#FF4500',
    'Plant': '#00FF00',
    'Dark': '#333',
}

const marginBottom = { marginBottom: '20px' }
const NavHeader = () => {
    const [theme, setTheme] = useState(null);
    const onClickGetKey = (key) => {

        localStorage.setItem('theme', key);
        setTheme(localStorage.getItem('theme'));
    }
    useEffect(() => {
        if (localStorage.getItem('theme') !== undefined) {
            setTheme(localStorage.getItem('theme'));
        } else {

            localStorage.setItem('theme', 'Dark')
        }

    }, [])

    return (
        <header style={{
            backgroundColor: themes[theme],
            height: '75px',
            alignItems: 'center',
            display: 'flex'
        }}>
            <div className='navigationMenu'>
                <nav>
                    <div className="menu-toggle">
                        <input type="checkbox" name="" id="" />

                    </div>
                    <ul className="menu">

                        <li>
                            <a href="#">Pokedex</a>
                            <ul className="submenu">
                                <li><button onClick={() => onClickGetKey('Water')} className='buttonNav'>Water</button></li>
                                <li><button onClick={() => onClickGetKey('Fire')} className='buttonNav'>Fire</button></li>
                                <li><button onClick={() => onClickGetKey('Plant')} className='buttonNav'>Plant</button></li>
                                <li style={marginBottom}><button onClick={() => onClickGetKey('Dark')} className='buttonNav'>Dark</button></li>
                                <li style={marginBottom}><a href="https://github.com/badluckxiii/pokedex" className='buttonNav separator' target='_blank'>Github repository</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>

            </div>
            <div style={{
                width: '30%',
                textAlign: 'right'

            }}>
                <input placeholder='Search a pokemon...' style={{ marginRight: '50px', borderRadius: '15px' }} type="text" name="" id="" />

            </div>
        </header>
    )
}

export default NavHeader