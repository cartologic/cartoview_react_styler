import { Component } from 'react';
import ColorSelector from "./ColorSelector.jsx";
import StylesManager from "../../managers/StylesManager.jsx";
import WMSClient from "../../gs-client/WMSClient.jsx";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import PolygonSymbolizer from "./PolygonSymbolizer.jsx";

class PointSymbolizer extends Component {
  state = {}
  render(){
    var {config, onChange} = this.props;
    return <div>
      <FormGroup>
        <label>Symbol</label>
        <Input type="select" value={config.graphicName} onChange={e => onChange({graphicName: e.target.value})}>
          <option value="circle">Circle</option>
          <option value="square">Square</option>
          <option value="star">Star</option>
          <option value="x">X</option>
          <option value="cross">Cross</option>
          <option value="triangle">Triangle</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <label>Point Radius</label>
        <Input type="number" value={config.pointRadius}
          step={1} min={0} max={50} style={{width:"80px"}}
          onChange={(e) => onChange({pointRadius: parseFloat(e.target.value)})}/>
      </FormGroup>
      <PolygonSymbolizer {...this.props} />
    </div>
  }

}
export default PointSymbolizer;
