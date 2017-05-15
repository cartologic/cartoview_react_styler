import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

class ColorWithOpacity extends Component {
  render(){
    const {symbolizer, property, noLabel=false} = this.props;
    const color = symbolizer[property + "Color"]
    const alpha = parseFloat(symbolizer[property + "Opacity"] || 1) * 100;
    const onChange = (colors) => {
      symbolizer[property + "Color"] = colors.color;
      symbolizer[property + "Opacity"] = colors.alpha / 100;
      this.props.onChange(symbolizer);
    }
    const colorPicker = <ColorPicker color={color} alpha={alpha} onChange={onChange} className="color-with-opacity" />;
    if(noLabel){
      return colorPicker;
    }
    const label = property[0].toUpperCase() + property.slice(1);
    return  <FormGroup>
        <Label>{label} Color</Label>
        <div>{colorPicker}</div>
      </FormGroup>
  }
}
export default ColorWithOpacity;

// 'use strict'
//
// import React from 'react'
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import { SketchPicker } from 'react-color'
//
// class ColorWithOpacity extends React.Component {
//   state = {
//     displayColorPicker: false
//   };
//
//   handleClick = () => {
//     this.setState({ displayColorPicker: !this.state.displayColorPicker })
//   };
//
//   handleClose = () => {
//     this.setState({ displayColorPicker: false })
//   };
//
//   handleChange = (color) => {
//     const {symbolizer, property} = this.props;
//     console.log(color);
//     symbolizer[property + "Color"] = "rgb(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + ")";
//     symbolizer[property + "Opacity"] = color.rgb.a;
//     // symbolizer[prop] = value;
//     this.props.onChange(symbolizer);
//   }
//
//   render() {
//     const {symbolizer, property} = this.props;
//     const color = symbolizer[property + "Color"]
//     const alpha = symbolizer[property + "Opacity"];
//     const label = property[0].toUpperCase() + property.slice(1);
//
//     const styles = {
//       color: {
//         width: '36px',
//         height: '14px',
//         backgroundColor: color,
//       },
//       swatch: {
//         padding: '5px',
//         backgroundColor: '#fff',
//         borderRadius: '1px',
//         boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
//         display: 'inline-block',
//         cursor: 'pointer',
//       },
//       popover: {
//         position: 'absolute',
//         zIndex: '2',
//       },
//       cover: {
//         position: 'fixed',
//         top: '0px',
//         right: '0px',
//         bottom: '0px',
//         left: '0px',
//       }
//     };
//
//     return <FormGroup>
//         <Label>{label} Color</Label>
//         <div>
//           <div style={ styles.swatch } onClick={ this.handleClick }>
//             <div style={ styles.color } />
//           </div>
//           {
//             this.state.displayColorPicker ? <div style={ styles.popover }>
//               <div style={ styles.cover } onClick={ this.handleClose }/>
//                 <SketchPicker color={ color } alpha={alpha} onChange={ this.handleChange } />
//               </div> : null
//           }
//         </div>
//       </FormGroup>
//
//
//   }
// }
// export default ColorWithOpacity;
