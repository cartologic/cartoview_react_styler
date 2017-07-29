import {Component} from 'react';
import WMSClient from "../gs-client/WMSClient.jsx";

import Search from "./Search.jsx";

import Switch from 'react-toggle-switch'
import 'react-toggle-switch/dist/css/switch.min.css'
// box-shadow: 0px 0px 10px 5px steelblue;
export default class LayersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layers: [],
      currentPage: 1,
      limit_offset: "limit=5",
      showPagination: true,
      myLayers: true,
      selectedLayerIndex: -1,
      selectedLayer: ""
    }
  }

  loadLayers(username) {
    let url = `/apps/${APP_NAME}/api/layers/?type=${this.props.layerType}&${this.state.limit_offset}`
    if (username)
      url = `/apps/${APP_NAME}/api/layers/?type=${this.props.layerType}&${this.state.limit_offset}&owner=${username}`
    fetch(url, {credentials: 'include'}).then((res) => res.json()).then((layers) => {
      this.setState({layers: layers.objects, next: layers.meta.next, prev: layers.meta.previous, selectedLayerIndex: -1, selectedLayer: ''})
    })
  }

  searchLayers(layerTypeName) {
    if (layerTypeName) {
      let url = `/apps/${APP_NAME}/api/layers/?typename=${layerTypeName}&type=${this.props.layerType}&${this.state.limit_offset}`
      if (this.state.myLayers)
        url = `/apps/${APP_NAME}/api/layers/?typename=${layerTypeName}&type=${this.props.layerType}&${this.state.limit_offset}&owner=${username}`
      fetch(url, {credentials: 'include'}).then((res) => res.json()).then((layers) => {
        this.setState({layers: layers.objects, showPagination: false, selectedLayerIndex: -1, selectedLayer: ""})
      })
    } else {
      // clear button
      this.setState({
        showPagination: true,
        selectedLayerIndex: -1,
        selectedLayer: ""
      }, () => this.loadLayers())
    }
  }

  onPaginationClick(e, step) {
    e.preventDefault()

    switch (step) {
      case "prev":
        if (this.state.prev)
          this.setState({
            currentPage: this.state.currentPage -= 1,
            limit_offset: this.state.prev
          }, () => {
            this.loadLayers();
          })
        break;
      case "next":
        if (this.state.next)
          this.setState({
            currentPage: this.state.currentPage += 1,
            limit_offset: this.state.next
          }, () => {
            this.loadLayers();
          })
        break;
    }
  }

  componentWillMount() {
    this.loadLayers(username);
  }

  handleSwitch() {
    this.setState({
      myLayers: !this.state.myLayers
    }, () => {
      this.state.myLayers
        ? this.loadLayers(username)
        : this.loadLayers()
    })
  }

  renderPagination() {
    return (
      <ul className="pagination">
        <li>
          <a onMouseDown={(e) => this.onPaginationClick(e, "prev")} style={{
            cursor: "default"
          }}>{"<"}</a>
        </li>
        <li>
          <a onMouseDown={(e) => e.preventDefault()} style={{
            cursor: "default"
          }}>{this.state.currentPage}</a>
        </li>
        <li>
          <a onMouseDown={(e) => this.onPaginationClick(e, "next")} style={{
            cursor: "default"
          }}>{">"}</a>
        </li>
      </ul>
    )
  }

  renderHeader() {
    return (
      <div className="row">
        <div className="col-xs-5 col-md-4">
          <h4>{'Select Layer'}</h4>
        </div>
        <div className="col-xs-7 col-md-8">
          {this.state.selectedLayerIndex != -1
            ? <button style={{
                display: "inline-block",
                margin: "0px 3px 0px 3px"
              }} className="btn btn-primary btn-sm pull-right" onClick={() => this.props.onComplete(this.state.selectedLayer)}>{"next >>"}</button>
            : <button style={{
              display: "inline-block",
              margin: "0px 3px 0px 3px"
            }} className="btn btn-primary btn-sm pull-right disabled" onClick={() => this.props.onComplete()}>{"next >>"}</button>}
        </div>
      </div>
    )
  }

  renderSwitchSearch() {
    return (
      <div className="row" style={{
        paddingBottom: 10
      }}>
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4" style={{
          display: 'flex'
        }}>
          <span style={{
            fontWeight: 500,
            marginRight: 10
          }}>{'All Layers'}</span>
          <Switch on={this.state.myLayers} onClick={() => {
            this.handleSwitch()
          }}/>
          <span style={{
            fontWeight: 500,
            marginLeft: 10
          }}>{'My Layers'}</span>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-8 col-lg-8">
          <Search layerType={this.props.layerType} myLayers={this.state.myLayers} searchLayers={(layerName) => {
            this.searchLayers(layerName)
          }}/>
        </div>
      </div>
    )
  }

  renderLayers() {
    const {layers} = this.state;
    const {onComplete} = this.props;
    return (
      <ul className="list-group">
        {layers.map((layer, i) => {
          return (
            <div>
              <li className="list-group-item" onClick={() => {
                this.setState({selectedLayerIndex: i, selectedLayer: layer.typename})
              }} style={this.state.selectedLayerIndex == i
                ? {
                  boxShadow: "0px 0px 10px 5px steelblue"
                }
                : {}}>
                <div className="row">
                  <div className="col-xs-12 col-md-3"><img src={layer.thumbnail_url} style={{
              width: "100%"
            }}/></div>

                  <div className="col-xs-12 col-md-9">
                    <div className="content">
                      <h4 className="list-group-item-heading" style={{
                        marginTop: "1%"
                      }}>{layer.title}</h4>
                      <hr></hr>
                      <p className="mb-1">{`${layer.abstract.substring(0, 140)} ...`}</p>
                      <p>{`Owner: ${layer.owner.username}`}</p>

                      <a type="button" href={`/layers/${layer.typename}`} target="_blank" className="btn btn-primary pull-right" style={{
                        margin: "5px",
                        float: "right"
                      }}>
                        Layer Details
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <br></br>
            </div>
          )
        })}
      </ul>
    )
  }

  render() {
    const {layers} = this.state;
    const {onComplete} = this.props;
    return (
      <div>
        {this.renderHeader()}
        <br></br>

        {this.renderSwitchSearch()}
        <br></br>

        {layers.length == 0
          ? <div className="loading"></div>
          : this.renderLayers()}

        <div className="row">
          <div className="col-xs-6 col-xs-offset-4 col-md-2 col-md-offset-5">
            {this.state.showPagination && this.renderPagination()}
          </div>
        </div>
      </div>
    )
  }
}
