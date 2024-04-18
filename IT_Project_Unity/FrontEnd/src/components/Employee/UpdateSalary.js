import React, { Component } from 'react'
import SalaryService from '../Services/SalaryService';
import {
    Alert,
    Breadcrumb,
    BreadcrumbItem, Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader, CardText,
    Col, DropdownItem, DropdownMenu, DropdownToggle,
    Form,
    FormGroup,
    Input, Label,
    Row, UncontrolledDropdown
} from "reactstrap";
import EmployeeService from "../Services/EmployeeService";

function validate(month,work_days) {

    const errors = [];

    if(work_days.length === 0) {
        errors.push("Enter Work_days")
    }
    if(((month.valueOf(month) === "January") || (month.valueOf(month) === "March") || (month.valueOf(month) === "May") || (month.valueOf(month) === "July") || (month.valueOf(month) === "August") || (month.valueOf(month) === "October") || (month.valueOf(month) === "Decemeber")) && work_days.valueOf(work_days)>31) {
        errors.push(" Work_days must be < 31")
    }
    if(((month.valueOf(month) === "April") || (month.valueOf(month) === "June") || (month.valueOf(month) === "August") || (month.valueOf(month) === "September") || (month.valueOf(month) === "November")) && work_days.valueOf(work_days)>30) {
        errors.push(" Work_days must be < 30")
    }
    if((month.valueOf(month) === "February") && work_days.valueOf(work_days)>28){
        errors.push(" Work_days must be < 28")
    }
    return errors;
}


export class UpdateSalary extends Component {

    constructor(props) {
        super(props)

        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var currentYear = new Date().getFullYear();


        this.state = {
            employee_id: '',
            id: '',
            name: '',
            docname: '',
            year: currentYear,
            year1: currentYear,
            month: '',
            month1: '',
            work_days: '',
            work_days1: '',
            salary: '',
            total: '',
            total2: '',
            total3: '',
            errors: [],
            no_appointments: '',
            date_of_salary: date,
            date_salary :date,
            buttonDisabled: true,
            buttonDisabled1: true,
            buttonDisabled2: true,
            buttonDisabled3: true
        }
        this.onButtonClick = this.onButtonClick.bind(this)
        // this.getEmployeeName = this.getEmployeeName.bind(this);
        // this.getEmployeeDocName = this.getEmployeeDocName.bind(this);
        // this.saveSalary = this.saveSalary.bind(this);
        this.getEmployeeSalary = this.getEmployeeSalary.bind(this);
        this.getDoctorSalary = this.getDoctorSalary.bind(this);
        // this.baseState = this.state;
    }

    componentDidMount() {
        SalaryService.getSalaryById(this.props.location.state.userid).then((res) => {

            let salary = res.data;
            this.setState({
                employee_id: salary.employee_id,
                name: salary.sname,
                year: salary.year,
                month: salary.month,
                work_days: salary.work_days,
                date_of_salary: salary.datesal,
                no_appointments: salary.no_appointments,
                total3: salary.salary
            });
        });

    }


    updateSalary = (e) => {
        e.preventDefault();

        let salary = {
            employee_id: this.state.employee_id,
            sname: this.state.name,
            year: this.state.year,
            month: this.state.month,
            work_days: this.state.work_days,
            datesal: this.state.date_salary,
            no_appointments: this.state.no_appointments,
            salary: this.state.total3,

        };
        console.log('salary => ' + JSON.stringify(salary));
        console.log("id :"  + this.props.location.state.userid);
        SalaryService.updateSalary(salary, this.props.location.state.userid).then(res => {
            this.props.history.push('/admin/salary-list');
        });

    }


    onButtonClick(event) {
        if(this.state.no_appointments === 0) {
            this.setState({buttonDisabled: false});
            this.setState({buttonDisabled1: true});
            //this.setState({buttonDisabled2: false});
        }
        else{
            this.setState({buttonDisabled1: false})
            this.setState({buttonDisabled: true})
            this.setState({buttonDisabled3: false})
            //this.setState({buttonDisabled2: false})
        }
    }



    getEmployeeSalary(employee_id){

        const { month,work_days } = this.state;

        const errors = validate(month,work_days);
        if (errors.length > 0) {
            this.setState({ errors });
            console.log(errors)
            return;
        }

        EmployeeService.getEmployeeBySalary(this.state.employee_id).then(res => {
            this.setState({total:res.data})
            if(this.state.month === 'January'||this.state.month === 'March'||this.state.month === 'May'||this.state.month === 'July'||this.state.month === 'August'||this.state.month === 'October'||this.state.month === 'December'){
                this.state.total3 = this.state.total - ((31 -this.state.work_days)*(this.state.total/31));
            }
            if(this.state.month === 'February'){
                this.state.total3 = this.state.total - ((28 -this.state.work_days)*(this.state.total/28));
            }
            if(this.state.month === 'April'||this.state.month === 'March'||this.state.month === 'June'||this.state.month === 'September'||this.state.month === 'November'){
                this.state.total3 = this.state.total - ((30 -this.state.work_days)*(this.state.total/30));
            }
            this.setState({buttonDisabled2: false})

        })

    }

    getDoctorSalary(employee_id){
        const { month,work_days } = this.state;

        const errors = validate(month,work_days);
        if (errors.length > 0) {
            this.setState({ errors });
            console.log(errors)
            return;
        }

        console.log(this.state.employee_id)
        EmployeeService.getEmployeeAppointFeeById(this.state.employee_id).then(res => {
            this.setState({total2:res.data})

            this.state.total3 = this.state.total2 * this.state.no_appointments

            this.setState({buttonDisabled2: false});
        })
    }
    render() {
        const { errors } = this.state;
        return (

            <div className="content">

                <Breadcrumb>
                    <BreadcrumbItem><a href="/admin/dashboard#">Dashboard</a></BreadcrumbItem>
                    <BreadcrumbItem active>Update Salary Info</BreadcrumbItem>
                </Breadcrumb>


                <Row>
                    <Col md="8">
                        <Card>
                            <CardHeader>
                                <h5 className="title">Update Salary of Employees</h5>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col className="pr-md-1" md="10">
                                            <FormGroup>
                                                <label>Employee Id</label>
                                                <Input
                                                    type="number"
                                                    value={this.state.employee_id} disabled
                                                    onChange={evt => this.setState({ employee_id: evt.target.value })}
                                                />
                                            </FormGroup>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label>Name</label>
                                                <Input type="text"
                                                       value={this.state.name} disabled
                                                       onChange={evt => this.setState({ name: evt.target.value })}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label>Date</label>
                                                <Input type="text"
                                                       name = "date_of_salary"
                                                       value= {this.state.date_salary} disabled
                                                       onChange={evt => this.setState({ date_salary: evt.target.value })}

                                                />
                                            </FormGroup>
                                        </Col>

                                    </Row>


                                    <Row>
                                        <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label>Year</label>
                                                <Input
                                                    type="number"
                                                    name = "year"
                                                    value= {this.state.year} disabled
                                                    onChange={evt => this.setState({ year: evt.target.value })}
                                                    onChange={this.changeYearHandler}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label for="Month">Month *</label>
                                                <Input type="select" name="select" id="Month"
                                                       value={this.state.month}
                                                       onChange={evt => this.setState({ month: evt.target.value })}
                                                       onChange={this.changeMonthHandler}>
                                                    <option>Select....</option>
                                                    <option id = "January">January</option>
                                                    <option id = "February">February</option>
                                                    <option id = "March">March</option>
                                                    <option id = "April">April</option>
                                                    <option id = "May">May</option>
                                                    <option id = "June">June</option>
                                                    <option id = "July">July</option>
                                                    <option id = "August">August</option>
                                                    <option id = "September">September</option>
                                                    <option id = "October">October</option>
                                                    <option id = "November">November</option>
                                                    <option id = "December">December</option>
                                                </Input>


                                            </FormGroup>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label>Working Days</label>
                                                <Input
                                                    type="number" name="work_days"
                                                    value={this.state.work_days}
                                                    onChange={evt => this.setState({ work_days: evt.target.value })}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label>Number of Appointments</label>
                                                <Input
                                                    type="number" name="no_appointments"
                                                    value={this.state.no_appointments}
                                                    disabled={this.state.buttonDisabled3}
                                                    onChange={evt => this.setState({ no_appointments: evt.target.value })}
                                                />
                                            </FormGroup>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label>SALARY</label>
                                                <Input type="text"
                                                       value={(this.state.total3*1).toFixed(0)} disabled
                                                />
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                    {errors.map(error => (
                                        <Alert color="default" key={error}> {error}</Alert>
                                    ))}

                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="card-user">
                            <CardBody>
                                <CardText />
                                <div className="author">
                                    <div className="block block-one" />
                                    <div className="block block-two" />
                                    <div className="block block-three" />
                                    <div className="block block-four" />

                                </div>
                                <Button onClick={this.onButtonClick}  className="btn-fill" color="primary" type="submit">
                                   Make Changes
                                </Button>
                                <br/> <br/> <br/>


                                <Button onClick={this.getEmployeeSalary} disabled={this.state.buttonDisabled} className="btn-fill" color="primary" type="submit">
                                   Calculate Other Employee Salary
                                </Button>

                                <br/> <br/> <br/>

                                <Button onClick={this.getDoctorSalary} disabled={this.state.buttonDisabled1} className="btn-fill" color="primary" type="submit">
                                    Calculate Doctor Salary
                                </Button>
                                    <br/> <br/> <br/>


                                <Button onClick={this.updateSalary} disabled={this.state.buttonDisabled2} className="btn-fill" color="primary" type="submit">
                                    Update Salary
                                </Button>
                                <br/> <br/> <br/>
                                <Button className="btn-fill" color="primary" type="submit">
                                    Salary List
                                    <a href="/admin/salary-list">...</a>
                                </Button>
                                <br/> <br/>


                            </CardBody>

                        </Card>
                    </Col>


                </Row>




            </div>
        )
    }



}
export default UpdateSalary;