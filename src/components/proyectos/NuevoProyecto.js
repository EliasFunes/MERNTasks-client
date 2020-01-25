import React, {Fragment, useContext, useState} from 'react';

import proyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
    //obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const {
        formulario,
        errorformulario,
        mostrarFormularioFn,
        agregarProyectoFn,
        mostrarErrorFn
    } = proyectosContext;


    //state para el proyecto
    const localInitialState = {
        nombre: ''
    }
    const [proyecto, guardarProyecto] = useState(localInitialState);

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
        if(nombre === '') {
            mostrarErrorFn();
            return;
        }

        //agregar al state
        agregarProyectoFn(proyecto);

        //reiniciar el form
        guardarProyecto(localInitialState);
    }
    const handleNewForm = () => {
        mostrarFormularioFn();
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={handleNewForm}
            >Nuevo Proyecto</button>

            {formulario
                ?
                (
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
                )
                :
                null
            }

            {errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
        </Fragment>



    );
};

export default NuevoProyecto;
