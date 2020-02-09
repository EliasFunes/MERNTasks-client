import React, {useReducer} from "react";

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    PROYECTO_ERROR,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
} from "../../types";

import clienteAxios from "../../config/axios";

const ProyectoState = props => {

    const initialState = {
        proyectos : [],
        formulario: false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // Serie de funciones para el crud con el dispatch obtenido desde el reducer
    const mostrarFormularioFn = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    }

    const obtenerProyectosFn = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            });
        } catch (e) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }

    const agregarProyectoFn = async proyecto => {
        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            dispatch({
                type:AGREGAR_PROYECTO,
                payload: resultado.data
            });
        } catch (e) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
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

    // Elimina un proyecto
    const eliminarProyectoFn = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            });
        } catch (e) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
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