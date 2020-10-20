import React, { Component } from 'react'
import {Breadcrumb, BreadcrumbItem, Card, CardBody, CardText, Col} from "reactstrap";
import "assets/css/employee.css";
import UploadService from "../Services/upload-files.service";

class ListFiles extends Component {
    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);

        this.state = {
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",

            fileInfos: [],
        };
    }

    componentDidMount() {
        UploadService.getFiles().then((response) => {
            this.setState({
                fileInfos: response.data,
            });
        });
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


    render() {
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
                    <BreadcrumbItem><a href="/admin/dashboard#">Dashboard</a></BreadcrumbItem>
                    <BreadcrumbItem active>List of employee uploads info</BreadcrumbItem>
                </Breadcrumb>

                <Col md="13">
                    <Card className="card-user">
                        <CardBody>
                            <CardText />
                            <div className="author">
                                <div className="block block-one" />
                                <div className="block block-two" />
                                <div className="block block-three" />
                                <div className="block block-four" />
                                    <h3 className="title">List of Files</h3>
                                    <img
                                        alt="..."
                                        className="avatar"
                                        src={require("assets/img/fileimg.png")}
                                    />

                                    <img
                                        alt="..."
                                        className="avatar"
                                        src={require("assets/img/profilepic.png")}
                                    />


                                <ul className="list-group list-group-flush list-group-mine">
                                    {fileInfos &&
                                    fileInfos.map((file, index) => (
                                        <li className="list-group-item" key={index}>
                                            <a href={file.url}>{file.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </CardBody>

                    </Card>
                </Col>


            </div>


        )
    }
}

export default ListFiles