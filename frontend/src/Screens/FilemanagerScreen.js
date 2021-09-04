import axios from "axios";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
const path = require("path");
const download = require("downloadjs");

const EditableFiles = [
    ".txt",
    ".properties",
    ".json",
    ".settings",
    ".log"
]

function FilemanagerScreen(props) {
    const [ FileDatas, setFileDatas ] = useState();
    const [ CreateFileName, setCreateFileName ] = useState();

    const useLocationSearch = useLocation().search;
    const currentFolder = new URLSearchParams(useLocationSearch).get("folder");

    const history = useHistory();

    useState(() => {
        const getFiles = async () => {             
            axios.get("/filemanager/ls/" + props.match.params.id + "?folder=" + currentFolder)
                .then(response => {
                    if (response.data.Error) {
                        console.log(response.data.Error);
                    } else {
                        setFileDatas(response.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }

        getFiles();
    }, []);

    const handleDownload = async (containerId, filename) => {
        console.log("/filemanager/download/" + containerId + "?file=" + currentFolder + "/" + filename)
        const res = await fetch("/filemanager/download/" + containerId + "?file=" + currentFolder + "/" + filename);

        var file;

        path.extname(filename) === ".json" ? file = await res.text() : file = await res.blob()

        download(file, filename);
    }

    function CreateFile() {
        axios.post("/filemanager/write/" + props.match.params.id + "?file=/" + currentFolder + "/" + CreateFileName, {newFileContent: ""})
            .then(() => {window.location.reload()})
            .catch(error => {console.log(error)});
    }

    return (
        <div className="card" style={{margin: 15}}>
            <div className="card-body">
                <div className="btn-space">
                    <Link to={"/container/" + props.match.params.id}><button className="btn btn-primary">Go back</button></Link>

                    <button className="btn btn-primary" id="createNewFile" data-bs-toggle="dropdown"><i className="bi bi-file-earmark-plus"></i></button>
                    <ul className="dropdown-menu" aria-labelledby="createNewFile">
                        <li style={{margin: 10}}>File name:</li>
                        <li style={{margin: 10}}><input className="form-control" onChange={(event) => {setCreateFileName(event.target.value)}}></input></li>
                        <li>
                            <button className="btn btn-success" style={{margin: 10}} onClick={CreateFile}>Save</button>
                        </li>
                    </ul>

                    {
                        currentFolder === "" ?
                            null
                        :
                            <button className="btn btn-primary" onClick={() => history.goBack()}><i className="bi bi-folder-symlink"></i></button>
                    }
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Filename</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            FileDatas ?
                                FileDatas.Directories.map((directory, i) => {
                                    return (
                                        <tr key={i}>
                                            <th>{directory}</th>
                                            <th>
                                                <button className="btn btn-primary" onClick={() => window.location.href = "/filemanager/" + props.match.params.id + "?folder=" + currentFolder + "/" + directory}>
                                                    <i className="bi bi-folder"></i>
                                                </button>
                                            </th>
                                        </tr>
                                    )
                                })
                            :
                                null
                        }
                        {
                            FileDatas ?
                                FileDatas.Files.map((file, i) => {
                                    return (
                                        <tr key={i}>
                                            <th>{file}</th>
                                            <th className="table-action-buttons">
                                                <button className="btn btn-primary bi bi-download download-file-button" style={{marginRight: 10}} onClick={() => handleDownload(props.match.params.id, file).finally(() => {console.log("Downloading file")})}></button>

                                                {
                                                    EditableFiles.includes(path.extname(file)) ?
                                                        <Link to={"/filemanager/" + props.match.params.id + "/edit?file=" + currentFolder + "/" + file} className="btn btn-primary">
                                                            <i className="bi bi-code-slash"></i>
                                                        </Link>
                                                    : 
                                                        null
                                                }
                                            </th>
                                        </tr>
                                    )
                                })
                            :
                                <tr><th>Loading...</th></tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FilemanagerScreen;

//<DownloadLink label={<i className="btn btn-primary bi bi-download" style={{marginRight: 10}}></i>} style={{all: "unset"}} filename={file} exportFile={() => Promise.resolve(getDataFromURL("/filemanager/download/" + props.match.params.id + "?file=" + currentFolder + "/" + file))}></DownloadLink>
//Nord Sud-est Nord-ovest Nord-est Sud-est