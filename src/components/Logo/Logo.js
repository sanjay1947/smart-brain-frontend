import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.png';

//  since component with no states pure function
const Logo = () => {
	return (
		// https://tachyons.io/docs/layout/spacing/
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 100 }} style={{ height: 150, width: 150 }} >
			 	<div className="Tilt-inner pa3"> 
			 		<img style={{paddingTop: '5px'}} alt='logo' src={brain}/> 
			 	</div>
			</Tilt>
		</div>

	);
}

export default Logo;