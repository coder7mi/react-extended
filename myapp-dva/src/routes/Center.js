import { withRouter } from "dva/router";
import React, { Component } from "react";
import request from "../utils/request";

export default class Center extends Component {
  componentDidMount = () => {
    request(
      "/api/mmdb/movie/v3/list/hot.json?ct=%E5%8D%97%E4%BA%AC&ci=55&channelId=4"
    ).then((res) => {
      console.log(res.data);
    });

    request("/users").then((res) => {
      console.log(res.data);
    });
  };

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
