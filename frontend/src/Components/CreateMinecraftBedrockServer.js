import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function CreateMinecraftBedrockServer() {
    const { register, watch, handleSubmit } = useForm();
    const [ SubmitResponse, setSubmitResponse ] = useState();
    const [ IsCreating, setIsCreating ] = useState();

    useEffect(() => {
        /*const getVersions = async () => {
            axios.get("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json")
                .then(response => {
                    setVersions(response.data);
                })
                .catch(error => {
                    console.log(error);
                    return;
                })
        };

        getVersions();*/
    }, []);

    function onSubmit(data) {
        setIsCreating(true);
        axios.post("/containers/create/bedrock", data)
            .then(response => {
                setSubmitResponse(response);
                setIsCreating(false);
            })
            .catch(error => {
                console.log(error);
                setIsCreating(false);
            })
        console.log(data);
    }   
    
    return(
        <div style={{marginTop: 20}}>
            <form onSubmit={handleSubmit(onSubmit)}>                
                <div className="form-floating" style={{marginTop: 10}}>
                    <input type="number" className="form-control" min="1" max="49152" placeholder="25565" {...register("port")}/>
                    <label>Server port (default 25565)</label>
                </div>

                <div className="form-floating" style={{marginTop: 20}}>
                    <input type="text" className="form-control" placeholder="." {...register("name")}/>
                    <label>Server name</label>
                </div>

                <hr></hr>

                <div className="form-check">
                    <input className="form-check-input" type="checkbox" {...register("Eula")}/>
                    <label className="form-check-label">Eula</label>
                </div>
                <div style={{marginTop: 20}}>
                    {
                        watch("Eula") ?
                            <button type="submit" className="btn btn-primary">Create server</button>
                        :
                            <button type="submit" className="btn btn-primary disabled">Create server</button>
                    }
                </div>
            </form>

            {
                IsCreating ?
                    <div>
                        <div className="spinner-border loading text-info" role="status"></div>
                        <label>Creating server, please be patient</label>
                    </div>
                :
                    <div className="spinner-placeholder"></div>
            }

            {
                SubmitResponse ?
                    <Redirect to="/"></Redirect>
                :
                    <div className="redirect-placeholder"></div>
            }
        </div>
    )
}

export default CreateMinecraftBedrockServer;