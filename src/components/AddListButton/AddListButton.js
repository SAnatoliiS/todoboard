import React, { Component } from 'react'

const RenderSmallButton = ({expandButton}) => (<div onClick={expandButton}>
  Add a list...
</div>)

class RenderForm extends Component {
  state = {
    name: ''
  }

  onChange = (e) => {
    const name = e.target.value;
		this.setState({ name });
  }

  onSubmit = e => {
    e.preventDefault();
		// this.props.addList(this.state.name);
		this.props.collapseButton();
		this.setState({ name: '' });
  };
  
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type='text' value={this.state.name} onChange={this.onChange}/>
      </form>
    )
  }
}

export class AddListButton extends Component {
  state = {
    view: 'small',
    name: ''
  }
  expandButton = () => {
		this.setState({ view: 'full' });
	};

	collapseButton = () => {
		this.setState({ view: 'small' });
	};

  render() {
    switch (this.state.view) {
      case 'small':
        return (
      <RenderSmallButton expandButton={this.expandButton} />
    );
    case 'full':
    return <RenderForm collapseButton={this.collapseButton} />
    }
     
  }
}

export default AddListButton
