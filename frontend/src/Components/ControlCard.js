import React from "react";
import axios from "axios";
import CommandInput from "./CommandInput";

import '../index.css';

class ControlCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            status: "",
            commandHistory: "",
            isFetching: false,
            fixToBottom: true,
            date: new Date()
        };

        this.textarea = React.createRef();
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.getCommandHistory(), 500);
        this.interval = setInterval(() => this.getCurrentStatus(), 500);

        this.getCurrentStatus();

        this.textareaChange(this.textarea.current);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    componentDidUpdate() {
        if (this.state.fixToBottom) {
            this.textarea.current.scrollTop = this.textarea.current.scrollHeight;
        }
    }

    getCurrentStatus() {
        this.setState({...this.state, isFetching: true});

        axios.get("/containers/id/" + this.props.containerId)
            .then(response => {
                this.setState({...this.state, status: response.data.State.Status, isFetching: false});
            })
            .catch(e => {
                console.log(e);
                this.setState({...this.state, isFetching: false});
            });
    }

    getCommandHistory= () => {
        this.setState({
            ...this.state,
            isFetching: true
        })
        
        axios.get("/containers/history/" + this.props.containerId)
        .then(response => {
            this.setState({...this.state, commandHistory: response.data.ContainerHistory, isFetching: false});
        })
        .catch((e) => {
            console.log(e);
            this.setState({...this.state, isFetching: false});
        });    
    }

    textareaChange(ta) {
        if (this.state.fixToBottom) {
        } else {
            ta.style.overflow = "visible";
        }

        ta.style.height = "450px";
        ta.style.color = "white";
        ta.style.resize = "none";
    }

    handleCheckboxChange(event) {
        this.setState({...this.state, fixToBottom: event.target.checked});
    }
    
    onStart = () => {
        this.setState({
            ...this.state,
            isFetching: true,
        });

        axios.get("/containers/start/" + this.props.containerId)
            .then(response => {
                this.setState({
                    ...this.state,
                    isFetching: false,
                    commandHistory: this.getCommandHistory()
                });
            })
            .catch(e => {
                console.log(e);
                this.setState({...this.state, isFetching: false});
            });
    }

    onStop = () => {
        this.setState({
            ...this.state,
            isFetching: true,
        });

        axios.get("/containers/stop/" + this.props.containerId)
        .then(response => {
            this.setState({
                ...this.state,
                isFetching: false,
                commandHistory: this.getCommandHistory()
            });
        })
        .catch(e => {
            console.log(e);
            this.setState({...this.state, isFetching: false});
        });
    }

    onRestart = () => {
        this.onStop();
        this.onStart();
    }

    render() {
        return (
            <div className="card" style={{margin: 15}} >
                <div className="card-body">
                    <div className="form-floating">
                        {
                            this.state.commandHistory ?
                                <div>
                                    <textarea className="form-control commands-history bg-dark" onLoad={(e) => this.textareaChange(e.target)} ref={this.textarea} value={this.state.commandHistory} readOnly></textarea>
                                </div>
                            :   
                            <div>
                                <textarea className="form-control commands-history bg-dark" ref={this.textarea} onLoad={(e) => this.textareaChange(e.target)} value="Loading..." readOnly></textarea>
                            </div>
                        }
                    </div>
                    <CommandInput containerId={this.props.containerId}></CommandInput>

                    <div className="form-check" style={{marginBottom: -30}}>
                        <input className="form-check-input" type="checkbox" checked={this.state.fixToBottom} onChange={this.handleCheckboxChange}/>
                        <label className="form-check-label">Fix to bottom</label>
                    </div>


                    {
                        this.state.status === "running" ? 
                            <div className="d-md-block d-md-flex justify-content-md-end control-card-buttons">
                                <button className="btn btn-primary disabled" type="button">Start</button>
                                <button className="btn btn-warning" type="button" onClick={this.onRestart}>Restart</button>
                                <button className="btn btn-danger" type="button" onClick={this.onStop}>Stop</button>
                            </div>
                        : this.state.status === "exited" ?
                                <div className="d-md-block d-md-flex justify-content-md-end control-card-buttons">
                                    <button className="btn btn-primary" type="button" onClick={this.onStart}>Start</button>
                                    <button className="btn btn-warning disabled" type="button">Restart</button>
                                    <button className="btn btn-danger disabled" type="button">Stop</button>
                                </div>
                            : 
                                <div className="d-md-block d-md-flex justify-content-md-end control-card-buttons">
                                    <button className="btn btn-primary disabled" type="button" onClick={this.onStart}>Start</button>
                                    <button className="btn btn-warning disabled" type="button">Restart</button>
                                    <button className="btn btn-danger disabled" type="button">Stop</button>
                                </div>
                    }
                </div>

                <h3 className="main-title">{this.state.title}</h3>
            </div>
        )
    }
}

export default ControlCard;