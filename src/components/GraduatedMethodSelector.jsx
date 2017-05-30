import { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

class GraduatedMethodSelector extends Component {
  state = {
    attrs: []
  }

  render(){
    const {onComplete} =  this.props;
    const  methods = [{
      label: 'Equal Interval',
      value: 'EQUAL_INTERVAL'
    },
    {
      label: 'Quantile',
      value: 'QUANTILE'
    },
    {
      label: 'Natural Breaks (Jenks)',
      value: 'NATURAL_BREAKS'
    }];
    return <div>
        <p>Classification Method</p>
        <ListGroup>
          {
            methods.map(m => <ListGroupItem tag="a" href="#" onClick={()=>onComplete(m.value)}>
              {m.label}
            </ListGroupItem>)
          }
        </ListGroup>
      </div>;
  }
}
export default GraduatedMethodSelector;
