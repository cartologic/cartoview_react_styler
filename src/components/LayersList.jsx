import { Component } from 'react';
import WMSClient from "../gs-client/WMSClient.jsx";

import Search from "./Search.jsx";
import { ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';


class LayersList extends Component {
  constructor(props){
    super(props);
    this.state = {
      layerTypeNames: [],
      layers: []
    }
  }


  loadLayers(){
    let url = `/apps/${APP_NAME}/api/layers/?type=${this.props.layerType}`
    fetch(url, {credentials: 'include',}).then((res) => res.json()).then((layers) => {
      let layerTypeNames = layers.objects.map((layer)=>{
        return {value:layer.typename, label:layer.title}
      })
      this.setState({layers:layers.objects, layerTypeNames})
    })
  }


  searchLayers(layerTypeName){
    if(layerTypeName){
      let url = `/apps/cartoview_point_in_polygon/api/layers/?typename=${layerTypeName}&type=${this.props.layerType}`
      fetch(url, {credentials: 'include',}).then((res) => res.json()).then((layers) => {this.setState({layers:layers.objects})})
    }
    else{
      // clear button
      this.loadLayers()
    }
  }


  componentDidMount(){
    // WMSClient.getLayers().then((layers)=>this.setState({layers}));
    this.loadLayers();
  }


  render(){
    const {layers} = this.state;
    if(layers.length == 0){
      return <div className="loading"></div>
    }
    const {onComplete} = this.props;
    return (
      <div>
        <Search layerTypeNames={this.state.layerTypeNames} searchLayers={(layerName)=>{this.searchLayers(layerName)}}/>
        <br></br>

        <p>{"Select layer "}</p>
        <ListGroup className="layers-list">
          {
            //to={match.url + layer.typename}
            layers.map((layer) => <ListGroupItem tag="a" href="#" onClick={()=>onComplete(layer.typename)} action>
              <img src={layer.thumbnail_url}/>
              <div className="content">
                <ListGroupItemHeading>{layer.title}</ListGroupItemHeading>
                <p className="mb-1">{layer.abstract}</p>
              </div>
            </ListGroupItem>)
          }
        </ListGroup>
      </div>
    )
  }
}

export default LayersList;
