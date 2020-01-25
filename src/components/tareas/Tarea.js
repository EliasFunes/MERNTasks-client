import React, {useContext} from 'react';
import tareaContext from "../../context/tareas/tareaContext";

const Tarea = ({tarea}) => {

    const tareasContext = useContext(tareaContext);
    const {
        eliminarTareaFn,
        obtenerTareasFn,
        cambiarEstadoTareaFn,
        guardarTareaActualFn
    } = tareasContext;

    const {id, proyectoId} = tarea;

    const handleDeleteTask = () => {
        eliminarTareaFn(id);
        obtenerTareasFn(proyectoId);
    }

    const handleChangeStateTask = completo => {
        tarea.estado = completo;
        cambiarEstadoTareaFn(tarea);
        obtenerTareasFn(proyectoId);
    }

    const handleSelectTask = tarea => {
        guardarTareaActualFn(tarea);
    }

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado ?
                    (
                        <button
                        type="button"
                        className="completo"
                        onClick={() => handleChangeStateTask(false)}
                        >Completo</button>
                    )
                    :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => handleChangeStateTask(true)}
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => handleSelectTask(tarea)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => handleDeleteTask()}
                >Eliminar</button>
            </div>

        </li>
    );
};

export default Tarea;
