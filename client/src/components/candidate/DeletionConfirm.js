import React, { Component } from 'react'

export default class DeletionConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletionConfirm: false
    };
  }

  delete = () => {
    if (this.state.deletionConfirm) {
      this.props.onDelete(this.props.linkId);
    }

    this.setState({ deletionConfirm: true });
  };

  cancelDelete = () => {
    this.setState({ deletionConfirm: false });
  };

  render() {
    return (
      <div style={this.props.style}>
        {this.state.deletionConfirm ? (
          <button style={{ marginRight: '1em' }} onClick={this.cancelDelete}>
            Abort
          </button>
        ) : null}
        <button onClick={this.delete}>
          {this.state.deletionConfirm ? 'Confirm' : 'Delete'}
        </button>
      </div>
    );
  }
}
