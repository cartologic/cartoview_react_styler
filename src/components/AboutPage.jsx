import { Component } from 'react'


export default class AboutPage extends Component {
  render(){
    return(
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="panel-title">
              {this.props.aboutHeader}
            </div>
          </div>
          <div className="panel-body">
            {this.props.aboutBody}


            <button type="button"
              className="btn btn-primary"
              onClick={()=>this.props.onComplete()}
              style={{float:"right", margin:"7% 35% 2% auto", width:"250px", height: "50px", fontSize:"20px"}}>
              Start
            </button>
          </div>
        </div>
      </div>
    )
  }
}
