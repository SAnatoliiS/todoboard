import React from 'react';
import { Link } from 'react-router-dom';
// import logoUrl from './logo.jpg';

function Header() {
	return (
		<Link className="header" to="/">
			{/* <img
					className="header-image"
					src={logoUrl}
					width="63"
					height="57"
					alt="logo"
				/> */}
		</Link>
	);
}

export default Header;
