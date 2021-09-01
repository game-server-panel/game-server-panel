import axios from "axios";
import FormInput from "../Components/FormInput";
import { useForm } from "react-hook-form";
import { sha256 } from 'js-sha256';
import { useState } from "react";
import { Redirect } from "react-router-dom";

function RegisterScreen() {
    const [ errorAlert, setErrorAlert ] = useState();
    const { register, handleSubmit } = useForm();

    function onSubmit(data) {
        if (String(data.password).length < 6 || String(data.password) > 256) {
            setErrorAlert("Minimum password length: 6 characters");
        } else {
            axios.post("/api/users/register", {email: sha256(data.email), password: sha256(data.password), code: data.code})
            .then((response) => {
                console.log(response.data.Error);
                setErrorAlert(response.data.Error);
                if (response.data.Error === null) {
                    setErrorAlert(<Redirect to="/"></Redirect>)
                }
            })
        }
    }

    return (
        <div className="card" style={{margin: 20}}>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="card-text" style={{marginBottom: 20}}>Register</h3>
                    <FormInput register={register} registerName="email" type="email" text="Email"></FormInput>
                    <FormInput register={register} registerName="password" type="password" text="Password"></FormInput>
                    <FormInput register={register} registerName="code" type="password" text="Secret Code (Given by an admin)"></FormInput>
                    <button type="submit" className="btn btn-primary mx-auto">Register</button>
                </form>

                { 
                    errorAlert ?
                    <div className="alert alert-danger" role="alert" style={{marginTop: 30}}>{errorAlert}</div>
                    :
                    <div className="alert-placeholder"></div>
                }
            </div>
        </div>
    )
}

export default RegisterScreen;