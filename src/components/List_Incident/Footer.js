import React, { Component } from "react";
import Pagin from "./Pagin";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalEntries: 0,
      pageSize: 5,
      pageCount: 0,
      pageIndex: 1
    };
  }
  // Phương thức được gọi trước khi render. Đây là nơi set state ngay khi có props
  static getDerivedStateFromProps(props, state) {
    return { totalEntries: props.totalEntries };
  }
  componentDidMount() {
    let { totalEntries, pageSize } = this.state;
    let pageCount = Math.ceil(totalEntries / pageSize);
    this.setState({ pageCount: pageCount });
  }
  getPageSize = e => {
    let { totalEntries } = this.state;
    let pageSize = parseInt(e.target.value, 10);
    let pageCount = Math.ceil(totalEntries / pageSize);
    this.props.pageSize(pageSize);
    this.setState({ pageSize: pageSize, pageCount: pageCount });
  };
  getPageIndex = pageIndex => {
    this.setState({
      pageIndex: pageIndex
    });
    this.props.pageIndex(pageIndex);
  };

  render() {
    let { totalEntries, pageSize } = this.state;
    let pageCount = Math.ceil(totalEntries / pageSize);
    return (
      <div className="row">
        <div className="pl-4 col-4 d-flex align-items-center">
          Showing 1 to {pageSize} of {totalEntries} entries
        </div>
        <div className="col-8 d-inline-flex justify-content-end align-items-center">
          <div className="pr-5 d-inline-flex align-items-center">
            Show
            <select
              className="form-control form-control-sm mx-2"
              onChange={this.getPageSize}
              // onClick={this.setPagin}
            >
              <option>5</option>
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            entries
            <Pagin pageCount={pageCount} pageIndex={this.getPageIndex} />
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
