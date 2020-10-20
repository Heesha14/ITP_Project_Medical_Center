import React, { Component } from 'react'
import SalaryService from "../Services/SalaryService";
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    CardBody,
    CardText,
    Col, Input,
    InputGroup,
    InputGroupAddon, InputGroupText,
    Label
} from "reactstrap";
import {jsPDF} from "jspdf";

function searchingFor(term){
    return function(x){
        return x.employee_id.toLowerCase().includes(term.toLowerCase()|| !term)
    }
}

export class SearchSalaryById extends Component {

    constructor(props) {
        super(props)

        this.state = {
            focused : '',
            salary : [],
            search : '',
            term : ''
        }
        this.upddateSearch = this.upddateSearch.bind(this)
    }


    componentDidMount(){
        SalaryService.getAllSalary().then((res) => {
            this.setState({ salary : res.data})
        })
    }

    upddateSearch(event){
        this.setState(
            {term : event.target.value}
        )
    }


    render() {
        const{term,salary} = this.state;
        return (

            <div className="content">
                <Breadcrumb>
                    <BreadcrumbItem><a href="/admin/dashboard#">Dashboard</a></BreadcrumbItem>
                    <BreadcrumbItem active>Salary List</BreadcrumbItem>
                </Breadcrumb>


                <>
                    <Card>
                        <CardBody>
                            <InputGroup className={this.state.focused}>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="tim-icons icon-zoom-split" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="text"
                                    placeholder="Search Employee By Employee ID"
                                    onChange={this.upddateSearch.bind(this)} value = {term}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                />
                            </InputGroup>
                        </CardBody>
                    </Card>
                </>

                <div>
                    <br></br>


                    <div className = "card col-md-15 offset-md-0">
                        <br/>
                        <h3 className = "text-center">Salary List</h3>
                        <Col md="20">
                            <Card className="card-user">
                                <CardBody>
                                    <CardText />
                                    <div className="author">
                                        <div className="block block-one" />
                                        <div className="block block-two" />
                                        <div className="block block-three" />
                                        <div className="block block-four" />

                                    </div>



                                    <div id = "card-body-new">


                                        <table className = "table table-striped table-bordered ">
                                            <thead>
                                            <tr>
                                                <th> Employee ID </th>
                                                <th> Employee Name </th>
                                                <th> Year </th>
                                                <th> Month </th>
                                                <th> Work Days </th>
                                                <th> Total Salary </th>
                                                <th> Salary Entered date </th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            {
                                                this.state.salary.filter(searchingFor(term)).map(
                                                    salarys =>
                                                        <tr key = {salarys.sid}>
                                                            <td> {salarys.employee_id} </td>
                                                            <td> {salarys.sname } </td>
                                                            <td> {salarys.year } </td>
                                                            <td> {salarys.month } </td>
                                                            <td> {salarys.work_days } </td>
                                                            <td> {salarys.salary} </td>
                                                            <td> {salarys.datesal} </td>

                                                        </tr>
                                                )
                                            }
                                            </tbody>

                                        </table>

                                    </div>

                                    <div>

                                        <table id = "card-body2" className = "table table-striped table-bordered print-table ">
                                            <thead>
                                            <tr>
                                                <th> Employee ID </th>
                                                <th> Year </th>
                                                <th> Month </th>
                                                <th> Work Days </th>
                                                <th> Monthly Salary </th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            {
                                                this.state.salary.map(
                                                    salarys =>
                                                        <tr key = {salarys.sid}>
                                                            <td> {salarys.employee_id } </td>
                                                            <td> {salarys.year } </td>
                                                            <td> {salarys.month } </td>
                                                            <td> {salarys.work_days } </td>
                                                            <td> {salarys.salary} </td>
                                                        </tr>
                                                )
                                            }
                                            </tbody>

                                        </table>

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

export default SearchSalaryById