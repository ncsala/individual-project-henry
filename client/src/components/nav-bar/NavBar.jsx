import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css'

const NavBar = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                {/* el navlink indica se utiliza para saber si esta activo o no */}
                <ul className={styles.links__ul}>
                    <NavLink
                        className={styles.links__a}
                        // className={({ isActive }) => {
                        //     return isActive ? 'is-active' : '';
                        // }}
                        to='/'
                    >
                        Home
                    </NavLink>
                    <NavLink className={styles.links__a} to='/types'>
                        Crear Receta
                    </NavLink>
                </ul>
            </nav>
        </header>
    )
}


// <li className="nav-item active">
//     <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
// </li>
// <li className="nav-item">
//     <a className="nav-link" href="#">Features</a>
// </li> 

export default NavBar;