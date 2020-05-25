import React, { Component } from "react";
import { Link } from "react-router-dom";

class Pagin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      pageCount: 0
    };
  }
  // Phương thức được gọi trước khi render. Đây là nơi set state ngay khi có props
  static getDerivedStateFromProps(props, state) {
    return { pageCount: props.pageCount };
  }

  componentDidMount() {}
  setPage = e => {
    let value = e.target.outerText;
    if (value !== "...") {
      switch (value) {
        case "«":
          this.setState({ pageIndex: 1 });
          this.props.pageIndex(1);
          break;
        case "»":
          this.setState({ pageIndex: this.state.pageCount });
          this.props.pageIndex(this.state.pageCount);
          break;
        default:
          this.setState({ pageIndex: parseInt(value, 10) });
          this.props.pageIndex(parseInt(value, 10));
      }
    }
  };

  render() {
    let item = [];
    let { pageCount } = this.state;
    if (pageCount < 5 && pageCount >= 0) {
      for (let i = 1; i <= pageCount; i++) {
        if (parseInt(this.state.pageIndex, 10) === i) {
          item.push(
            <li key={i} className="page-item active">
              <Link className="page-link" to="#">
                {i}
              </Link>
            </li>
          );
        } else {
          item.push(
            <li key={i} className="page-item">
              <Link className="page-link" to="#">
                {i}
              </Link>
            </li>
          );
        }
      }
    } else {
      let pageIndex = this.state.pageIndex;
      //nếu page nhở hơn 3 thì trả về giá trị 1 lơn hơn thì trả về page-2
      pageIndex = pageIndex - 2 > 0 ? pageIndex - 2 : 1;
      //Set end_page nếu nó gần cuối thì không thêm nữa còn chưa tới cuối thì lấy từ page đang chọn thêm 2 nữa
      let end_page = 0;
      if (pageIndex + 4 > this.state.pageCount) {
        end_page = this.state.pageCount;
      } else end_page = pageIndex + 4;
      for (let i = end_page - 4; i <= end_page; i++) {
        //nếu lơn hơn 3 thì sẽ thêm ... vào trước và biến bool để cho push chỉ 1 lần
        if (parseInt(this.state.pageIndex, 10) === i) {
          item.push(
            <li key={i} className="page-item active">
              <Link className="page-link" to="#">
                {i}
              </Link>
            </li>
          );
        } else {
          item.push(
            <li key={i} className="page-item">
              <Link className="page-link" to="#">
                {i}
              </Link>
            </li>
          );
        }
      }
    }

    return (
      <ul key className="pagination ml-4 my-2" onClick={this.setPage}>
        <li className="page-item">
          <Link className="page-link" to="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>
        {this.state.pageIndex > 3 ? (
          <li className="page-item disabled">
            <Link className="page-link" to="#">
              ...
            </Link>
          </li>
        ) : (
          ""
        )}

        {item}
        {this.state.pageIndex + 2 < this.state.pageCount ? (
          <li className="page-item disabled">
            <Link className="page-link" to="#">
              ...
            </Link>
          </li>
        ) : (
          ""
        )}
        <li className="page-item">
          <Link className="page-link" to="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    );
  }
}

export default Pagin;
