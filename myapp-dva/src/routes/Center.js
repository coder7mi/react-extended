import { withRouter } from "dva/router";
import React, { Component } from "react";

export default class Center extends Component {
  render() {
    return (
      <div>
        Center
        <WithChild />
      </div>
    );
  }
}

class Child extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            this.props.history.push("/login");
          }}
        >
          退出登录
        </button>
      </div>
    );
  }
}

const WithChild = withRouter(Child);
