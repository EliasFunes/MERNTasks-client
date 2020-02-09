import React, {useContext, useEffect, useState} from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {

    const initialState = {
        nombre: ''
    }

    const [tarea, guardarTarea] = useState(initialState);

    const {nombre} = tarea;

    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const {
        errorTarea,
        tareaSeleccionada,
        agregarTareaFn,
        validarTareaFn,
        obtenerTareasFn,
        actualizarTareaFn,
        limpiarTareaFn
    } = tareasContext;

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    }

    //efect para detectar si hay una tarea selecionada
    useEffect(() => {
        if(tareaSeleccionada !== null) {
            guardarTarea(tareaSeleccionada);
        } else {
            guardarTarea(initialState);
        }
        // eslint-disable-next-line
    }, [tareaSeleccionada]);

    const handleSubmit = e => {
        e.preventDefault();

        //validar
        if(nombre.trim() === '') {
            validarTareaFn();
            return;
        }

        //Si es edicion o nueva tarea
        if(tareaSeleccionada === null){
            //agregar la nueva tarea al state de tareas
            tarea.proyecto = proyecto._id;
            agregarTareaFn(tarea);
        } else {
            //actualizar tarea
            actualizarTareaFn(tarea);
            limpiarTareaFn();
        }

        //obtener y filtrar las tareas del proyecto actual
        obtenerTareasFn(proyecto._id);

        //reiniciar el form
        guardarTarea(initialState);
    }

    if(!proyecto) return null;

    return (
        <div className="formulario">
            <form
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>

            {errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}

        </div>
    );
};

export default FormTarea;
