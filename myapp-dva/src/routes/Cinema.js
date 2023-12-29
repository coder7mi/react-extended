import React, { Component } from "react";
import { connect } from "dva";

class Cinema extends Component {
  componentDidMount = () => {
    if (this.props.list.length === 0) {
      this.props.dispatch({
        type: "maizuo/getList",
      });
    } else {
      console.log("缓存");
    }
  };

  render() {
    return <div>Cinema</div>;
  }
}

export default connect((state) => {
  return {
    list: state.maizuo.list,
  };
})(Cinema);
