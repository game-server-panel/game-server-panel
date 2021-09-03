import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

class ContainerScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: false,
            ContainerID: this.props.match.params.id,
            Container: {},
            ContainerState: ""
        }
    }

    componentDidMount() {
        this.getContainer();
    }

    getContainer() {
        this.setState({...this.state, isFetching: true});

        axios.get("/containers/id/" + this.state.ContainerID)
            .then(response => {
                this.setState({...this.state, Container: response.data, ContainerState: response.data.State, isFetching: false});
            })
            .catch(e => {
                console.log(e);
                this.setState({...this.state, Container: "err", isFetching: false});
            });
    }

    render() {
        return (
            <div className="card" style={{margin: 25}}>
                <div className="card-body">
                    <Link to={"/"}><button className="btn btn-primary" style={{marginBottom: 10}}>Go back</button></Link>
                    {
                        this.state.Container !== "err" ?  
                            !this.state.isFetching ?
                                <div>
                                    <h1 style={{marginBottom: 15}}>{this.state.Container.Name}</h1>
                                    <p>Container ID: {this.state.ContainerID}</p>
                                    <p>Created: {this.state.Container.Created}</p>
                                    <p>Status: {this.state.ContainerState.Status}</p>
                                    <div className="d-grid gap-2 col-6 mx-auto">
                                        <Link className="btn btn-primary" to={"/console/" + this.state.ContainerID}>Console</Link>
                                        <Link className="btn btn-primary" to={"/filemanager/" + this.state.ContainerID + "?folder="}>File manager</Link>
                                    </div>
                                </div>
                            :
                                <p>Loading...</p>
                        :
                        <h3>Error, unable to find this container</h3>
                    }
                    
                </div>
            </div>
        )
    }
}

export default ContainerScreen;