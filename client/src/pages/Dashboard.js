import React, {Component} from "react";
import API from '../utils/API'
import {NavLinks} from "../components/NavLinks";
import Container from "../components/Container";
import ContactCard from "../components/ContactCard";
import {PrintText} from "../components/PrintText";
import {Button} from "../components/Button";
import {Panel, PanelGroup} from 'react-bootstrap';
import GuestForm from '../components/GuestForm';
import { Input } from "../components/Input";

class Dashboard extends Component {
    state = {
        contacts: [],
        isAuthenticated: true,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        task: "",
        list: {}
    }
    componentDidMount() {
        
        API.getContacts( results => {
            this.setState({ contacts: results.data.contacts })

            // console.log(this.state.contacts);
        });
        // call API.getContacts
        // it will bring back a list of all contacts belonging to currect user
        // store it in state
        // loop through contacts and display page.
    }

    lastItemId = 0;

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    
    handleGuestEdit = event => {
        event.preventDefault();
        alert("Hey! Edit Button works! That's something to be proud of");
    }

    handleFormSubmit = event => {
        event.preventDefault();
        alert("Hey! Submit Button works! That's something to be proud of");
    }
    handleContactEdit = event => {
        event.preventDefault();
        alert("Hey! This is where editing code goes!")
    }

    newItemId = () => {
        const id = this.lastItemId;
        this.lastItemId += 1;
        return id;
      };

    handleToDoAdd = event => {
        event.preventDefault();
        console.log("Hello there Annie!")
        alert("Added " + this.state.task);
        const id = this.newItemId();
        const taskObj = {
            id,
            task: this.state.task
        };
        const newListObj = this.state.list;
        newListObj[id] = taskObj;

        this.setState({
            list: newListObj
        }, () => console.log(this.state.list));
    };

    handleDelete = id => {
        const removeItems = this.state.list;
        delete removeItems[id];
        this.setState({
            list: removeItems
        })
    };
    renderToDos = () => {
        const bigArray = [];

        for (let taskNum in this.state.list){
            bigArray.push(
                <div>
                    <PrintText>{this.state.list[taskNum].task}</PrintText>
                    <Button
                        onClick={() => this.handleDelete(taskNum)}
                    >
                    X
                    </Button>
                </div>
            );
        }

        return bigArray;
    }
    render() {
        return (
      
            <div>
                <NavLinks/>
                <Container>
               
                <h1 className="dashboard" id="dashboard-title">Dashboard</h1>
                <PanelGroup>
                <Panel>
                    <Panel.Heading>
                        To Do
                    </Panel.Heading>
                    <Panel.Body>
                        <Input
                            value={this.state.task}
                            onChange={this.handleInputChange}
                            name="task"
                            placeholder="Add an Item"
                            >
                        </Input>
                        <Button
                            onClick={this.handleToDoAdd}
                        >
                            Add
                        </Button>
                    </Panel.Body>
                </Panel>
                <Panel>
                    {this.renderToDos()}
                </Panel>
            </PanelGroup>
                <PanelGroup className="manuallyAddUser" accordion id="accordion-example">
                <Panel eventKey="1">
                  <Panel.Heading>

                            <Panel.Title toggle>
                                Add New Guest
                            </Panel.Title>

                         </Panel.Heading>

                     <Panel.Body collapsible>
                     <GuestForm 
                        handleInputChange={this.handleInputChange}
                        handleFormSubmit={this.handleFormSubmit}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        phone={this.state.phone}
                        address={this.state.address}
                        city={this.state.city}
                        state={this.state.state}
                        zipcode={this.state.zipcode}
                 />
                    </Panel.Body>
                </Panel>
            </PanelGroup>            

            <PanelGroup>
                {this.state.contacts.map(contact=>
                    <ContactCard 
                        key={contact.belongsTo}
                        firstName={contact.firstName}
                        lastName={contact.lastName}
                        street={contact.street}
                        city={contact.city}
                        state={contact.state}
                        zipcode={contact.zipcode}
                        phone={contact.phone}
                        email={contact.email}
                    />
                )}
            </PanelGroup>
                </Container>

            </div>
        );
};

};

export default Dashboard;
