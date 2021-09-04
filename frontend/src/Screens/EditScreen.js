import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function EditScreen(props) {
    const [ FileContent, setFileContent ] = useState();
    const [ saved, setSaved ] = useState();

    const search = useLocation().search;
    const file = new URLSearchParams(search).get("file");

    function handleSave() {
        axios.post("/filemanager/write/" + props.match.params.id + "?file=" + file, {newFileContent: FileContent})
            .then(response => {
                setSaved(true);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get("/filemanager/content/" + props.match.params.id + "?file=" + file)
            .then(response => {
                if (response.data.Error) {
                    setFileContent("Error: " + response.data.Error);
                } else {
                    setFileContent(response.data.FileContent);
                }
            })
            .catch(() => {
                setFileContent("Error 404, unable to find this file");
            });
    }, [file, props.match.params.id])

    return (
        <div className="card" style={{margin: 15}}>
            <div className="card-body">
                
                <textarea  className="form-control editable-div" value={FileContent} onChange={(e) => {setFileContent(e.target.value); console.log(FileContent)}} ></textarea>
                
                {
                    saved ? 
                    <div class="alert alert-success" role="alert" style={{marginTop: 10}}>
                        File saved
                    </div>
                    : null
                }

                <div className="file-editor-buttons">
                    <button className="btn btn-success" onClick={handleSave}>Save</button>
                    <button className="btn btn-danger" onClick={() => {window.history.back()/*window.location.href = "/filemanager/" + props.match.params.id + "/"*/}}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

/////////////////////////////////////////
//NON SALVA IL CONTENUTO DI <textarea/>//
/////////////////////////////////////////

export default EditScreen;