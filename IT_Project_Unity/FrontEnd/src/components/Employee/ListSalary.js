import React, { Component } from 'react'
import SalaryService from "../Services/SalaryService";
import {Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardText, Col, Label} from "reactstrap";
import EmployeeService from "../Services/EmployeeService";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

export class ListSalary extends Component {

    constructor(props) {
        super(props)

        this.state = {
            salary : []
        }
        this.editEmployee = this.editEmployee.bind(this);

    }

    editEmployee(id) {
        this.props.history.push({
            pathname : '/admin/update-salary/',
            state: {
                userid: id
            }
        })

    }

    generatePDF = () => {
        var doc = new jsPDF('p', 'pt');

        doc.text(20, 20, 'This is the first title.')

        doc.setFont('helvetica')
        doc.text(20, 60, 'This is the second title.')

        doc.setFont('helvetica')
        doc.text(20, 100, 'This is the thrid title.')


        doc.save('demo.pdf')
    }

    generatePDFNEW = () => {
        //document.getElementById('card-body').find('th:last-child, td:last-child').remove()
        const doc = new jsPDF("landscape", "mm", "a4")

        doc.autoTable({ html: '#card-body2' })
        //autoTable(doc, { html: '#mytable' })
        doc.save('salary_list.pdf')

    }


    // generatePDFNEW = () => {
    //     const input = document.getElementById('card-body');
    //
    //     html2canvas(input)
    //         .then((canvas) => {
    //             const imgData = canvas.toDataURL('image/png');
    //             const pdf = new jsPDF();
    //             pdf.addImage(imgData, 'JPEG', 0, 0);
    //             pdf.save("download.pdf");
    //         });
    //     ;
    //
    // }

    componentDidMount(){
        SalaryService.getAllSalary().then((res) => {
            this.setState({ salary : res.data})
        })
    }

    deleteSalary(sid){
        SalaryService.deleteSalary(sid).then( res => {
            this.setState({salary: this.state.salary.filter(salary => salary.sid !== sid)});
            console.log("delete salarry"+sid)
        });
    }

    render() {
        return (

            <div className="content">
                <Breadcrumb>
                    <BreadcrumbItem><a href="/admin/dashboard#">Dashboard</a></BreadcrumbItem>
                    <BreadcrumbItem active>Salary List</BreadcrumbItem>
                </Breadcrumb>
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




                                    <div id = "card-body">

                                        <table className = "table table-striped table-bordered ">
                                            <thead>
                                            <tr>
                                                <th> Salary ID </th>
                                                <th> Employee ID </th>
                                                <th> Employee Name </th>
                                                <th> Year </th>
                                                <th> Month </th>
                                                <th> Work Days </th>
                                                <th> Total Salary(Rs.) </th>
                                                <th> Salary Entered date </th>
                                                <th> Actions </th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            {
                                                this.state.salary.map(
                                                    salarys =>
                                                        <tr key = {salarys.sid}>
                                                            <td> {salarys.sid} </td>
                                                            <td> {salarys.employee_id} </td>
                                                            <td> {salarys.sname } </td>
                                                            <td> {salarys.year } </td>
                                                            <td> {salarys.month } </td>
                                                            <td> {salarys.work_days } </td>
                                                            <td> {salarys.salary} </td>
                                                            <td> {salarys.datesal} </td>
                                                            <td><button onClick = {() => this.editEmployee(salarys.sid)} className = "btn btn-info btn-simple"> Update</button>

                                                                <button style={{marginLeft: "10px"}} onClick={ () => { if (window.confirm('Are you sure you wish to delete the salary?')) this.deleteSalary(salarys.sid) }} className="btn btn-danger btn-simple">Delete </button>

                                                            </td>
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

export default ListSalary