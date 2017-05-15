import { Component } from 'react';
import ColorSelector from "./ColorSelector.jsx";
import StylesManager from "../../managers/StylesManager.jsx";
import WMSClient from "../../gs-client/WMSClient.jsx";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class LineSymbolizer extends Component {
  state = {}
  render(){
    var {config, onChange} = this.props;
    return <div>
      <FormGroup>
        <Label>Stroke Color</Label>
        <ColorSelector config={config} property="stroke"
          onChange={newConfig => onChange(newConfig)} />
      </FormGroup>
      <FormGroup>
        <Label>Stroke Width</Label>
        <Input type="number" value={config.strokeWidth}
          step={1} min={0} max={10} style={{width:"80px"}}
          onChange={(e) => {
            const strokeWidth = parseInt(e.target.value);
            onChange({strokeWidth})
          }}/>
      </FormGroup>
    </div>
  }

}
export default LineSymbolizer;
