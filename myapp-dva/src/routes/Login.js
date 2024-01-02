import React, { Component } from "react";
import request from "../utils/request";

export default class Login extends Component {
  nameRef = React.createRef();
  pswRef = React.createRef();

  render() {
    return (
      <div>
        用户名：
        <input type="text" ref={this.nameRef} />
        <br />
        密码：
        <input type="password" ref={this.pswRef} />
        <br />
        <button
          onClick={() => {
            console.log(this.nameRef.current.value);
            request("/users/login", {
              method: "POST",
              body: JSON.stringify({
                username: this.nameRef.current.value,
                password: this.pswRef.current.value,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }).then((res) => {
              console.log(res.data);
              if (res.data.msg === "success") {
                localStorage.setItem("token", "token");
                this.props.history.push("/center");
              }
            });
          }}
        >
          登录
        </button>
      </div>
    );
  }
}
