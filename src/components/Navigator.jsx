import { Component } from 'react';

export default class Navigator extends Component {
  state = {}


  item(label, index){
    const {step, onStepSelected} = this.props;
    const className = index == step ? "list-group-item active" :
                              index > step ? "list-group-item disabled" : "list-group-item";
    return (
      <li className={className}
        href="#"
        onClick={e => onStepSelected(index)}>
        {index < step && <i className="fa fa-check" aria-hidden="true"></i> }
        {label}
      </li>
    )
  }


  render(){
    const {steps} = this.props;
    return (
      <div className="col-md-3 list-group">
        <ul className={"list-group"}>
          {steps.map((s, index) => this.item(s.label, index) )}
        </ul>
      </div>
    )
  }
}
