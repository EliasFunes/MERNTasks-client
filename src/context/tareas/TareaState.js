import React, {useReducer} from "react";

import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";

import uuid from 'uuid';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREAS,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from "../../types";


const TareaState = props => {
    const initialState = {
        tareas: [
            {id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {id: 2, nombre: 'Elegir Colores', estado: false, proyectoId: 1},
            {id: 3, nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 2},
            {id: 4, nombre: 'Elegir Hosting', estado: true, proyectoId: 3},
            {id: 5, nombre: 'Elegir Plataforma', estado: true, proyectoId: 4},
            {id: 6, nombre: 'Elegir Colores', estado: false, proyectoId: 4},
            {id: 7, nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 1},
            {id: 8, nombre: 'Elegir Hosting', estado: true, proyectoId: 2},
            {id: 9, nombre: 'Elegir Plataforma', estado: true, proyectoId: 2},
            {id: 10, nombre: 'Elegir Colores', estado: false, proyectoId: 4},
            {id: 11, nombre: 'Elegir Plataforma de pago', estado: false, proyectoId: 3},
            {id: 12, nombre: 'Elegir Hosting', estado: true, proyectoId: 1},
        ],
        tareasProyecto: null,
        errorTarea : false,
        tareaSeleccionada: null
    }

    const [state, dispatch] = useReducer(tareaReducer, initialState);

    //conjunto de acciones crud manejados con el dispatch

    const obtenerTareasFn = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        });
    }

    const agregarTareaFn = tarea => {
        tarea.estado = false;
        tarea.id = uuid.v4();
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        });
    }

    const validarTareaFn = () => {
        dispatch({
            type: VALIDAR_TAREAS
        });
    }

    const eliminarTareaFn = tareaId => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: tareaId
        });
    }

    const cambiarEstadoTareaFn = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        });
    }

    const guardarTareaActualFn = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    }

    const actualizarTareaFn = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        });
    }

    const limpiarTareaFn = () => {
        dispatch({
            type: LIMPIAR_TAREA
        });
    }

    return(
        <tareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareasFn,
                agregarTareaFn,
                validarTareaFn,
                eliminarTareaFn,
                cambiarEstadoTareaFn,
                guardarTareaActualFn,
                actualizarTareaFn,
                limpiarTareaFn
            }}
        >
            {props.children}
        </tareaContext.Provider>
    );
}

export default TareaState;