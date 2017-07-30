import React, {Component} from 'react';
import AttributeSelector from '../components/AttributeSelector.jsx';

class WeightSelector extends Component {
  state = {
    showAttributes: false
  }

  componentDidMount() {}

  renderHeader() {
    return (
      <div className="row">
        <div className="col-xs-5 col-md-4">
          <h4>{'Select Weight'}</h4>
        </div>
        <div className="col-xs-7 col-md-8">
          <button style={{
            display: "inline-block",
            margin: "0px 3px 0px 3px",
            visibility: "hidden"
          }} className="btn btn-primary btn-sm pull-right disabled" onClick={() => this.props.onComplete()}>{"next >>"}</button>

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

    const {config, onComplete} = this.props;
    const attrFilter = (a) => ["xsd:int", "xsd:double", "xsd:long"].indexOf(a.attribute_type.toLowerCase()) != -1
    return (
      <div>
        {this.renderHeader()}
        <br></br>

        <div className="panel panel-default">
          <div className="panel-body">
            <p>
              {"Option 1: Set weight by distance"}
              <button className="btn btn-primary" onMouseDown={() => onComplete(null)} style={{
                float: "right"
              }}>
                {"Weight by distance"}
              </button>
            </p>
          </div>
        </div>
        <br></br>

        <div className="panel panel-default">
          <div className="panel-body">
            <p>
              {"Option 2: Set Based on Attribute"}
              <button className="btn btn-primary" onMouseDown={() => this.setState({showAttributes: true})} style={{
                float: "right"
              }}>
                Select Attribute
              </button>
            </p>
          </div>
        </div>
        {this.state.showAttributes && <AttributeSelector {...this.props} filter={attrFilter}/>}
      </div>
    )
  }
}
export default WeightSelector;
