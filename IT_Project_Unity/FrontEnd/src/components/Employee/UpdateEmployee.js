import React, { Component } from 'react'
import EmployeeService from '../Services/EmployeeService';
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
    Input,
    Row, UncontrolledDropdown
} from "reactstrap";
import UploadService from "../Services/upload-files.service";

function validate(firstname,lastname, email,mobile,designation,username, password) {
    const errors = [];
    var format = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var format2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    var format3 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (firstname.length === 0) {
        errors.push(" First Name can't be empty");
    }

    if (lastname.length === 0) {
        errors.push(" Last Name can't be empty");
    }

    if(email.length === 0){
        errors.push("Email cant be empty")
    }
    if(format3.test(mobile) !== true){
        errors.push("Invalid mobile number");
    }
    if(format.test(email) !== true){
        errors.push("Invalid email address");
    }

    if(designation.length === 0){
        errors.push("Designation can't be empty")
    }

    if(username.length === 0){
        errors.push("Username can't be empty")
    }

    if (password.length < 6) {
        errors.push("Password should be at least 6 characters long");
    }

    if(format2.test(password) !== true){
        errors.push("Password should contain at least one numeric digit, one uppercase and one lowercase letter");
    }
    return errors;
}

export class UpdateEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname : '',
            lastname : '',
            email : '',
            address : '',
            dob : '',
            mobile : '',
            gender : '',
            designation : '',
            qualification : '',
            appointfee : '',
            bsalary : '',
            username : '',
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",
            fileInfos: [],
            password : '',
            buttonDisabled:true,
            buttonDisabled1:true,
            buttonDisabled3:true,
            buttonDisabled4:true,
            errors: [],
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeDobHandler = this.changeDobHandler.bind(this);
        this.changeMobileHandler = this.changeMobileHandler.bind(this);
        this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
        this.changeQualificationHandler = this.changeQualificationHandler.bind(this);
        this.changeAppointfeeHandler = this.changeAppointfeeHandler.bind(this);
        this.changeBasicsalaryHandler = this.changeBasicsalaryHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);

        this.updateEmployee = this.updateEmployee.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);

    }

    onButtonClick(event) {
        if(this.state.designation === "Doctor") {
            this.setState({buttonDisabled: true});
            this.setState({buttonDisabled1: false});
        }
        else{
            this.setState({buttonDisabled: false});
            this.setState({buttonDisabled1: true});
        }
    }

    selectFile(event) {
        this.setState({
            selectedFiles: event.target.files,
        });
    }

    upload() {
        let currentFile = this.state.selectedFiles[0];

        this.setState({
            progress: 0,
            currentFile: currentFile,
        });

        UploadService.upload(currentFile, (event) => {
            this.setState({
                progress: Math.round((100 * event.loaded) / event.total),
            });
        })
            .then((response) => {
                this.setState({
                    message: response.data.message,
                });
                return UploadService.getFiles();
            })
            .then((files) => {
                this.setState({
                    fileInfos: files.data,
                });
            })
            .catch(() => {
                this.setState({
                    progress: 0,
                    message: "Could not upload the file!",
                    currentFile: undefined,
                });
            });

        this.setState({
            selectedFiles: undefined,
        });
    }




    componentDidMount(){


        UploadService.getFiles().then((response) => {
            this.setState({
                fileInfos: response.data,
            });
        });
        // alert(this.state.id)
        EmployeeService.getEmployeeById(this.props.location.state.userid).then( (res) => {

            let employee = res.data;
            this.setState({
                firstname : employee.firstname,
                lastname : employee.lastname,
                email : employee.email,
                address : employee.address,
                dob : employee.dob,
                mobile : employee.mobile,
                gender : employee.gender,
                qualification : employee.qualification,
                designation : employee.designation,
                appointfee : employee.appointfee,
                bsalary : employee.bsalary,
                username : employee.username,
                password : ''
            });
            if(this.state.designation === "Doctor") {
                this.setState({buttonDisabled: true});
                this.setState({buttonDisabled1: false});
            }
            else if (this.state.designation !== "Doctor"){
                this.setState({buttonDisabled: false});
                this.setState({buttonDisabled1: true});
            }
        });

    }

    state = {
        isPasswordShown: false
    };

    togglePasswordVisiblity = () => {
        const { isPasswordShown } = this.state;
        this.setState({ isPasswordShown: !isPasswordShown });
    };


    updateEmployee = (e) => {
        e.preventDefault();


        const { firstname, lastname, email,mobile,designation,username, password } = this.state;

        const errors = validate(firstname,lastname, email,mobile,designation,username, password);
        if (errors.length > 0) {
            this.setState({ errors });
            console.log(errors)
            return;
        }

        let employee = {
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            email : this.state.email,
            address : this.state.address,
            dob : this.state.dob,
            mobile : this.state.mobile,
            gender : this.state.gender,
            designation : this.state.designation,
            qualification: this.state.qualification,
            appointfee : this.state.appointfee,
            bsalary : this.state.bsalary,
            username : this.state.username,
            password : this.state.password
        };
        console.log('employee => ' + JSON.stringify(employee));
        console.log(this.state.id);
        // EmployeeService.updateEmployee(employee, this.state.id).then( res => {
        EmployeeService.updateEmployee(employee, this.props.location.state.userid).then( res => {
            this.props.history.push('/admin/employees');
        });

    }

    changeFirstNameHandler = (event) => {
        this.setState({firstname : event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({lastname : event.target.value});
    }

    changeEmailHandler = (event) => {
        this.setState({email : event.target.value});
    }

    changeAddressHandler = (event) => {
        this.setState({address : event.target.value});
    }

    changeDobHandler = (event) => {
        this.setState({dob : event.target.value});
    }

    changeMobileHandler = (event) => {
        this.setState({mobile : event.target.value});
    }

    changeGenderHandler = (event) => {
        this.setState({gender : event.target.value});
    }

    changeQualificationHandler = (event) => {
        this.setState({qualification : event.target.value});
    }

    changeDesignationHandler = (event) => {
        this.setState({designation : event.target.value});
    }

    changeBasicsalaryHandler = (event) => {
        this.setState({bsalary : event.target.value});
    }

    changeAppointfeeHandler = (event) => {
        this.setState({appointfee : event.target.value});
    }

    changeUsernameHandler = (event) => {
        this.setState({username : event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password : event.target.value});
    }

    cancel(){
        this.props.history.push('/admin/employees');
    }

    render() {
        const { isPasswordShown } = this.state;
        const { errors } = this.state;
        const {
            selectedFiles,
            currentFile,
            progress,
            message,
            fileInfos,
        } = this.state
        return (
            <div className="content">

                <Breadcrumb>
                    <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                    <BreadcrumbItem><a href="/admin/dashboard#">Dashboard</a></BreadcrumbItem>
                    <BreadcrumbItem active>Employee</BreadcrumbItem>
                </Breadcrumb>

                <Row>
                    <Col md="8">
                        <Card>
                            <CardHeader>
                                <h5 className="title">Edit Employee</h5>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col className="pr-md-1" md="4">
                                            <FormGroup>
                                                <label>First Name</label>
                                                <Input
                                                    //defaultValue="Heesha"
                                                    //placeholder="Company"
                                                    type="text"
                                                    value={this.state.firstname}
                                                    onChange={evt => this.setState({ firstname: evt.target.value })}
                                                    onChange={this.changeFirstNameHandler}
                                                    noValidate
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col className="px-md-1" md="4">
                                            <FormGroup>
                                                <label>Last Name</label>
                                                <Input
                                                    //defaultValue="michael23"
                                                    //placeholder="Lastname"
                                                    type="text"
                                                    value={this.state.lastname}
                                                    onChange={evt => this.setState({ lastname: evt.target.value })}
                                                    noValidate
                                                    onChange={this.changeLastNameHandler}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-md-1" md="4">
                                            <FormGroup>
                                                <label htmlFor="exampleInputEmail1">
                                                    Email address
                                                </label>
                                                <Input placeholder="example@gmail.com"
                                                       type="email"
                                                       value={this.state.email}
                                                       onChange={evt => this.setState({ email: evt.target.value })}
                                                       noValidate
                                                       onChange={this.changeEmailHandler}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-md-1" md="4">
                                            <FormGroup>
                                                <label>Date of Birth</label>
                                                <Input
                                                    //defaultValue="Mike"
                                                    //placeholder="Date"
                                                    type="date"
                                                    value={this.state.dob}
                                                    onChange={this.changeDobHandler}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-md-1" md="4">
                                            <FormGroup>
                                                <label>Phone number</label>
                                                <Input
                                                    //defaultValue="Phone"
                                                    //placeholder="Phone"
                                                    type="phone"
                                                    value={this.state.mobile}
                                                    onChange={evt => this.setState({ firstname: evt.target.value })}
                                                    noValidate
                                                    onChange={this.changeMobileHandler}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col className="pl-md-1" md="4">
                                            <FormGroup>
                                                <label>Gender</label><br/>
                                                <FormGroup check inline className="form-check-radio">

                                                    <label className="form-check-label">
                                                        <Input type="radio" name="gender" id="exampleRadios11"
                                                               value={this.state.gender}
                                                               onChange={evt => this.setState({ gender: evt.target.value })}
                                                               onChange={this.changeGenderHandler}
                                                               defaultChecked
                                                        />Male
                                                        <span className="form-check-sign"></span>
                                                    </label>
                                                    <label className="form-check-label">
                                                        <Input type="radio" name="gender" id="exampleRadios12"
                                                               value={this.state.gender}
                                                               onChange={evt => this.setState({ gender: evt.target.value })}
                                                               onChange={this.changeGenderHandler}/>
                                                        Female
                                                        <span className="form-check-sign"></span>
                                                    </label>
                                                </FormGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <label>Address</label>
                                                <Input
                                                    type="text"
                                                    value={this.state.address} onChange={this.changeAddressHandler}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-md-1" md="4">
                                            <FormGroup>
                                                <label for="Designation">Designation</label>
                                                <Input type="select" name="select" id="Designation"
                                                       value={this.state.designation} onClick={this.onButtonClick}
                                                       onChange={evt => this.setState({ designation: evt.target.value })}
                                                       noValidate
                                                       onChange={this.changeDesignationHandler}>
                                                    <option>Doctor</option>
                                                    <option>Admin</option>
                                                    <option>Nurse</option>
                                                    <option>Receptionist</option>
                                                    <option>Driver</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col className="px-md-1" md="4">
                                            <FormGroup>
                                                <label>Basic Salary</label>
                                                <Input
                                                    //defaultValue="Salary"
                                                    placeholder="Rs."
                                                    type="number" disabled={this.state.buttonDisabled}
                                                    value={this.state.bsalary} onChange={this.changeBasicsalaryHandler}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-md-1" md="4">
                                            <FormGroup>
                                                <label>Appointment fee</label>
                                                <Input placeholder="Rs."
                                                       type="number" disabled={this.state.buttonDisabled1}
                                                       value={this.state.appointfee} onChange={this.changeAppointfeeHandler}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>

                                        <Col className="pr-md-1" md="4">
                                            <FormGroup>
                                                <label>Qualification</label>
                                                <Input
                                                    type="text"
                                                    value={this.state.qualification}
                                                    onChange={this.changeQualificationHandler}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col className="pr-md-1" md="4">
                                            <FormGroup>
                                                <label>User Name</label>
                                                <Input
                                                    type="text"
                                                    value={this.state.username}
                                                    onChange={evt => this.setState({ username: evt.target.value })}
                                                    noValidate
                                                    onChange={this.changeUsernameHandler}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pl-md-1" md="4">
                                            <FormGroup>
                                                <label>Password *</label>
                                                <Input
                                                    type={isPasswordShown ? "text" : "password"}
                                                    value={this.state.password}
                                                    onChange={evt => this.setState({ password: evt.target.value })}
                                                    noValidate
                                                    onChange={this.changePasswordHandler}
                                                />
                                                <i
                                                    className="fa fa-eye password-icon"
                                                    onClick={this.togglePasswordVisiblity}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    {errors.map(error => (
                                        <Alert color="default" key={error}> {error}</Alert>
                                    ))}

                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button className="btn-fill" onClick={this.updateEmployee} color="primary" type="submit">
                                    Update
                                </Button>
                                <Button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>
                                    Cancel
                                </Button>
                            </CardFooter>
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
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        <img
                                            alt="..."
                                            className="avatar"
                                            src={require("assets/img/doctor.jpg")}
                                        />
                                        <h5 className="title">Dr.Anusha</h5>
                                    </a>
                                    <p className="description">Founder</p>
                                </div>
                                <div className="card-description">
                                    Treet Employees Like They Make A Difference And They Will
                                </div>
                            </CardBody>
                            <CardFooter>

                                {currentFile && (
                                    <div className="progress">
                                        <div
                                            className="progress-bar progress-bar-info progress-bar-striped"
                                            role="progressbar"
                                            aria-valuenow={progress}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            style={{ width: progress + "%" }}
                                        >
                                            {progress}%
                                        </div>
                                    </div>
                                )}

                                <label className="btn btn-default">
                                    <input type="file" onChange={this.selectFile} />
                                </label>

                                <button
                                    className="btn btn-success"
                                    disabled={!selectedFiles}
                                    onClick={this.upload}
                                >
                                    Upload
                                </button>

                                <div className="alert alert-light" role="alert">
                                    {message}
                                </div>




                            </CardFooter>
                        </Card>
                    </Col>
                </Row>

            </div>
        )
    }

}

export default UpdateEmployee;
