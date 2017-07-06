import { Component } from 'react';
import WMSClient from "../gs-client/WMSClient.jsx";


class LayerStyles extends Component {
  state = {
    // styles: [],
    title: ''
  }

  // componentDidMount(){
  //   const {layerName} = this.props.config;
  //   WMSClient.getLayerStyles(layerName).then((styles) => {
  //     this.setState({styles});
  //   });
  // }


  newStyle(){
    const {title} = this.state;
    if(title.trim() == ""){
      this.setState({error:true});
    }
    else{
      this.props.onComplete({styleName:"new", title, error: false})
    }

  }


  render(){
    const {styles, title, error} = this.state;

    // if(styles.length == 0){
    //   return <div className="loading"></div>;
    // }

    const {config, onComplete} = this.props;
    return (
      <div>
        <div className={error ? "form-group has-error" : "form-group"}>
          <label><h4>Style Name</h4></label><br></br>
          {error && <label className="control-label" htmlFor="inputError1">Enter a valid style name!</label>}
          <input type="text" className="form-control" id="inputError1" placeholder="New Style Title" value={title} onChange={e => this.setState({title:e.target.value})}/>
        </div>

        <button type="button" className="btn btn-primary" onClick={() => this.newStyle()} style={{marginTop: "5px"}}>
          Next
        </button>

        {/*
        <p>
          {"or select style to override"}
        </p>
        <ListGroup>
          {
            styles.map((style) => (
              <ListGroupItem onClick={() => onComplete({styleName:style.name})} tag="a" href="#">
                {style.title || style.name}
              </ListGroupItem>)
            )
          }
        </ListGroup>
        */}
      </div>
    )
  }
}
export default LayerStyles;
