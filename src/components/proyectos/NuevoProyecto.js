import React, {Fragment, useState} from 'react';

const NuevoProyecto = () => {

    const [proyecto, guardarProyecto] = useState({
        nombre:''
    });

    const {nombre} = proyecto;

    const handleChange = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        //validar el proyecto

        //agregar al state

        //reiniciar el form
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
            >Nuevo Proyecto</button>

            <form
                className="formulario-nuevo-proyecto"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    className="input-text"
                    placeholder="Nombre del Proyecto"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                />

                <input
                    type="submit"
                    className="btn btn-primario btn-block"
                    value="Agregar Proyecto"
                />
            </form>
        </Fragment>



    );
};

export default NuevoProyecto;
