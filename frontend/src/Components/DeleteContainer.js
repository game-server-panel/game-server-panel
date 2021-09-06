import { useState } from "react";
import axios from 'axios';

function DeleteContainer({ containerName, containerId }, props) {
    const [ deleting, setDeleting ] = useState();

    function handleClick() {
        setDeleting(true);

        axios.get("/containers/delete/" + containerId)
            .then(() => {setDeleting(false); window.location.href = "/"})
            .catch((error) => {console.log(error)});
    }

    return (
        <div className="delete-container-button">
            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteServer">Delete server</button>

            <div className="modal fade" id="deleteServer" tabIndex="-1" aria-labelledby="deleteServer" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="delServer">Delete server</h5>
                            {
                                deleting ?
                                    null
                                :
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            }
                        </div>
                        <div className="modal-body">
                            Do you really want to delete: {containerName}
                        </div>
                        {
                            deleting ? 
                                <div className="spinner-border" role="status" style={{margin: 10}}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            :
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger" onClick={handleClick}>Delete</button>
                                </div>
                            
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteContainer;