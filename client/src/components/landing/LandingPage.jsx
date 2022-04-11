import React from 'react';

//React Router DOM
import { Link } from 'react-router-dom';


// Pagina inicial: deben armar una landing page con
// Alguna imagen de fondo representativa al proyecto
// Botón para ingresar al home (Ruta principal)
const LandingPage = () => {
    return (
        <div>
            <h1>Buscador de Recetas de Cocina</h1>
            <Link to={'/recipes'}>
                <button>Ingresar</button>
            </Link>
        </div>
    );
};

export default LandingPage;
