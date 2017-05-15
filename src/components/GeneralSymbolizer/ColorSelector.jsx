import { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import CartoColor from 'cartocolor';
import ColorTypeSelector from "./ColorTypeSelector.jsx";
import ColorWithOpacity from "../Symbolizer/ColorWithOpacity.jsx";
import PaletteSelector from "./PaletteSelector.jsx";
import {SOLID, BY_VALUE, DEFAULTS, DEFAULT_COLOR, DEFAULT_PALETTE} from "../../constants/constants.jsx";
import ColorPicker from 'rc-color-picker';
import Alpha from './Alpha.jsx';


class ColorSelector extends Component {
  render(){
    const {config, property, onChange} = this.props;
    const type = config[property];
    const alpha = parseFloat(config[property + "Opacity"] || 1) * 100;
    const onAlphaChange = (alpha) => {
       const newConfig = {};
       newConfig[property + "Opacity"] = alpha / 100;
       onChange(newConfig);
    }
    const onTypeChange = (type) => {
      const newConfig = {};
      if(type == BY_VALUE){
        newConfig[property + "Color"] = DEFAULT_PALETTE;
      }
      else {
        newConfig[property + "Color"] = DEFAULT_COLOR;
      }
      newConfig[property] = type;
      onChange(newConfig);
    }
    return <div className="d-flex flex-row">
      <div className="mr-4">
        <ColorTypeSelector  type={type} onChange={(type) => onTypeChange(type)}/>
      </div>
      {
        type == SOLID && <div>
        <ColorWithOpacity symbolizer={config} property={property} noLabel={true}
          onChange={(symbolizer) => onChange(symbolizer)} />
        </div>
      }
      {
        type == BY_VALUE && <div className="mr-4">
        <PaletteSelector symbolizer={config} property={property}
          onChange={(symbolizer) => onChange(symbolizer)} />
        </div>
      }
      {
        type == BY_VALUE && <div className="mr-4 alpha-ct">
          <div className="rc-color-picker-panel-wrap-alpha">
            <Alpha rootPrefixCls="rc-color-picker-panel"
               alpha={alpha}
               hsv={{h: 0, s: 0, v: 33}}
               onChange={(alpha) =>onAlphaChange(alpha)}/>
         </div>
        </div>
      }

    </div>

  }


}
export default ColorSelector;
