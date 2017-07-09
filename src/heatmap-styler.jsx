import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import WMSClient from './gs-client/WMSClient.jsx'
import WPSClient from './gs-client/WPSClient.jsx'
import LayersList from './components/LayersList.jsx';
import LayerStyles from './components/LayerStyles.jsx';
import Navigator from './components/Navigator.jsx';
import WeightSelector from './heatmap/WeightSelector.jsx';
import HeatmapConfigForm from './heatmap/HeatmapConfigForm.jsx';
import Map from './components/Map.jsx';
import StylesManager from "./managers/StylesManager.jsx";

import "../css/styler.css";
import {UNIQUE_VALUES, SOLID, BY_VALUE, DEFAULTS, DEFAULT_NUM_OF_CLASSES,
        DEFAULT_PALETTE, DEFAULT_COLOR, MAX_SIZE} from './constants/constants.jsx'

class Styler extends Component {
  state = {
    config: Object.assign({
      radius: 10 ,
      pixelsPerCell: 10,
      startColor: "#ff0000",
      startOpacity: 1,
      endColor: "#ffff00",
      endOpacity: 1,
    }, DEFAULTS),
    step: 0,
    saved: false
  }


  navBar(){
    return(
    <nav className="navbar navbar-default">
      <div className="container">
        <h4 style={{color:"dimgray"}}>Cartoview Point in Polygon Analysis Tool</h4>
      </div>
    </nav>
    )
  }


  render() {
    var {config, styleObj, step, saved} = this.state;
    const steps = [{
      label: "Select Layer",
      component: LayersList,
      props: {
        onComplete: (layerName) => this.updateConfig({layerName}),
        layerType: "Point",
      }
    },
    {
      label: "Set new style name",
      component: LayerStyles,
      props: {
        onComplete: (newConfig) => {
          this.updateConfig(newConfig)
          const {config} = this.state;
          const {layerName, styleName} = config;
          StylesManager.getStyle(layerName, styleName, newConfig.title).then(styleObj => {
            if(styleName == 'new'){
              config.styleName = styleObj.name;
            }
            config.styleTitle = styleObj.namedLayers[styleObj.name].userStyles[0].title;
            this.setState({styleObj, config})
          })
        }
      }

    },
    {
      label: "Select Weight",
      component: WeightSelector,
      props: {
        onComplete: (attribute) => this.updateConfig({attribute}),

      }
    },
    {
      label: "Heatmap Parameters",
      component: HeatmapConfigForm,
      props: {

        onComplete: (sld) => {
          this.updateConfig({})
          StylesManager.saveStyle(styleObj, config, sld).then(() => {
            this.setState({saved: true});
          })
        },
        onChange: (newConfig) => this.updateConfig(newConfig, true)
      }
    },
    {
      label: "Preview",
      component: Map,
      props: {saved}
    }];

    return(
      <div className="col-md-12">
        <div className="row">{this.navBar()}</div>
        <div className="row">
          <Navigator steps={steps} step={step} onStepSelected={(step)=>this.goToStep(step)}/>
          <div className="col-md-9">
            {
              steps.map((s,index) => index == step && <s.component {...s.props} config={config} styleObj={styleObj}/>)
            }
          </div>
        </div>
      </div>
    )
  }
  updateConfig(newConfig, sameStep){
    var {config, step} = this.state;
    Object.assign(config, newConfig);
    if(!sameStep) step++;
    const saved = false;
    this.setState({config, step, saved});
  }
  goToStep(step){
    this.setState({step});
  }
}

global.Styler = Styler;
global.React = React;
global.ReactDOM = ReactDOM;
export default Styler;
