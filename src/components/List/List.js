import React from 'react';

const RenderList = ({ list }) => {
	return (
		<div>
			<div>{list.name}</div>
			<hr />
		</div>
	);
};

export default RenderList;
