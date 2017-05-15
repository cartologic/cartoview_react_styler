import { Component } from 'react';
import ColorSelector from "./GeneralSymbolizer/ColorSelector.jsx";
import StylesManager from "../managers/StylesManager.jsx";
import WMSClient from "../gs-client/WMSClient.jsx";
import WPSClient from "../gs-client/WPSClient.jsx";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import PointSymbolizer from "./GeneralSymbolizer/PointSymbolizer.jsx";
import PolygonSymbolizer from "./GeneralSymbolizer/PolygonSymbolizer.jsx";
import LineSymbolizer from "./GeneralSymbolizer/LineSymbolizer.jsx";


class GeneralSymbolizer extends Component {
  state = {}
  render(){
    const {config, styleObj, type, onComplete, onChange} = this.props;
    const {numOfClasses, layerType} = config;
    if(!numOfClasses){
      return <div className="loading"></div>
    }
    var Symbolizer = layerType == "Point"   ? PointSymbolizer :
                     layerType == "Polygon" ? PolygonSymbolizer : LineSymbolizer;
    return <div>
      <Symbolizer config={config} onChange={newConfig => onChange(newConfig)}/>
      <div className="form-group">
        <Button color="primary" onClick={(e)=>onComplete()}>
          Next >>
        </Button>
      </div>
    </div>
  }
  // updateConfig(config){
  //   var {styleObj} = this.state;
  //   Object.assign(styleObj.config, config);
  //   this.setState({styleObj});
  // }
  componentDidMount(){

    //
    // StylesManager.getStyle(layerName, styleName).then(styleObj => {
    //   if(styleObj.config.method == "UNIQUE_VALUES"){
    //     WPSClient.gsUnique(layerName, styleObj.config.attribute).then( res => {
    //       styleObj.config.numOfClasses = res.features.length;
    //       console.log(styleObj.config);
    //       this.setState({styleObj});
    //     });
    //   }
    //   else{
    //     this.setState({styleObj});
    //   }
    //
    //
    // });
  }
}
export default GeneralSymbolizer;
