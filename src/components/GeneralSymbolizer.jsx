import { Component } from 'react';

import ColorSelector from "./GeneralSymbolizer/ColorSelector.jsx";
import StylesManager from "../managers/StylesManager.jsx";

import WMSClient from "../gs-client/WMSClient.jsx";
import WPSClient from "../gs-client/WPSClient.jsx";

import PointSymbolizer from "./GeneralSymbolizer/PointSymbolizer.jsx";
import PolygonSymbolizer from "./GeneralSymbolizer/PolygonSymbolizer.jsx";
import LineSymbolizer from "./GeneralSymbolizer/LineSymbolizer.jsx";


export default class GeneralSymbolizer extends Component {
  state = {}


  render(){
    const {config, styleObj, type, onComplete, onChange} = this.props;
    const {numOfClasses, layerType} = config;
    if(!numOfClasses){
      return <div className="loading"></div>
    }

    var Symbolizer = layerType == "Point"   ? PointSymbolizer :
                     layerType == "Polygon" ? PolygonSymbolizer : LineSymbolizer;

    return(
      <div>
        <Symbolizer config={config} onChange={newConfig => onChange(newConfig)} />
        <div className="form-group">
          <button type="button" className="btn btn-primary" onClick={(e)=>onComplete()}>
            Next >>
          </button>
        </div>
      </div>
    )
  }
}
