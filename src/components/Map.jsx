import React from 'react';
import ReactDOM from 'react-dom';
import ol from 'openlayers';
import WMSClient from "../gs-client/WMSClient.jsx";

class Map extends React.Component {
    constructor(props) {
      super(props);
      const {layerName, styleName} = props.config;
      this.layerSource = new ol.source.TileWMS({
        url: URLS.geoserver + "wms",
        params: {
          LAYERS: layerName,
          STYLES: styleName,
          TILED: true,
        },
        serverType: 'geoserver'
      });
      this.map = new ol.Map({
        layers: [
          new ol.layer.Tile({source: new ol.source.OSM()}),
          new ol.layer.Tile({source: this.layerSource})
        ],
        view: new ol.View({center: [0, 0], zoom: 3})
      });
    }
    componentDidMount(){
      this.map.setTarget(ReactDOM.findDOMNode(this.refs.map));
      WMSClient.getLayer(this.props.config.layerName).then(({bbox_x0, bbox_y0, bbox_x1, bbox_y1, srid}) => {
        const extent = [bbox_x0, bbox_y0, bbox_x1, bbox_y1].map(i=>parseFloat(i));
        this.map.getView().fit(ol.proj.transformExtent(extent, srid, "EPSG:3857"));
      })
    }
    refreshLayer() {
      var params = this.layerSource.getParams();
      params.t = new Date().getMilliseconds();
      this.layerSource.updateParams(params);
    }
    render() {
      const {saved, config} = this.props;
      // if(!saved){
      //   return <div className="loading"></div>;
      // }
      this.refreshLayer();
      const {layerName, styleName} = config;
      return <div>
        <div ref="map" className='map-ct'>
          {
            !saved && <div className="map-mask">
              <div className="loading"></div>
            </div>
          }
        </div>
        <div>
          <a className="btn btn-success" href={"/layers/" + layerName}>{"Layer Details"}</a>
          <a className="btn btn-info" href={"/gs/"+layerName+"/style/manage"}>{"Manage Styles"}</a>
        </div>
      </div>;
    }
}
export default Map;
