import {Component} from 'react';
import WMSClient from "../gs-client/WMSClient.jsx";

export default class LayerStyles extends Component {
  state = {
    // styles: [],
    title: this.props.styleTitle
      ? this.props.styleTitle
      : ""
  }

  // componentDidMount(){
  //   const {layerName} = this.props.config;
  //   WMSClient.getLayerStyles(layerName).then((styles) => {
  //     this.setState({styles});
  //   });
  // }

  newStyle() {
    const {title} = this.state;
    if (title.trim() == "") {
      this.setState({error: true});
    } else {
      this.props.onComplete({styleName: "new", title, error: false})
    }
  }

  render() {
    const {styles, title, error} = this.state;

    // if(styles.length == 0){
    //   return <div className="loading"></div>;
    // }

    const {config, onComplete} = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-xs-5 col-md-4">
            <h4>{'General'}</h4>
          </div>
          <div className="col-xs-7 col-md-8">
            <button style={{
              display: "inline-block",
              margin: "0px 3px 0px 3px"
            }} className="btn btn-primary btn-sm pull-right" onClick={() => this.newStyle()}>{"next >>"}</button>

            <button style={{
              display: "inline-block",
              margin: "0px 3px 0px 3px"
            }} className="btn btn-primary btn-sm pull-right" onClick={() => {
              this.props.onPrevious()
            }}>{"<< Previous"}</button>
          </div>
        </div>

        <div className={error
          ? "form-group has-error"
          : "form-group"}>
          <label>
            <h4>Style Name</h4>
          </label>
          <br></br>
          {error && <label className="control-label" htmlFor="inputError1">Enter a valid style name!</label>}
          <input type="text" className="form-control" id="inputError1" placeholder="New Style Title" value={title} onChange={e => this.setState({title: e.target.value})}/>
        </div>

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
