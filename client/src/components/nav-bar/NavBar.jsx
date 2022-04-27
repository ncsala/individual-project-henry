import React from 'react'
import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.css'

const NavBar = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                {/* el navlink se utiliza para saber si esta activo o no */}
                <ul className={styles.links__ul}>
                    <NavLink
                        className={styles.links__a}
                        // className={({ isActive }) => {
                        //     return isActive ? 'is-active' : '';
                        // }}
                        to='/recipes'
                    >
                        Home
                    </NavLink>
                    <NavLink className={styles.links__a} to='/recipe'>
                        Crear Receta
                    </NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar;