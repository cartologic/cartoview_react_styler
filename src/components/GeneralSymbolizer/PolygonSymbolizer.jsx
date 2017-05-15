import { Component } from 'react';
import ColorSelector from "./ColorSelector.jsx";
import StylesManager from "../../managers/StylesManager.jsx";
import WMSClient from "../../gs-client/WMSClient.jsx";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import LineSymbolizer from "./LineSymbolizer.jsx";

class PolygonSymbolizer extends Component {
  state = {}
  render(){
    var {config, onChange} = this.props;
    return <div>
      <FormGroup>
        <Label>Fill Color</Label>
        <ColorSelector config={config} property="fill"
          onChange={newConfig => onChange(newConfig)} />
      </FormGroup>
      <LineSymbolizer {...this.props} />
    </div>
  }

}
export default PolygonSymbolizer;
