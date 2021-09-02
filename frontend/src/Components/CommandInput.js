import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function CommandInput(props) {
    const { register, watch, handleSubmit } = useForm();
    const [ reset, setReset ] = useState(false);

    function onSubmit(data) {
        axios.get("/containers/exec/" + props.containerId + "/" + watch("Command"))
            .then(() => {
                setReset(true);
                setReset(false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <form className="input-group mb-3" onSubmit={handleSubmit(onSubmit)}>
            {
                reset ?
                    <input className="form-control command-history" type="text" {...register("Command")}  placeholder="Command" autoComplete="off" value=""/>
                :
                    <input className="form-control command-history" type="text" {...register("Command")}  placeholder="Command" autoComplete="off"/>
            }
            <button className="btn btn-primary" type="submit">Send</button>
        </form>
    );
}

export default CommandInput;