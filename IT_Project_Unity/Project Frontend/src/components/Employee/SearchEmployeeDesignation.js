import React, { Component } from 'react'
import EmployeeService from "../Services/EmployeeService";
import "assets/css/employee.css";
import {
    Breadcrumb,
    BreadcrumbItem, Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader, CardText, CardTitle,
    Col,
    Form,
    FormGroup,
    Input, InputGroup, InputGroupAddon, InputGroupText, Label,
    Row, Table
} from "reactstrap";


function searchingFor(term){
    return function(x){
        return x.designation.toLowerCase().includes(term.toLowerCase()|| !term)
    }
}
class SearchEmployeeDesignation extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            focused : '',
            search : '',
            employees : [],
            term : ''

        }

        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.upddateSearch = this.upddateSearch.bind(this)
    }

    upddateSearch(event){
        this.setState(
            {term : event.target.value}
        )
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id){//
        // this.props.history.push(`/admin/view-employee/${id}`);
        //console.log(`Hello ${this.state.id}`)
        //this.props.history.push(`/admin/view-employee/:id`);
        this.props.history.push({
            pathname : '/admin/view-employee/',
            state: {
                userid: id
            }
        })
    }

    editEmployee(id) {
        this.props.history.push({
            pathname : '/admin/update-employee/',
            state: {
                userid: id
            }
        })

    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees : res.data})
        })
    }

    addEmployee(){
        this.props.history.push('./add-employee');
    }


    render() {
        const{term,employees} = this.state;
        return (
            <div className="content">

                <Breadcrumb>
                    <BreadcrumbItem><a href="/admin/dashboard#">Dashboard</a></BreadcrumbItem>
                    <BreadcrumbItem><a href="/admin/employees#">Employee List</a></BreadcrumbItem>
                    <BreadcrumbItem active>Search Employee</BreadcrumbItem>
                </Breadcrumb>
                <br/>
                <h4>Search Employee By Designation</h4>
                <Col className="pl-md-1" md="5">

                <FormGroup check inline className="form-check-radio">

                    <label className="form-check-label">
                        <Input type="radio" name="gender" id="exampleRadios12"
                                onChange={this.upddateSearch.bind(this)} value = "Admin"/>
                        Admin
                        <span className="form-check-sign"></span>
                    </label>
                    <label className="form-check-label">
                        <Input type="radio" name="gender" id="exampleRadios11"
                               onChange={this.upddateSearch.bind(this)} value = "Doctor"/>Doctor

                        <span className="form-check-sign"></span>
                    </label>
                    <label className="form-check-label">
                        <Input type="radio" name="gender" id="exampleRadios12"
                               onChange={this.upddateSearch.bind(this)} value = "Nurse"/>
                        Nurse
                        <span className="form-check-sign"></span>
                    </label>
                    <label className="form-check-label">
                        <Input type="radio" name="gender" id="exampleRadios12"
                               onChange={this.upddateSearch.bind(this)} value = "Receptionist"/>
                        Receptionist
                        <span className="form-check-sign"></span>
                    </label>
                    <label className="form-check-label">
                        <Input type="radio" name="gender" id="exampleRadios12"
                               onChange={this.upddateSearch.bind(this)} value = "Driver"/>
                        Driver
                        <span className="form-check-sign"></span>
                    </label>
                </FormGroup>
                </Col>

<br/><br/><br/>


                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">List of Employees</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table className="tablesorter" responsive>
                                    <thead className="text-primary">
                                    <tr>
                                        <th> Employee ID </th>
                                        <th> First Name </th>
                                        <th> Last Name </th>
                                        <th> Email </th>
                                        <th> Date of Birth </th>
                                        <th> Mobile Number </th>
                                        <th> Designation </th>
                                        <th> Username </th>
                                        <th> Actions </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.employees.filter(searchingFor(term)).map(
                                            employee =>
                                                <tr key = {employee.id}>
                                                    <td> {employee.id} </td>
                                                    <td> {employee.firstname } </td>
                                                    <td> {employee.lastname } </td>
                                                    <td> {employee.email } </td>
                                                    <td> {employee.dob } </td>
                                                    <td> {employee.mobile } </td>
                                                    <td> {employee.designation } </td>
                                                    <td> {employee.username } </td>
                                                    <td><Button onClick = {() => this.editEmployee(employee.id)} className = "btn btn-secondary btn-sm"> Update</Button>
                                                        <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger btn-sm">Delete </button>
                                                        <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info btn-sm">View </button>
                                                    </td>
                                                </tr>
                                        )
                                    }
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>



            </div>


        )
    }
}

export default SearchEmployeeDesignation;
