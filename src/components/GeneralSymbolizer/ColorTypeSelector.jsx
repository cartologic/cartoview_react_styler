import { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import CartoColor from 'cartocolor';
import {SOLID, BY_VALUE} from "../../constants/constants.jsx";

class ColorTypeSelector extends Component {
  render(){
    const {type, onChange} = this.props;
    return (
      <UncontrolledDropdown>
        <DropdownToggle caret>
          {type}
        </DropdownToggle>
        <DropdownMenu>
          {
            [SOLID, BY_VALUE].map(key => <DropdownItem onClick={e => onChange(key)}>{key}</DropdownItem>)
          }
        </DropdownMenu>
      </UncontrolledDropdown>
    )

    // return(
    //   <div className="dropdown">
    //     <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    //       {
    //         palette && CartoColor[palette] && CartoColor[palette][count]
    //         && preview(CartoColor[palette][count])
    //       }
    //     </button>
    //     <ul className="dropdown-menu" aria-labelledby="dropdownMenu1" style={{textAlign:"center"}}>
    //       {
    //         Object.keys(CartoColor).map((key) => {
    //           if(CartoColor[key][count])
    //             return <li onClick={e => onChange(key)} style={{marginLeft:"2px", marginRight: "2px"}}>
    //               { key == palette && <span className="palette-item fa fa-caret-right"></span>}
    //               { preview(CartoColor[key][count])}
    //             </li>
    //           return null;
    //         })
    //       }
    //     </ul>
    //   </div>
    // )
  }


}
export default ColorTypeSelector;
