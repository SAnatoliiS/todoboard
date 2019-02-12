import React from 'react';
import { Link} from 'react-router-dom'
import logoUrl from './logo.jpg';

function Header() {
	return (
		<div>
			<Link to="/">
			<img src={logoUrl} width="63" height="57" alt="logo" />
			</Link>
			
		</div>
	);
}

export default Header;
