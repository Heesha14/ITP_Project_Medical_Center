import React, { Component } from 'react'
import EmployeeService from '../Services/EmployeeService'
import {Breadcrumb, BreadcrumbItem, Card, CardBody, CardText, Col} from "reactstrap";
import "assets/css/employee.css";

class ViewEmployee extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.props.location.state.userid).then( res => {
            this.setState({employee: res.data});
        })
    }

    render() {
        return (

            <div className="content">

                <Breadcrumb>
                    <BreadcrumbItem><a href="/admin/dashboard#">Dashboard</a></BreadcrumbItem>
                    <BreadcrumbItem><a href="/admin/employees#">Employee List</a></BreadcrumbItem>
                    <BreadcrumbItem active>Display Employee</BreadcrumbItem>
                </Breadcrumb>
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Employee Details</h3>

                    <Col md="13">
                    <Card className="card-user">
                        <CardBody>
                            <CardText />
                            <div className="author">
                                <div className="block block-one" />
                                <div className="block block-two" />
                                <div className="block block-three" />
                                <div className="block block-four" />
                                <a href="/admin/salary">

                                    <img
                                        alt="..."
                                        className="avatar"
                                        src={require("assets/img/empicon.png")}
                                    />
                                </a>
                            </div>




                    <div className = "card-body">
                        <div className = "row">
                            <label id = "viewlabels">Employee ID &nbsp; :&nbsp;&nbsp;   </label>
                            <div id = "showlabels"> { this.state.employee.id }</div>
                        </div>
                        <div className = "row">
                            <label id = "viewlabels">First Name &nbsp; :&nbsp;&nbsp;   </label>
                            <div id = "showlabels"> { this.state.employee.firstname }</div>
                        </div>
                        <div className = "row">
                            <label id = "viewlabels"> Last Name&nbsp;:&nbsp;&nbsp; </label>
                            <div id = "showlabels"> { this.state.employee.lastname}</div>
                        </div>
                        <div className = "row">
                            <label id = "viewlabels">Email ID&nbsp;:&nbsp;&nbsp; </label>
                            <div id = "showlabels"> { this.state.employee.email }</div>
                        </div>
                        <div className = "row">
                            <label id = "viewlabels">Date of Birth&nbsp;:&nbsp;&nbsp; </label>
                            <div id = "showlabels"> { this.state.employee.dob }</div>
                        </div>
                        <div className = "row">
                            <label id = "viewlabels">Mobile No&nbsp;:&nbsp;&nbsp; </label>
                            <div id = "showlabels"> { this.state.employee.mobile }</div>
                        </div>
                        <div className = "row">
                            <label id = "viewlabels">Gender&nbsp;:&nbsp;&nbsp; </label>
                            <div id = "showlabels"> { this.state.employee.gender }</div>
                        </div>
                        <div className = "row">
                            <label id = "viewlabels">Address&nbsp;:&nbsp;&nbsp; </label>
                            <div id = "showlabels"> { this.state.employee.address }</div>
                        </div>
                        <div className = "row">
                            <label id = "viewlabels">Designation&nbsp;:&nbsp;&nbsp; </label>
                            <div id = "showlabels"> { this.state.employee.designation }</div>
                        </div>
                        <div className = "row">
                            <label id = "viewlabels">Basic Salary(Rs.)&nbsp;:&nbsp;&nbsp; </label>
                            <div id = "showlabels"> { this.state.employee.bsalary }</div>
                        </div>
                        <div className = "row">
                            <label id = "viewlabels">Appointment fee(Rs.)&nbsp;:&nbsp;&nbsp; </label>
                            <div id = "showlabels"> { this.state.employee.appointfee }</div>
                        </div>
                        <div className = "row">
                            <label id = "viewlabels">Qualification&nbsp;:&nbsp;&nbsp; </label>
                            <div id = "showlabels"> { this.state.employee.qualification }</div>
                        </div>
                        <div className = "row">
                            <label id = "viewlabels">Username&nbsp;:&nbsp;&nbsp; </label>
                            <div id = "showlabels"> { this.state.employee.username }</div>
                        </div>

                    </div>



                        </CardBody>

                    </Card>
                    </Col>




                </div>
            </div>
            </div>
        )
    }
}

export default ViewEmployee