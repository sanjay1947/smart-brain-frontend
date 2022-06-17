import React from 'react';


//  since component with no states pure function
const Navigation = ( {onRouteChange, isSignedIn}) => {
	
		if(isSignedIn) {
			return (
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				{/* use of tachyons library here*/}
				<p
					// on route change if we click on sign out it goes to sign out page 
					onClick={() => onRouteChange('signout')} 
					className='f3 link dim black underline pa3 pointer'>Sign Out 
				</p>
				</nav>
			);	
		}
		else {
			return (
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					{/* use of tachyons library here*/}
					<p
						// on route change if we click on sign in it goes to sign in page
						onClick={() => onRouteChange('signin')} 
						className='f3 link dim black underline pa3 pointer'>Sign In 
					</p>
					{/* use of tachyons library here*/}
					<p
						// on route change if we click on register it goes to register page 
						onClick={() => onRouteChange('register')} 
						className='f3 link dim black underline pa3 pointer'>Register 
					</p>
				</nav>
			);
		}
}

export default Navigation;

