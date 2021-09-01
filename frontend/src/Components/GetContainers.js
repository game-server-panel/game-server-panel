import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';

class GetContainers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            Containers: []
        }
    }

    componentDidMount() {
        this.getContainers();
        this.timer = setInterval(() => this.getContainers(), 5000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    getContainers() {
        this.setState({...this.state, isFetching: true});

        axios.get("/containers/list")
            .then(response => {
                this.setState({...this.state, Containers: response.data, isFetching: false});
            })
            .catch(e => {
                console.log(e);
                this.setState({...this.state, Containers: e, isFetching: false});
            })
    }

    render() {
        return (
            <div style={{margin: 20}}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody style={{margin: 15}}>
                        {
                            this.state.Containers ? 
                                this.state.Containers.map((Container, i) => {
                                    return (
                                        <tr key={i}>
                                            <td data-tip={Container.Id + " (Click to copy)"}>
                                                <ReactTooltip/> 
                                                <CopyToClipboard text={Container.Id}>
                                                        <span>{String(Container.Id).substring(0, 20) + "..."}</span>
                                                </CopyToClipboard>
                                            </td>
                                            <td>{Container.Names}</td>
                                            <td>
                                                <Link to={"/container/" + Container.Id} className="btn btn-primary">
                                                    {Container.State} 
                                                    <svg style={{marginLeft: 10}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            :
                                <tr>
                                    <td>ERROR CANNOT CONNECT TO DOCKER</td>
                                    <td>ERROR CANNOT CONNECT TO DOCKER</td>
                                    <td>ERROR CANNOT CONNECT TO DOCKER</td>
                                </tr>
                        }
                    </tbody>
                </table>                

                {
                    this.state.isFetching ? 
                    <div className="spinner-border loading text-info" role="status"></div>
                    :
                    <div></div>
                }
            </div>
        )
    }
}


export default GetContainers;