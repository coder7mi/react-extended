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
    return (
      <div>
        <ul>
          {this.props.list.map((item) => {
            return <li key={item.cinemaId}>{item.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    list: state.maizuo.list,
  };
})(Cinema);
