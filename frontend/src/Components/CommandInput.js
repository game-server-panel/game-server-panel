import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

function CommandInput(props) {
    const { register, watch, handleSubmit } = useForm();

    function onSubmit(data) {
        axios.get("/containers/exec/minecraft/" + props.containerId + "/" + watch("Command"))
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <form className="input-group mb-3" onSubmit={handleSubmit(onSubmit)}>
                <input className="form-control command-history" type="text" {...register("Command")}  placeholder="Command" autoComplete="off"/>
                <button className="btn btn-primary" type="submit">Send</button>
        </form>
    );
}

export default CommandInput;