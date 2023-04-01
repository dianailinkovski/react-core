import React, { Component } from "react";
import axios from "axios";

export default class DeleteCat extends Component {
  state = {
    id: 0
  };

  handelChange = event => {
    this.setState({ id: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      //put to submit
      .delete(`https://jsonplaceholder.typicode.com/users/${this.state.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Person ID:
          <input type="number" name="id" onChange={this.handelChange} />
        </label>
        <button type="submit">Delete</button>
      </form>
    );
  }
}
