import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  async componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h1>Application error</h1>
          <p>{this.state.error && this.state.error.toString()}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
