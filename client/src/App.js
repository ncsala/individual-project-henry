import React from 'react';
// import './normalize.css';

// React Router Dom
import { Route, Routes, useParams } from 'react-router-dom';

// Componentes
import LandingPage from './components/landing/LandingPage';
import Home from './components/home/Home';
import NavBar from 'components/nav-bar/NavBar';
import CreateRecipe from 'components/create-recipe/CreateRecipe';

import './App.css';

function App() {
	const { id } = useParams();

	return (
		<>
			<NavBar />
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/recipes' element={<Home />} />
				{/* <Route path='/recipe'></Route> */}
				<Route path='/recipes/:id' />
				<Route path='/recipe' element={<CreateRecipe />} />
				{/* Este es un 404 soft */}
				{/* En realidad para devolver un 404 hay q hacerlo desde el servidor */}
				<Route path='*' element={<h1>404 Not Found</h1>} />
				{/* se podria redirigir a una path 404 */}
			</Routes>
		</>
	);
}

export default App;
