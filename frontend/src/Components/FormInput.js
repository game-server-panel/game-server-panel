import React from 'react';

function FormInput(props) {
    var { registerName, text, register, value, type } = props;

    if (type === null) {
        type = "text";
    }

    return (
        <div className="form-floating mb-3">
            { value ? //IF VALUE
                <input {...register(registerName)} type={type} className="form-control" value={value}/>
                : //ELSE
                <input {...register(registerName)} type={type} className="form-control" placeholder={text}/>
            }
            <label htmlFor="floatingInput">{text}</label>
        </div>
    )
}

export default FormInput;

//CERCA COME CREARE UN COMPONENTE JSX CON PROPS PERSONALIZZATI