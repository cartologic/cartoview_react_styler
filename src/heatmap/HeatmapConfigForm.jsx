import {Component} from 'react';
import StyleWriter from './StyleWriter.jsx';
import ColorWithOpacity from '../components/Symbolizer/ColorWithOpacity.jsx';

export default class HeatmapConfigForm extends Component {
  render() {
    var {config, styleObj, onChange} = this.props;

    const onComplete = () =>{
      this.props.onComplete(StyleWriter.write(config, styleObj));
    }

    return(
      <div>
        <div className="form-group">
          <label>{"Radius"}</label><br></br>
          <input type="number" className="form-control" id="radius" value={config.radius} onChange={e => onChange({radius: parseInt(e.target.value)})} />
        </div>
        <br></br>


        <div className="form-group">
          <label htmlFor={"pixelsPerCell"}>{"Pixels Per Cell"}</label>
          <input type="number" className="form-control" id="pixelsPerCell" value={config.pixelsPerCell} onChange={e => onChange({pixelsPerCell: parseInt(e.target.value)})}/>
        </div>
        <br></br>


        <ColorWithOpacity symbolizer={config} property={"start"} onChange={(config) => onChange(config)} />
        <ColorWithOpacity symbolizer={config} property={"end"} onChange={(config) => onChange(config)} />


        <button type="button" className="btn btn-primary" onClick={() => onComplete()} disabled={!config.pixelsPerCell || !config.radius}>
          Next
        </button>
      </div>
    )
  }
}
