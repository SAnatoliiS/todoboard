import React, { Component } from "react";
import { connect } from "react-redux";
import { addList } from "../../actions/listsActions";

const mapDispatchToProps = dispatch => ({
  addList: (name, boardId) => dispatch(addList(name, boardId))
});

const RenderSmallButton = ({ expandButton }) => (
  <div onClick={expandButton}>Add a list...</div>
);

class Form extends Component {
  state = {
    name: ""
  };

  onChange = e => {
    const name = e.target.value;
    this.setState({ name });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addList(this.state.name, this.props.boardId);
    this.props.collapseButton();
    this.setState({ name: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.onChange}
            placeholder="Add a list..."
          />
        </form>
        <span onClick={this.props.collapseButton}>x</span>
      </div>
    );
  }
}

const RenderForm = connect(
  null,
  mapDispatchToProps
)(Form);

export class AddListButton extends Component {
  state = {
    view: "small"
  };
  expandButton = () => {
    this.setState({ view: "full" });
  };

  collapseButton = () => {
    this.setState({ view: "small" });
  };

  render() {
    switch (this.state.view) {
      case "small":
        return <RenderSmallButton expandButton={this.expandButton} />;
      case "full":
        return (
          <RenderForm
            collapseButton={this.collapseButton}
            boardId={this.props.boardId}
          />
        );
      default:
        return <RenderSmallButton expandButton={this.expandButton} />;
    }
  }
}

export default AddListButton;
