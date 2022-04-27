import React from 'react';

import { Link } from 'react-router-dom';

import styles from './LandingPage.module.css';

// Pagina inicial: deben armar una landing page con
// Alguna imagen de fondo representativa al proyecto
// Botón para ingresar al home (Ruta principal)
const LandingPage = () => {
    return (
        <main className={styles.main_landing}>
            <h1>Buscador de Recetas de Cocina</h1>
            <Link to={'/recipes'}>
                <button>Ingresar</button>
            </Link>
        </main>
    );
};

export default LandingPage;
