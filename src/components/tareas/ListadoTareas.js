import React, {Fragment, useContext} from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

import {CSSTransition, TransitionGroup} from "react-transition-group";

import Tarea from "./Tarea";

const ListadoTareas = () => {

    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyectoFn} = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const {tareasProyecto} = tareasContext;

    if(!proyecto) return <h2>Selecciona un Proyecto</h2>;


    return (
        <Fragment>
            <h2>Proyecto : {proyecto.nombre}</h2>

            <ul className="listado-tareas">
                {tareasProyecto.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    :
                    <TransitionGroup>
                        {
                            tareasProyecto.map(tarea => (
                                <CSSTransition
                                    key={tarea.id}
                                    timeout={200}
                                    classNames="tarea"
                                >
                                    <Tarea
                                        tarea={tarea}
                                    />
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={() => eliminarProyectoFn(proyecto.id)}
            >Eliminar Proyecto &times;</button>
        </Fragment>

    );
};

export default ListadoTareas;
