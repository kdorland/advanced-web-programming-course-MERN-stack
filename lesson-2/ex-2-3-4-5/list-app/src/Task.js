import React from "react";

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: props.taskData.taskName,
      isDone: props.taskData.isDone
    };

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }
  render() {
    return (
      <div className="task">
        <span>{this.state.taskName}</span>
        <input
          type="checkbox"
          checked={this.state.isDone}
          onChange={this.handleCheckboxChange}
        />
      </div>
    );
  }

  handleCheckboxChange(event) {
    this.setState({
      isDone: event.target.checked
    });
  }
}

export default Task;
