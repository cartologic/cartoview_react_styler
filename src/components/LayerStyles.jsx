import { Component } from 'react';
import WMSClient from "../gs-client/WMSClient.jsx";
import { ListGroup, ListGroupItem, Button, Form, FormGroup, Input, FormFeedback } from 'reactstrap';

class LayerStyles extends Component {
  state = {
    styles: [],
    title: ''
  }

  componentDidMount(){
    const {layerName} = this.props.config;
    WMSClient.getLayerStyles(layerName).then((styles) => {
      this.setState({styles});
    });
  }
  render(){
    const {styles, title, error} = this.state;
    if(styles.length == 0){
      return <div className="loading"></div>;
    }
    const {config, onComplete} = this.props;
    return <div>

      <FormGroup color={error}>
        <label>{"Create new style "}</label>
        <Input state={error} placeholder="New Style Title" value={title} onChange={e => this.setState({title:e.target.value})}/>
        {error && <FormFeedback color="muted">Please enter a valid title</FormFeedback>}
      </FormGroup>
      <Button color="primary" onClick={() => this.newStyle()}>
      {"Next"}
      </Button>
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
    </div>
  }
  newStyle(){
    const {title} = this.state;
    if(title.trim() == ""){
      this.setState({error:"danger"});
    }
    else{
      this.props.onComplete({styleName:"new", title})
    }

  }
}
export default LayerStyles;
