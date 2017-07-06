import React, {Component} from 'react';
import AttributeSelector from '../components/AttributeSelector.jsx';

class WeightSelector extends Component {
  state = {showAttributes: false}

  componentDidMount(){

  }

  render(){

    const {config, onComplete} = this.props;
    const attrFilter = (a) => ["xsd:int", "xsd:double", "xsd:long"].indexOf(a.attribute_type.toLowerCase()) != -1
    return(
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <p>
              {"Option 1: Set weight by distance"}
              <button className="btn btn-primary" onMouseDown={() => onComplete(null)} style={{float: "right"}}>
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
              <button className="btn btn-primary" onMouseDown={() => this.setState({showAttributes: true})} style={{float: "right"}}>
              Select Attribute
              </button>
            </p>
          </div>
        </div>
        {this.state.showAttributes && <AttributeSelector {...this.props} filter={attrFilter} />}
    </div>
    )
  }
}
export default WeightSelector;
