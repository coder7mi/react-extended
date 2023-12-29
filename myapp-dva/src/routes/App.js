import React, { Component } from "react";
import Tabbar from "../components/Tabbar";
import { connect } from "dva";

class App extends Component {
  componentDidMount = () => {
    console.log(this.props);
  };

  render() {
    return (
      <div>
        {this.props.children}
        {this.props.isShow && <Tabbar></Tabbar>}
      </div>
    );
  }
}

export default connect((state) => {
  console.log(state);
  return {
    isShow: state.maizuo.isShow,
  };
})(App);
