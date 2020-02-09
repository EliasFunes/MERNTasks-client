import React, {useContext, useEffect} from 'react';
import {TransitionGroup, CSSTransition} from "react-transition-group";

import proyectoContext from "../../context/proyectos/proyectoContext";
import alertaContext from "../../context/alertas/alertaContext";

import Proyecto from "./Proyecto";

const ListadoProyectos = () => {

    const proyectosContext = useContext(proyectoContext);
    const {proyectos, mensaje, obtenerProyectosFn} = proyectosContext;

    const alertaContexts = useContext(alertaContext);
    const {alerta, mostrarAlertaFn} = alertaContexts;

    useEffect(() => {
        //si hay un error
        if(mensaje) {
            mostrarAlertaFn(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectosFn();
        // eslint-disable-next-line
    }, [mensaje]);

    if(proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno</p>;

    return (
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
};

export default ListadoProyectos;
