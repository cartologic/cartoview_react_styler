import {Component} from 'react';

import ColorSelector from "./GeneralSymbolizer/ColorSelector.jsx";
import StylesManager from "../managers/StylesManager.jsx";

import WMSClient from "../gs-client/WMSClient.jsx";
import WPSClient from "../gs-client/WPSClient.jsx";

import PointSymbolizer from "./GeneralSymbolizer/PointSymbolizer.jsx";
import PolygonSymbolizer from "./GeneralSymbolizer/PolygonSymbolizer.jsx";
import LineSymbolizer from "./GeneralSymbolizer/LineSymbolizer.jsx";

export default class GeneralSymbolizer extends Component {
  state = {}

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
    const {config, styleObj, type, onComplete, onChange} = this.props;
    const {numOfClasses, layerType} = config;
    if (!numOfClasses) {
      return <div className="loading"></div>
    }

    var Symbolizer = layerType == "Point"
      ? PointSymbolizer
      : layerType == "Polygon"
        ? PolygonSymbolizer
        : LineSymbolizer;

    return (
      <div>
        {this.renderHeader()}
        <br></br>
        <Symbolizer config={config} onChange={newConfig => onChange(newConfig)}/>
      </div>
    )
  }
}
