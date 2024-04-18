/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip, CardText, CardFooter, Breadcrumb, BreadcrumbItem
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.js";
import SearchEmployeeDesignation from "../components/Employee/SearchEmployeeDesignation";
import AddSalary from "../components/Employee/AddSalary";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1"
    };
    this.handleEvent= this.handleEvent.bind(this)
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };

  handleEvent = (e) => {
    this.props.history.push('/admin/employees');
  }

  render() {
    return (
      <>
        <div className="content">

          <Breadcrumb>
            <BreadcrumbItem active>Dashboard</BreadcrumbItem>
          </Breadcrumb>
          <Row>
          <Col md="3">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="/admin/employees">

                    <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/employees.jpg")}
                    />
                    <h5 className="title">List of Employees</h5>
                  </a>
                </div>

              </CardBody>

            </Card>
          </Col>

          <Col md="3">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="/admin/add-employees">

                    <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/employee.jpg")}
                    />
                    <h5 className="title">Add Employee</h5>
                  </a>
                </div>

              </CardBody>

            </Card>
          </Col>

          <Col md="3">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="/admin/searchEmployeeName">

                    <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/searchemp1.jpg")}
                    />
                    <h5 className="title">Search Employee By First Name</h5>
                  </a>
                </div>

              </CardBody>

            </Card>
          </Col>


            <Col md="3">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="/admin/searchEmployeeDesignation">

                      <img
                          alt="..."
                          className="avatar"
                          src={require("assets/img/searchemp2.jpg")}
                      />
                      <h5 className="title">Search Employee By Designation</h5>
                    </a>
                  </div>

                </CardBody>

              </Card>
            </Col>

        </Row>



          <Row>
            <Col md="3">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="/admin/salary-list">

                      <img
                          alt="..."
                          className="avatar"
                          src={require("assets/img/salary1.png")}
                      />
                      <h5 className="title">Salary List</h5>
                    </a>
                  </div>

                </CardBody>

              </Card>
            </Col>

            <Col md="3">
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
                          src={require("assets/img/salary.jpg")}
                      />
                      <h5 className="title">Enter Salary</h5>
                    </a>
                  </div>

                </CardBody>

              </Card>
            </Col>

            <Col md="3">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="/admin/searchSalaryById">

                      <img
                          alt="..."
                          className="avatar"
                          src={require("assets/img/salarys.png")}
                      />
                      <h5 className="title">Search Salary By Employee ID</h5>
                    </a>
                  </div>

                </CardBody>

              </Card>
            </Col>

            <Col md="3">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="/admin/reports">

                      <img
                          alt="..."
                          className="avatar"
                          src={require("assets/img/report.png")}
                      />
                      <h5 className="title">Reports</h5>
                    </a>
                  </div>

                </CardBody>

              </Card>
            </Col>


          </Row>


        </div>
      </>
    );
  }
}

export default Dashboard;
