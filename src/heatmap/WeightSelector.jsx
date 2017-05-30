import React, {Component} from 'react';
import AttributeSelector from '../components/AttributeSelector.jsx';
import { Button } from 'reactstrap';

class WeightSelector extends Component {

  render(){

    const {config, onComplete} = this.props;
    const attrFilter = (a) => ["xsd:int", "xsd:double", "xsd:long"].indexOf(a.attribute_type.toLowerCase()) != -1
    return <div>
      <Button color="primary" onClick={() => onComplete(null)}>
      {"Weight by distance"}
      </Button>
      <p>
        {"or weight by attribute"}
      </p>
      <AttributeSelector {...this.props} filter={attrFilter} />
    </div>
  }
  newStyle(){
    const {title} = this.state;
    if(title.trim() == ""){
      this.setState({error:"danger"});
    }
    else{
      this.props.onComplete({styleName:"new", title})
    }

  }
}
export default WeightSelector;
