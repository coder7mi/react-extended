import React, { Component } from "react";
import { connect } from "dva";

class Detail extends Component {
  componentDidMount = () => {
    // console.log(this.props.match.params.id);

    this.props.dispatch({
      type: "maizuo/hide",
    });
  };

  componentWillUnmount = () => {
    this.props.dispatch({
      type: "maizuo/show",
    });
  };

  render() {
    return <div>Detail</div>;
  }
}

export default connect()(Detail);
