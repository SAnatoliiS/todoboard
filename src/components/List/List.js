import React from 'react';

class RenderList extends React.Component {
	state = {
		text: ''
	}
	onChange = (e) => {
		const text = e.target.value;
		this.setState({text});
	}
	render() {
		const { list } = this.props;
		return (
		<div>
			<div>{list.name}</div>
			<hr />
			{/* <form>
				<input type="text" value={this.state.text} onChange={this.onChange}/>
			</form> */}
		</div>
	);
	}
	
};

export default RenderList;
