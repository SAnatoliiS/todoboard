import React from 'react';
import logoUrl from './logo.jpg';

function Header() {
	return (
		<div>
			<img src={logoUrl} width="63" height="57" alt="logo" />
		</div>
	);
}

export default Header;
