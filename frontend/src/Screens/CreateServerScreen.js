import React from 'react';
import { useForm } from 'react-hook-form';

import CreateMinecraftServer from '../Components/CreateMinecraftServer'

var SelectedGame;

function CreateServerScreen() {
    const { register, watch } = useForm();
    switch (watch("SelectedGame")) {
        case "Minecraft":
            SelectedGame = <CreateMinecraftServer></CreateMinecraftServer>;
            break;
        case "Terraria":
            SelectedGame = null;
            break;
        default:
            SelectedGame = null;
            break;
    }

    return (
        <div className="create-server-screen">
            <h3 className="main-title">Game</h3>
            <select {...register("SelectedGame")} className="form-select" style={{height: 60}} aria-label="Default select example">
                <option>Select a game</option>
                <option value="Minecraft">Minecraft</option>
                <option value="Terraria">Terraria</option>
                <option value="Unavabile">WIP</option>
            </select>
            <div>{SelectedGame}</div>
        </div>
    )
}

export default CreateServerScreen;