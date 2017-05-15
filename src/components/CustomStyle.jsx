import { Component } from 'react';
import StylesManager from "../managers/StylesManager.jsx";
import WMSClient from "../gs-client/WMSClient.jsx";
import WPSClient from "../gs-client/WPSClient.jsx";
import Rules from "./Rules.jsx";
import Classifier from "./Classifier/Classifier.jsx";
import BusyIndicator from './BusyIndicator.jsx';
import Symbolizer from './Symbolizer/Symbolizer.jsx';
import { Button } from 'reactstrap';

class CustomStyle extends Component {
  state = {}
  render(){
    var {slectedRuleIndex} = this.state;
    const {styleObj, onComplete} = this.props;
    const style = styleObj.namedLayers[styleObj.name].userStyles[0];
    return <div className="row">
      <div className="col-md-6">
        <Rules rules={style.rules} onSelectRule={(index) => this.selectRule(index)} />
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <Button color="primary" onClick={(e)=>onComplete()}>
            {"Save and Preview >>"}
          </Button>
        </div>
        {
          slectedRuleIndex !== undefined && <Symbolizer rule={style.rules[slectedRuleIndex]}
            onChange={rule => this.onRuleChange(rule) }/>
        }
      </div>
    </div>
  }
  selectRule(index){
    this.setState({slectedRuleIndex: index});
  }
  onRuleChange(rule){
    var {slectedRuleIndex} = this.state;
    var {styleObj, onChange} = this.props;
    const style = styleObj.namedLayers[styleObj.name].userStyles[0];
    style.rules[slectedRuleIndex].destroy();
    style.rules[slectedRuleIndex] = rule;
    onChange(styleObj);
  }
}
export default CustomStyle;