import { Component } from 'react';
import StylesManager from "../managers/StylesManager.jsx";
import WMSClient from "../gs-client/WMSClient.jsx";
import WPSClient from "../gs-client/WPSClient.jsx";
import Rules from "./Rules.jsx";
import Classifier from "./Classifier/Classifier.jsx";
import BusyIndicator from './BusyIndicator.jsx';
import Symbolizer from './Symbolizer/Symbolizer.jsx';

export default class CustomStyle extends Component {
  state = {}


  tip(){
    return(
      <div className="panel panel-info" style={{margin: "15px auto 15px auto"}}>
        <div className="panel-heading">Tip:</div>
        <div className="panel-body">
          Press on any of the panes to customize its styles
        </div>
      </div>
    )
  }


  renderHeader() {
    return (
      <div className="row">
        <div className="col-xs-5 col-md-4">
          <h4>{'Customize Style'}</h4>
        </div>
        <div className="col-xs-7 col-md-8">
          <button style={{
            display: "inline-block",
            margin: "0px 3px 0px 3px"
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



  render(){
    var {slectedRuleIndex} = this.state;
    const {styleObj, onComplete} = this.props;
    const style = styleObj.namedLayers[styleObj.name].userStyles[0];
    return(
      <div>
        {this.renderHeader()}
        <div className="row">
          <div className="col-md-6">
            <Rules rules={style.rules} onSelectRule={(index) => this.selectRule(index)} />
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <button className="btn btn-primary pull-right" onClick={(e)=>onComplete()}>
                {"Save and Preview >>"}
              </button>
              <br></br>
            </div>
            {
              slectedRuleIndex !== undefined && <Symbolizer rule={style.rules[slectedRuleIndex]}
                onChange={rule => this.onRuleChange(rule) }/>
            }


          </div>

          <div className="col-md-12">
            {this.tip()}
          </div>
        </div>
      </div>

    )
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
