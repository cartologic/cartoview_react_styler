import { Component } from 'react';
import WMSClient from "../gs-client/WMSClient.jsx";


export default class AttributeSelector extends Component {
  state = {
    attrs: []
  }


  componentDidMount(){
    const {layerName} = this.props.config;
    WMSClient.getLayerAttributes(layerName).then((attrs)=>{
      this.setState({attrs});
    });
  }

  note(){
    if(this.props.note)
    return(
      <div className="panel panel-primary" style={{backgroundColor:"inherit"}}>
        <div className="panel-body" style={{color:"indianred"}}>
          {this.props.note}
        </div>
      </div>
    )
  }


  render(){
    const {attrs} = this.state;
    if(attrs.length == 0){
      return <div className="loading"></div>
    }
    const {onComplete, filter} =  this.props;
    const isGeom = (a) => {
      return a.attribute_type.toLowerCase().indexOf("gml:") == 0;
    }

    return(
      <div>
        <h4>Select attribute</h4>

        {this.note()}

        <ul className="list-group">
          {
            attrs.map(a => isGeom(a) || !filter(a) ? null : <li className="list-group-item"  onClick={()=>onComplete(a.attribute)} style={{marginTop: "4px"}}>
              {a.attribute_label || a.attribute} ({a.attribute_type})
            </li>)
          }
        </ul>
      </div>
    )
  }
}
