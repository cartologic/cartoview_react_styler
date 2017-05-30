import {Component} from 'react';
import {FormGroup, Input, Button} from 'reactstrap';
import StyleWriter from './StyleWriter.jsx';
import ColorWithOpacity from '../components/Symbolizer/ColorWithOpacity.jsx';

class HeatmapConfigForm extends Component {
  render() {
    var {config, styleObj, onChange} = this.props;
    const onComplete = () =>{
      this.props.onComplete(StyleWriter.write(config, styleObj));
    }
    console.log(config);
    return <div>
      <FormGroup>
        <label>{"Radius"}</label>
        <Input type="number" value={config.radius} onChange={e => onChange({radius: parseInt(e.target.value)})}/>
      </FormGroup>
      <FormGroup>
        <label>{"Pixels Per Cell"}</label>
        <Input type="number" value={config.pixelsPerCell} onChange={e => onChange({pixelsPerCell: parseInt(e.target.value)})}/>
      </FormGroup>
      <ColorWithOpacity symbolizer={config} property={"start"} onChange={(config) => onChange(config)} />
      <ColorWithOpacity symbolizer={config} property={"end"} onChange={(config) => onChange(config)} />

      {
        <Button color="primary" onClick={() => onComplete()} disabled={!config.pixelsPerCell || !config.radius}>
        {"Next"}
        </Button>
      }
    </div>
  }
}
export default HeatmapConfigForm;
