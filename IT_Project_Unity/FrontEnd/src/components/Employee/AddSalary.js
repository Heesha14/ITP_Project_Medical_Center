import React from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import EmployeeService from "../Services/EmployeeService";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col
} from "reactstrap";
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import SalaryService from "../Services/SalaryService";
import Alert from "reactstrap/es/Alert";


function validate2(total) {
    const errors2 = [];

    if (total.length === 0) {
        errors2.push("Get the salary calculated");
    }
    return errors2;
}
function validate3(total2) {
    const errors3 = [];

    if (total2.length === 0) {
        errors3.push("Get the salary calculated");
    }
    return errors3;
}

function validate(year, month,work_days) {
    const errors = [];

    if (year.length === 0) {
        errors.push("Enter Year");
    }

    if(month.length === 0) {
        errors.push("Enter Month")
    }

    if(work_days.length === 0) {
        errors.push("Enter Work_days")
    }

    if(work_days.length !== 0) {
        if ((month.valueOf(month) === "January") || (month.valueOf(month) === "March") || (month.valueOf(month) === "May") || (month.valueOf(month) === "July") || (month.valueOf(month) === "August") || (month.valueOf(month) === "October") || (month.valueOf(month) === "Decemeber")) {
            if(work_days.valueOf(work_days) > 31){
                errors.push(" Work_days must be < 31")
                console.log("Month : "+month + "Work days : " +work_days)
            }
        }
        // else if (((month.valueOf(month) === "April") || (month.valueOf(month) === "June") || (month.valueOf(month) === "August") || (month.valueOf(month) === "September") || (month.valueOf(month) === "November")) && work_days.valueOf(work_days) > 30) {
        //     errors.push(" Work_days must be < 30")
        // }
        // else if ((month.valueOf(month) === "February") && work_days.valueOf(work_days) > 28) {
        //     errors.push(" Work_days must be < 28")
        // }

        // if (((month.valueOf(month) === "January") || (month.valueOf(month) === "March") || (month.valueOf(month) === "May") || (month.valueOf(month) === "July") || (month.valueOf(month) === "August") || (month.valueOf(month) === "October") || (month.valueOf(month) === "Decemeber")) && work_days.valueOf(work_days) > 31) {
        //     errors.push(" Work_days must be < 31")
        // }
        // else if (((month.valueOf(month) === "April") || (month.valueOf(month) === "June") || (month.valueOf(month) === "August") || (month.valueOf(month) === "September") || (month.valueOf(month) === "November")) && work_days.valueOf(work_days) > 30) {
        //     errors.push(" Work_days must be < 30")
        // }
        // else if ((month.valueOf(month) === "February") && work_days.valueOf(work_days) > 28) {
        //     errors.push(" Work_days must be < 28")
        // }
    }
    return errors;
}

function validate1(year1, month1,no_appointments,work_days1) {
    const error1 = [];

    if (year1.length === 0) {
        error1.push("Enter Year");
    }
    if(month1.length === 0) {
        error1.push("Enter Month")
    }
    if(no_appointments.length === 0) {
        error1.push("Enter Appointment")
    }
    if(work_days1 != null) {
        if ((month1.valueOf(month1) === "January") || (month1.valueOf(month1) === "March") || (month1.valueOf(month1) === "May") || (month1.valueOf(month1) === "July") || (month1.valueOf(month1) === "August") || (month1.valueOf(month1) === "October") || (month1.valueOf(month1) === "Decemeber")) {
            if(work_days1.valueOf(work_days1) > 31)
                error1.push(" Work_days must be < 31")
        }
        // if (((month1.valueOf(month1) === "April") || (month1.valueOf(month1) === "June") || (month1.valueOf(month1) === "August") || (month1.valueOf(month1) === "September") || (month1.valueOf(month1) === "November")) && work_days1.valueOf(work_days1) > 30) {
        //     error1.push(" Work_days must be < 30")
        // }
        // if ((month1.valueOf(month1) === "February") && work_days1.valueOf(work_days1) > 28) {
        //     error1.push(" Work_days must be < 28")
        // }
    }

    // if(work_days1 != null) {
    //     if (((month1.valueOf(month1) === "January") || (month1.valueOf(month1) === "March") || (month1.valueOf(month1) === "May") || (month1.valueOf(month1) === "July") || (month1.valueOf(month1) === "August") || (month1.valueOf(month1) === "October") || (month1.valueOf(month1) === "Decemeber")) && work_days1.valueOf(work_days1) > 31) {
    //         error1.push(" Work_days must be < 31")
    //     }
    //     if (((month1.valueOf(month1) === "April") || (month1.valueOf(month1) === "June") || (month1.valueOf(month1) === "August") || (month1.valueOf(month1) === "September") || (month1.valueOf(month1) === "November")) && work_days1.valueOf(work_days1) > 30) {
    //         error1.push(" Work_days must be < 30")
    //     }
    //     if ((month1.valueOf(month1) === "February") && work_days1.valueOf(work_days1) > 28) {
    //         error1.push(" Work_days must be < 28")
    //     }
    // }

    return error1;
}


class AddSalary extends React.Component {
    constructor(props) {
        super(props)

        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var currentYear= new Date().getFullYear();


        this.state = {
            employee_id: '',
            id: '',
            name: '',
            docname:'',
            year: currentYear,
            year1:currentYear,
            month: '',
            month1:'',
            work_days: '',
            work_days1:'',
            salary: '',
            total: '',
            total2:'',
            total3:'',
            buttonDisabled : true,
            buttonDisabled1 : true,
            buttonDisabled2 : true,
            buttonDisabled3 : true,
            no_appointments: '',
            date_of_salary: date,
            errors: [],
            error1 : [],
            errors2 : [],
            errors3 : [],
            formErrors: {
                month: "",
                work_days: "",
            }
        }

        this.changeYearHandler = this.changeYearHandler.bind(this);
        this.changeYear1Handler = this.changeYear1Handler.bind(this);
        this.changeMonthHandler = this.changeMonthHandler.bind(this);
        this.changeMonth1Handler = this.changeMonth1Handler.bind(this);
        this.changeWorkDaysHandler = this.changeWorkDaysHandler.bind(this);
        this.changeWorkDays1Handler = this.changeWorkDays1Handler.bind(this);

        this.getEmployeeName = this.getEmployeeName.bind(this);
        this.getEmployeeDocName = this.getEmployeeDocName.bind(this);
        this.saveSalary = this.saveSalary.bind(this);
        this.getEmployeeSalary = this.getEmployeeSalary.bind(this);
        this.getDoctorSalary = this.getDoctorSalary.bind(this);
        this.baseState = this.state;
    }

    handleReset = () => {
        this.setState(this.baseState)
    }

        getEmployeeName(employee_id){
        EmployeeService.getEmployeeByName(this.state.employee_id).then(res => {
            this.setState({name:res.data})
           // console.log('hheeeee' +JSON.stringify(this.state.employee_id))
            //this.state.year = '';
            if(this.state.name != "")
                this.setState({buttonDisabled: false});
        })

    }

    getEmployeeDocName(id){
        EmployeeService.getEmployeeDocNameById(this.state.id).then(res => {
            this.setState({docname:res.data})
             console.log('hheeeee' +JSON.stringify(this.state.docname))
            if(this.state.docname != "")
            this.setState({buttonDisabled2: false});
        })

    }

    getEmployeeSalary(employee_id){
        const { year, month,work_days } = this.state;

        const errors = validate(year, month,work_days);
        if (errors.length > 0) {
            this.setState({ errors });
            console.log(errors)
            return;
        }

        EmployeeService.getEmployeeBySalary(this.state.employee_id).then(res => {
            this.setState({total:res.data})
            console.log("Heesha  " + res.data + this.state.month)
            if(this.state.month === 'January'||this.state.month === 'March'||this.state.month === 'May'||this.state.month === 'July'||this.state.month === 'August'||this.state.month === 'October'||this.state.month === 'December'){
                this.state.total3 = this.state.total - ((31 -this.state.work_days)*(this.state.total/31));
            }
            if(this.state.month === 'February'){
                this.state.total3 = this.state.total - ((28 -this.state.work_days)*(this.state.total/28));
            }
            if(this.state.month === 'April'||this.state.month === 'March'||this.state.month === 'June'||this.state.month === 'September'||this.state.month === 'November'){
                this.state.total3 = this.state.total - ((30 -this.state.work_days)*(this.state.total/30));
            }
            this.setState({buttonDisabled1: false});
        })


    }

    getDoctorSalary(id){
        const { year1, month1,no_appointments,work_days1 } = this.state;
        const error1 = validate1(year1, month1,no_appointments,work_days1);
        if (error1.length > 0) {
            this.setState({ error1 });
            console.log(error1)
            return;
        }

        EmployeeService.getEmployeeAppointFeeById(this.state.id).then(res => {
            this.setState({total2:res.data})
            // console.log('hheeeee' +JSON.stringify(this.state.employee_id))
            //this.state.total3 = this.state.total2 * this.state.no_appointments
            this.setState({buttonDisabled3: false});

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

    saveSalary = (e) => {

        const { total } = this.state;
        const errors2 = validate2(total);
        if (errors2.length > 0) {
            this.setState({ errors2 });
            console.log(errors2)
            return;
        }
        let salary = {
            employee_id : this.state.employee_id,
            sname : this.state.name,
            year : this.state.year,
            month : this.state.month,
            work_days : this.state.work_days,
            datesal : this.state.date_of_salary,
            salary :this.state.total3
        };
        console.log('salary => ' + JSON.stringify(salary));

        SalaryService.createSalary(salary).then(res => {
            this.props.history.push('/admin/salary-list');
        });

    }

    saveSalaryDoc = (e) => {

        const { total2 } = this.state;
        const errors3 = validate2(total2);
        if (errors3.length > 0) {
            this.setState({ errors3 });
            console.log(errors3)
            return;
        }

        let salary = {
            employee_id : this.state.id,
            sname : this.state.docname,
            year : this.state.year1,
            month : this.state.month1,
            no_appointments : this.state.no_appointments,
            work_days : this.state.work_days1,
            datesal : this.state.date_of_salary,
            salary :this.state.total2 * this.state.no_appointments
        };
        console.log('salary => ' + JSON.stringify(salary));

        SalaryService.createSalary(salary).then(res => {
            this.props.history.push('/admin/salary-list');
        });

    }

    changeYearHandler = (event) => {
        this.setState({year : event.target.value});
    }
    changeYear1Handler = (event) => {
        this.setState({year1 : event.target.value});
    }
    changeMonthHandler = (event) => {
        this.setState({month : event.target.value});
    }
    changeMonth1Handler = (event) => {
        this.setState({month1 : event.target.value});
    }
    changeWorkDaysHandler = (event) => {
        this.setState({work_days : event.target.value});
    }
    changeWorkDays1Handler = (event) => {
        this.setState({work_days1 : event.target.value});
    }
    changeNoAppointments = (event) => {
        this.setState({no_appointments : event.target.value});
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        console.log("Heeesha")

        switch (name) {
            case "month":
                formErrors.month =
                    value.length < 10 ? "minimum 3 characters required" : "";

                break;

            case "work_days" :
                if(this.state.month == "January" && this.state.work_days >31)
                    formErrors.work_days =
                        value.valueOf((this.state.work_days)>31) ? "Work days should be < 31" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };




    render() {
        const { errors } = this.state;
        const { error1 } = this.state;
        const { errors2 } = this.state;
        const { errors3 } = this.state;
        const { formErrors } = this.state;
        return (
            <div className="content">

                <Breadcrumb>
                    <BreadcrumbItem><a href="/admin/dashboard#">Dashboard</a></BreadcrumbItem>
                    <BreadcrumbItem active>Salary</BreadcrumbItem>
                </Breadcrumb>


                <Row>
                    <Col md="3.1">
                        <Card>
                            <CardHeader>
                                <h5 className="title">Salary for Other Employees</h5>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col className="pr-md-1" md="10">
                                            <FormGroup>
                                                <label>Employee Id</label>
                                                <Input
                                                    type="number"
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
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label>Date</label>
                                                <Input type="text"
                                                       name = "date_of_salary"
                                                       value= {this.state.date_of_salary} disabled
                                                       onChange={evt => this.setState({ date_of_salary: evt.target.value })}

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
                                                       onChange={this.handleChange}
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

                                                {formErrors.month.length > 0 && (
                                                    <span className="errorMessage">{formErrors.month}</span>
                                                )}
                                            </FormGroup>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label>Working Days</label>
                                                <Input
                                                    type="number" name="work_days"
                                                    onChange={this.handleChange}
                                                    onChange={this.changeWorkDaysHandler}
                                                />
                                                {formErrors.work_days.length > 0 && (
                                                    <span className="errorMessage">{formErrors.work_days} alert("heesha") </span>
                                                )}
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
                                    {errors2.map(error => (
                                        <Alert color="default" key={error}> {error}</Alert>
                                    ))}

                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="2">
                        <Card className="card-user">
                            <CardBody>
                                <CardText />
                                <div className="author">
                                    <div className="block block-one" />
                                    <div className="block block-two" />
                                    <div className="block block-three" />
                                    <div className="block block-four" />

                                </div>
                                <Button onClick={this.getEmployeeName} className="btn-fill" color="primary" type="submit">
                                    Retrieve name
                                </Button>
                                <br/> <br/> <br/>

                                <Button onClick={this.getEmployeeSalary} disabled={this.state.buttonDisabled} className="btn-fill" color="primary" type="submit">
                                    Calculate Salary
                                </Button>

                                <br/> <br/> <br/>

                                <Button onClick={this.saveSalary} disabled={this.state.buttonDisabled1}  className="btn-fill" color="primary" type="submit">
                                    Save Salary
                                </Button>
                                <br/> <br/> <br/>
                                <Button className="btn-fill" color="primary" type="submit">
                                    Salary List
                                    <a href="/admin/salary-list">...</a>
                                </Button>
                                <br/> <br/> <br/>
                                <Button className="btn-fill" onClick={this.handleReset} color="primary" type="submit">
                                    Reset
                                    <a href="/admin/salary">.....</a>
                                </Button>
                                <br/> <br/>

                            </CardBody>

                        </Card>
                    </Col>

                    <Col md="3.1">
                        <Card>
                            <CardHeader>
                                <h5 className="title">Salary for Doctor</h5>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col className="pr-md-1" md="10">
                                            <FormGroup>
                                                <label>Employee Id</label>
                                                <Input
                                                    type="number"
                                                    onChange={evt => this.setState({ id: evt.target.value })}
                                                />
                                            </FormGroup>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label>Name</label>
                                                <Input type="text"
                                                       value={this.state.docname} disabled
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label>Date</label>
                                                <Input type="text"
                                                       name = "date_of_salary"
                                                       value= {this.state.date_of_salary} disabled
                                                       onChange={evt => this.setState({ date_of_salary: evt.target.value })}

                                                />
                                            </FormGroup>
                                        </Col>


                                    </Row>
                                    <Row>
                                        <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label>Year</label>
                                                <Input
                                                    type="text"
                                                    name = "number"
                                                    value= {this.state.year1} disabled
                                                    onChange={evt => this.setState({ year1: evt.target.value })}
                                                    onChange={this.changeYear1Handler}
                                                />
                                            </FormGroup>
                                        </Col>


                                        <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label for="Month">Month *</label>
                                                <Input type="select" name="select" id="Month"

                                                       value={this.state.month1}
                                                       onChange={evt => this.setState({ month1: evt.target.value })}
                                                       onChange={this.changeMonth1Handler}>
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

                                        <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label>No. of Appointments</label>
                                                <Input
                                                    type="number" name="no_appointments"
                                                    onChange={this.changeNoAppointments}
                                                />
                                            </FormGroup>

                                        </Col>

                                        <Col className="pr-md-1" md="5">
                                            <FormGroup>
                                                <label>Working Days</label>
                                                <Input
                                                    type="number" name="work_days1"
                                                    onChange={this.changeWorkDays1Handler}
                                                />
                                            </FormGroup>

                                        </Col>


                                    </Row>


                                    <Row>
                                        <Col className="pr-md-1" md="6">
                                            <FormGroup>
                                                <label>SALARY</label>
                                                <Input type="text"
                                                       value={(this.state.total2 * this.state.no_appointments).toFixed(0)} disabled
                                                />
                                            </FormGroup>
                                        </Col>

                                    </Row>

                                </Form>

                                {error1.map(error => (
                                    <Alert color="default" key={error}> {error}</Alert>
                                ))}
                                {errors3.map(error => (
                                    <Alert color="default" key={error}> {error}</Alert>
                                ))}
                            </CardBody>
                        </Card>
                    </Col>


                    <Col md="2">
                        <Card className="card-user">
                            <CardBody>
                                <CardText />
                                <div className="author">
                                    <div className="block block-one" />
                                    <div className="block block-two" />
                                    <div className="block block-three" />
                                    <div className="block block-four" />

                                </div>
                                <Button onClick={this.getEmployeeDocName} className="btn-fill" color="primary" type="submit">
                                    Retrieve Name
                                </Button>
                                <br/> <br/> <br/>
                                <Button onClick={this.getDoctorSalary} disabled={this.state.buttonDisabled2} className="btn-fill" color="primary" type="submit">
                                    Calculate Salary
                                </Button>
                                <br/> <br/> <br/>
                                <Button onClick={this.saveSalaryDoc} disabled={this.state.buttonDisabled3} className="btn-fill" color="primary" type="submit">
                                    Save Salary
                                </Button>
                                <br/> <br/> <br/>

                                <Button className="btn-fill" color="primary" type="submit">
                                    Salary List
                                    <a href="/admin/salary-list">...</a>
                                </Button>

                                <br/> <br/> <br/>
                                <Button className="btn-fill" onClick={this.handleReset} color="primary" type="submit">
                                    Reset
                                    <a href="/admin/salary">.....</a>
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

export default AddSalary;
