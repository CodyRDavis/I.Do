import React from "react";
import { Button, Modal} from 'react-bootstrap';




class GuestLink extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false
      };
    }

    componentDidMount(){
      console.log("props ID",this.props.eventID)
      this.setState({eventID: this.props.eventID})
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    render(props) {

      return (
        <div>
          <p id="modal-message">Please copy this link and send to your guests.</p>
  
          <Button bsStyle="primary" 
                  bsSize="medium" onClick={this.handleShow} 
                  style={   { "background": this.props.secondaryColor,
                              "color": this.props.fontColor,
                              "margin-left": "25%",
                              "width": "50%",
                              "border": 0}}>
            Guest Link
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Guest Link</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Copy the link below</h4>
              <p>
                https://i-dooo.herokuapp.com/event/{this.props.eventID}
              </p>
              
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
  
//   render (<GuestLink />);
export default GuestLink;