import React from 'react';
import './App.css';

// React Router Dom
import { NavLink, Route, Routes, useParams } from 'react-router-dom';

// Componentes
import LandingPage from './components/landing/LandingPage';
import Home from './components/home/Home';

function App() {
	const { id } = useParams();

	return (
		<div className='App-header'>
			<header>
				<h1>Esto se renderiza en todos lados</h1>
				<ul>
					<li>
						{/* el navlink indica se utiliza para saber si esta activo o no */}
						<NavLink
							className={({ isActive }) => {
								return isActive ? 'is-active' : '';
							}}
							to='/'
						>
							LandingPage
						</NavLink>
					</li>
				</ul>
			</header>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/recipes' element={<Home />} />
				{/* <Route path='/recipe'></Route> */}
				<Route path='/recipes/:id' />
				{/* Este es un 404 soft */}
				{/* En realidad para devolver un 404 hay q hacerlo desde el servidor */}
				<Route path='*' element={<h1>404 Not Found</h1>} />
				{/* se podria redirigir a una path 404 */}
			</Routes>
		</div>
	);
}

export default App;
