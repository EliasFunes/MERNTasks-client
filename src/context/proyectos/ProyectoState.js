import React, {useReducer} from "react";
import uuid from 'uuid';

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from "../../types";



const ProyectoState = props => {

    const proyectos = [
        {id: 1, nombre: 'Tienda Virtual'},
        {id: 2, nombre: 'Intranet'},
        {id: 3, nombre: 'Web Design'}
    ]

    const initialState = {
        proyectos : [],
        formulario: false,
        errorformulario: false,
        proyecto: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // Serie de funciones para el crud con el dispatch obtenido desde el reducer
    const mostrarFormularioFn = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    }

    const obtenerProyectosFn = (/*proyectos*/) => {
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        });
    }

    const agregarProyectoFn = proyecto => {
        proyecto.id = uuid.v4();
        dispatch({
            type:AGREGAR_PROYECTO,
            payload: proyecto
        });
    }

    const mostrarErrorFn = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        });
    }

    const proyectoActualFn = proyectoId => {
        dispatch({
            type:PROYECTO_ACTUAL,
            payload: proyectoId
        });
    }

    const eliminarProyectoFn = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        });
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mostrarFormularioFn,
                obtenerProyectosFn,
                agregarProyectoFn,
                mostrarErrorFn,
                proyectoActualFn,
                eliminarProyectoFn
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;