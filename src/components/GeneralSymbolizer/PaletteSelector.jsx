import { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import CartoColor from 'cartocolor';

const preview = (colors) => colors.map(c => <span className="palette-item" style={{backgroundColor:c}}></span>);

class PaletteSelector extends Component {
  render(){
    const {symbolizer, property} = this.props;
    var count = symbolizer.numOfClasses.toString();
    const palette = symbolizer[property + "Color"]
    const onChange = (palette) => {
      symbolizer[property + "Color"] = palette
      this.props.onChange(symbolizer);
    }
    return <UncontrolledDropdown>
      <DropdownToggle caret>
        {
          palette && CartoColor[palette] && CartoColor[palette][count]
          && preview(CartoColor[palette][count])
        }
      </DropdownToggle>
      <DropdownMenu>
        {
          Object.keys(CartoColor).map((key) => {
            if(CartoColor[key][count])
              return <DropdownItem onClick={e => onChange(key)}>
                { key == palette && <span className="palette-item fa fa-caret-right"></span>}
                { preview(CartoColor[key][count])}
              </DropdownItem>
            return null;
          })
        }
      </DropdownMenu>
    </UncontrolledDropdown>
  }

}
export default PaletteSelector;
