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
        <h4>{"Select layer "}</h4>

        <Search layerTypeNames={this.state.layerTypeNames} searchLayers={(layerName)=>{this.searchLayers(layerName)}}/>
        <br></br>

        <ul className="list-group">
          {
            //to={match.url + layer.typename}
            layers.map((layer) => {return(
              <div>
                <li className="list-group-item">
                  <div className="row">

                    <div className="col-xs-3"><img src={layer.thumbnail_url} style={{width:"100%", height:"150px"}}/></div>

                    <div className="col-xs-9">
                      <div className="content">
                        <h4 className="list-group-item-heading">{layer.title}</h4>
                        <hr></hr>
                        <p className="mb-1">{layer.abstract}</p>
                        <br></br>

                        <a
                          type="button"
                          href={`/layers/${layer.typename}`}
                          target="_blank"
                          className="btn btn-primary"
                          style={{margin: "5px", float: "right"}}>
                          Layer Details
                        </a>

                        <button
                          type="button"
                          className="btn btn-default"
                          onClick={()=>onComplete(layer.typename)}
                          style={{margin: "5px", float: "right"}}>
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <br></br>
              </div>
            )})
          }
        </ul>
      </div>
    )
  }
}

export default LayersList;
