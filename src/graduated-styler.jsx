import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import WMSClient from './gs-client/WMSClient.jsx'
import WPSClient from './gs-client/WPSClient.jsx'
import LayersList from './components/LayersList.jsx';
import LayerStyles from './components/LayerStyles.jsx';
import AboutPage from './components/AboutPage.jsx';
// import StyleForm from './components/StyleForm.jsx';
import GeneralSymbolizer from './components/GeneralSymbolizer.jsx';
import CustomStyle from './components/CustomStyle.jsx';
import Navigator from './components/Navigator.jsx';
import AttributeSelector from './components/AttributeSelector.jsx';
import GraduatedMethodSelector from './components/GraduatedMethodSelector.jsx';
import NumOfClassesSelector from './components/NumOfClassesSelector.jsx';
import Map from './components/Map.jsx';
import StylesManager from "./managers/StylesManager.jsx";

import "../css/styler.css";
import {UNIQUE_VALUES, SOLID, BY_VALUE, DEFAULTS, DEFAULT_NUM_OF_CLASSES,
        DEFAULT_PALETTE, DEFAULT_COLOR, MAX_SIZE} from './constants/constants.jsx'

class Styler extends Component {
  state = {
    config: Object.assign({}, DEFAULTS),
    step: 0,
    saved: false
  }


  navBar(){
    return(
    <nav className="navbar navbar-default">
      <div className="container">
        <h4 style={{color:"dimgray"}}>Graduated Thematic Styler</h4>
      </div>
    </nav>
    )
  }


  aboutHeader(){
    return(
      <h3>Graduated Thematic Styler</h3>
    )
  }


  aboutBody(){
    return(
    <div>
      <p>
        Create a layer color range garaduated value style layer descriptor(SLD), SLD addresses the need for users and software to be able to control the visual portrayal of the geospatial data.
      </p>
      <p>This app will let you define graduated thematic styling rules.</p>

      <div className="row">
        <div className='col-xs-12 col-md-10 col-md-offset-1'>
          <img className='img-responsive' src={`/static/${APP_NAME}/images/worldwide population graduated thematic map.png`} alt="" />
        </div>
      </div>

      <p>
        The above image demonstrates a typical example for a graduated thematic map, To start creating your own styles click "Next"
      </p>
    </div>
    )
  }


  render() {
    var {config, styleObj, step, saved} = this.state
    const steps = [{
      label: "About",
      component: AboutPage,
      props: {
        onComplete: () => this.updateConfig({}),
        aboutHeader: this.aboutHeader(),
        aboutBody: this.aboutBody()
      }
    },{
      label: "Select Layer",
      component: LayersList,
      props: {
        onComplete: (layerName) => this.updateConfig({layerName}),
        layerType: "",
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
            config.styleName = styleObj.name;
            this.setState({styleObj, config})
          })
        }
      },
    },
    {
      label: "Select Attribute",
      component: AttributeSelector,
      props: {
        onComplete: (attribute) => {
          this.updateConfig({attribute});
          const {layerName} = this.state.config;
          WPSClient.gsUnique(layerName, attribute).then( res => {
            WMSClient.getLayerType(layerName).then(layerType => this.updateConfig({
              attribute,
              layerType,
              numOfClasses: 5
            }, true));
          });
        },
        filter: a => a.attribute_type.toLowerCase() != "xsd:string",
        tip: "The numeric type attributes only are selectable to perform the purpose of this app"
      }
    },
    {
      label: "Select Method",
      component: GraduatedMethodSelector,
      props: {
        onComplete: (method) => this.updateConfig({method})
      }
    },
    {
      label: "Number of Classes",
      component: NumOfClassesSelector,
      props: {
        onComplete: (numOfClasses) => this.updateConfig({numOfClasses})
      }
    },
    {
      label: "Generate Thematic Style",
      component: GeneralSymbolizer,
      props: {
        type: config.method,
        onComplete: () => {
          StylesManager.createGraduatedRules(styleObj, config).then((styleObj)=>{
            step++;
            this.setState({styleObj, step});
          });
        },
        onChange: (newConfig) => this.updateConfig(newConfig, true)
      }
    },
    {
      label: "Customize Style",
      component: CustomStyle,
      props: {
        onChange: (styleObj) => this.setState({styleObj}),
        onComplete: () => {
          this.updateConfig({})
          StylesManager.saveStyle(styleObj, config).then(() => {
            this.setState({saved: true});
          })
        }
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
