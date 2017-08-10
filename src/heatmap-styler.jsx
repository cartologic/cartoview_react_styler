import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import WMSClient from './gs-client/WMSClient.jsx'
import WPSClient from './gs-client/WPSClient.jsx'
import LayersList from './components/LayersList.jsx';
import LayerStyles from './components/LayerStyles.jsx';
import AboutPage from './components/AboutPage.jsx';
import Navigator from './components/Navigator.jsx';
import WeightSelector from './heatmap/WeightSelector.jsx';
import HeatmapConfigForm from './heatmap/HeatmapConfigForm.jsx';
import Map from './components/Map.jsx';
import StylesManager from "./managers/StylesManager.jsx";

import "../css/styler.css";
import {
  UNIQUE_VALUES,
  SOLID,
  BY_VALUE,
  DEFAULTS,
  DEFAULT_NUM_OF_CLASSES,
  DEFAULT_PALETTE,
  DEFAULT_COLOR,
  MAX_SIZE,
  DefaultModalStyle
} from './constants/constants.jsx'

import Modal from 'react-modal';

class Styler extends Component {
  state = {
    config: Object.assign({
      radius: 10,
      pixelsPerCell: 10,
      startColor: "#ff0000",
      startOpacity: 1,
      endColor: "#ffff00",
      endOpacity: 1
    }, DEFAULTS),
    step: 0,
    saved: false,

    modalIsOpen: false
  }

  aboutHeader() {
    return (
      <h3>Heatmap Thematic Styler</h3>
    )
  }

  aboutBody() {
    return (
      <div>
        <p>
          Create a hearmap style layer descriptor(SLD), SLD addresses the need for users and software to be able to control the visual portrayal of the geospatial data.
        </p>
        <p>This app will give you the ability to define heatmap styling rules.</p>

        <div className="row">
          <div className='col-xs-12 col-md-10 col-md-offset-1'>
            <img className='img-responsive' src={`/static/${APP_NAME}/images/worldwide heatmap.png`} alt=""/>
          </div>
        </div>

        <p>
          The above image demonstrates a typical example for a categorized thematic map, To start creating your own styles click "Next"
        </p>
      </div>
    )
  }

  helpModal() {
    return (
      <Modal className="modal-dialog" isOpen={this.state.modalIsOpen} style={DefaultModalStyle} onRequestClose={() => {
        this.setState({modalIsOpen: false})
      }}>
        <div className="">
          <div className="panel panel-default">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-6 col-md-6">
                  {this.aboutHeader()}
                </div>
                <div className="col-xs-1 col-md-1 col-md-offset-5 col-xs-offset-5">
                  <div className="pull-right">
                    <a className="btn btn btn-primary" onClick={(e) => {
                      e.preventDefault();
                      this.setState({modalIsOpen: false})
                    }}>
                      x
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-12">
                  {this.aboutBody()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }

  navBar() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-6 col-md-6">
              <h4 style={{
                color: "dimgray"
              }}>Heatmap Styler</h4>
            </div>
            <div className="col-xs-1 col-md-1 col-md-offset-5 col-xs-offset-4">
              <button type="button" style={{
                marginTop: "8%"
              }} className="btn btn-primary" onClick={() => {
                this.setState({modalIsOpen: true})
              }}>
                ?
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  render() {
    var {config, styleObj, step, saved} = this.state;
    const steps = [
      {
        label: "Select Point Layer",
        component: LayersList,
        props: {
          onComplete: (layerName) => {
            this.updateConfig({layerName})
          },
          layerType: "Point"
        }
      }, {
        label: "Set new style name",
        component: LayerStyles,
        props: {
          onComplete: (newConfig) => {
            this.updateConfig(newConfig)
            const {config} = this.state;
            const {layerName, styleName} = config;
            StylesManager.getStyle(layerName, styleName, newConfig.title).then(styleObj => {
              config.styleName = styleObj.name;
              this.setState({styleObj, config})
            })
          },

          onPrevious: () => this.setState({
            step: this.state.step -= 1
          }),
          styleTitle: this.state.config
            ? this.state.config.title
            : undefined
        }
      }, {
        label: "Select Weight",
        component: WeightSelector,
        props: {
          onComplete: (attribute) => this.updateConfig({attribute}),
          tip: "The numeric type attributes only are selectable to perform the purpose of this app",
          onPrevious: () => this.setState({
            step: this.state.step -= 1
          })
        }
      }, {
        label: "Heatmap Parameters",
        component: HeatmapConfigForm,
        props: {

          onComplete: (sld) => {
            this.updateConfig({})
            StylesManager.saveStyle(styleObj, config, sld).then(() => {
              this.setState({saved: true});
            })
          },
          onChange: (newConfig) => this.updateConfig(newConfig, true),
          onPrevious: () => this.setState({
            step: this.state.step -= 1
          })
        }
      }, {
        label: "Preview",
        component: Map,
        props: {
          saved
        }
      }
    ];

    return (
      <div className="col-md-12">
        {this.helpModal()}
        <div className="row">{this.navBar()}</div>
        <div className="row">
          <Navigator steps={steps} step={step} onStepSelected={(step) => this.goToStep(step)}/>
          <div className="col-md-9">
            {steps.map((s, index) => index == step && <s.component {...s.props} config={config} styleObj={styleObj}/>)
}
          </div>
        </div>
      </div>
    )
  }
  updateConfig(newConfig, sameStep) {
    var {config, step} = this.state;
    Object.assign(config, newConfig);
    if (!sameStep)
      step++;
    const saved = false;
    this.setState({config, step, saved});
  }
  goToStep(step) {
    this.setState({step});
  }
}

global.Styler = Styler;
global.React = React;
global.ReactDOM = ReactDOM;
export default Styler;
