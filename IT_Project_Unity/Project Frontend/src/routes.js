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
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import Employee from "./views/Employee";
import AddEmployee from "./components/Employee/AddEmployee";
import ListEmployeeComponent, {ListEmployee} from "./components/Employee/ListEmployee";
import {UpdateEmployee} from "./components/Employee/UpdateEmployee";
import ViewEmployee from "./components/Employee/ViewEmployee";
import SearchEmployeeName from "./components/Employee/SearchEmployeeName";
import SearchEmployeeDesignation from "./components/Employee/SearchEmployeeDesignation";
import AddSalary from "./components/Employee/AddSalary";
import ListSalary from "./components/Employee/ListSalary";
import Reports from "./components/Employee/Reports";
import {SearchSalaryById} from "./components/Employee/SearchSalaryById";
import UpdateSalary from "./components/Employee/UpdateSalary";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },

  {
    path: "/add-employees",
    name: "Employee",
    rtlName: "الرموز",
    icon: "tim-icons icon-single-02",
    component: AddEmployee,
    layout: "/admin"
  },
  {
    path: "/salary",
    name: "Salary",
    rtlName: "الرموز",
    icon: "tim-icons icon-money-coins",
    component: AddSalary,
    layout: "/admin"
  },
  {
    path: "/expense",
    name: "Expenditure",
    rtlName: "الرموز",
    icon: "tim-icons icon-chart-bar-32",
    layout: "/admin"
  },


  {
    path: "/reports",
    rtlName: "ار تي ال",
    component: Reports,
    name: "Reports",
    icon: "tim-icons icon-align-center",
    layout: "/admin"
  },

  {
    path: "/employees",
    rtlName: "ار تي ال",
    //icon: "tim-icons icon-world",
    invisible : true,
    component: ListEmployee,
    layout: "/admin"
  },


  {
    path: "/searchEmployeeDesignation",
    rtlName: "ار تي ال",
    invisible : true,
    component: SearchEmployeeDesignation,
    layout: "/admin"
  },
  {
    path: "/searchEmployeeName",
    rtlName: "ار تي ال",
    invisible : true,
    component: SearchEmployeeName,
    layout: "/admin"
  },
  {
    path: "/view-employee",
    rtlName: "ار تي ال",
    invisible : true,
    component: ViewEmployee,
    layout: "/admin"
  },
  {
    path: "/update-employee",
    key : "/:id",
    invisible : true,
    rtlName: "ار تي ال",
    component: UpdateEmployee,
    layout: "/admin"
  },
  {
    path: "/salary-list",
    rtlName: "ار تي ال",
    component: ListSalary,
    invisible : true,
    layout: "/admin"
  },
  {
    path: "/searchSalaryById",
    rtlName: "ار تي ال",
    component: SearchSalaryById,
    invisible : true,
    layout: "/admin"
  },
  {
    path: "/update-salary",
    rtlName: "ار تي ال",
    component: UpdateSalary,
    invisible : true,
    layout: "/admin"
  }




];
export default routes;
