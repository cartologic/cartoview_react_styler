import { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

class NumOfClassesSelector extends Component {
  state = {
    attrs: []
  }

  render(){
    const {onComplete} =  this.props;
    const  classes = [2, 3, 4, 5, 6, 7];
    return <div>
        <p>Number of classes</p>
        <ListGroup>
          {
            classes.map(c => <ListGroupItem tag="a" href="#" onClick={()=>onComplete(c)}>
              {c}
            </ListGroupItem>)
          }
        </ListGroup>
      </div>;
  }
}
export default NumOfClassesSelector;
