import FormInput from '../Components/FormInput';
import { useForm } from 'react-hook-form';
import { sha256 } from 'js-sha256';
import axios from 'axios';
import { Redirect } from 'react-router';
import { useState } from 'react';

function LoginScreen() {
    const [ errorAlert, setErrorAlert ] = useState();
    const { register, handleSubmit } = useForm();

    function onSubmit(data) {
        axios.post("/api/users/login", {email: sha256(data.email), password: sha256(data.password)})
        .then((response) => {
            setErrorAlert(response.data.Error);
            if (response.data.Error === null) {
                setErrorAlert(<Redirect to="/"></Redirect>);
            }
        })

    }

    return (
        <div className="card" style={{margin: 20}}>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="card-text" style={{marginBottom: 20}}>Login</h3>
                    <FormInput register={register} registerName="email" type="email" text="Email"></FormInput>
                    <FormInput register={register} registerName="password" type="password" text="Password"></FormInput>
                    <button type="submit" className="btn btn-primary mx-auto">Login</button>
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

export default LoginScreen;