import { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import CartoColor from 'cartocolor';
import {SOLID, BY_VALUE} from "../../constants/constants.jsx";

class ColorTypeSelector extends Component {
  render(){
    const {type, onChange} = this.props;
    return <UncontrolledDropdown>
      <DropdownToggle caret>
        {type}
      </DropdownToggle>
      <DropdownMenu>
        {
          [SOLID, BY_VALUE].map(key => <DropdownItem onClick={e => onChange(key)}>{key}</DropdownItem>)
        }
      </DropdownMenu>
    </UncontrolledDropdown>
  }

}
export default ColorTypeSelector;
