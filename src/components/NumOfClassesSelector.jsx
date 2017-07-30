import {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';

class NumOfClassesSelector extends Component {
  state = {
    attrs: []
  }

  renderHeader() {
    return (
      <div className="row">
        <div className="col-xs-5 col-md-4">
          <h4>{'Generate Thematic Styler'}</h4>
        </div>
        <div className="col-xs-7 col-md-8">
          <button style={{
            display: "inline-block",
            margin: "0px 3px 0px 3px"
          }} className="btn btn-primary btn-sm pull-right" onClick={() => this.props.onComplete()}>{"next >>"}</button>

          <button style={{
            display: "inline-block",
            margin: "0px 3px 0px 3px"
          }} className="btn btn-primary btn-sm pull-right" onClick={() => {
            this.props.onPrevious()
          }}>{"<< Previous"}</button>
        </div>
      </div>
    )
  }

  render() {
    const {onComplete} = this.props;
    const classes = [
      2,
      3,
      4,
      5,
      6,
      7
    ];
    return <div>
      <p>Number of classes</p>
      <ListGroup>
        {classes.map(c => <ListGroupItem tag="a" href="#" onClick={() => onComplete(c)}>
          {c}
        </ListGroupItem>)
}
      </ListGroup>
    </div>;
  }
}
export default NumOfClassesSelector;
