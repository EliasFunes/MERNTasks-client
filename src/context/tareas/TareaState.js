import React, {useReducer} from "react";

import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREAS,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from "../../types";

import clienteAxios from "../../config/axios";

const TareaState = props => {
    const initialState = {
        tareasProyecto: [],
        errorTarea : false,
        tareaSeleccionada: null
    }

    const [state, dispatch] = useReducer(tareaReducer, initialState);

    //conjunto de acciones crud manejados con el dispatch
    const obtenerTareasFn = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}});
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            });
        } catch (e) {
          console.log(e);
        }

    }

    const agregarTareaFn = async tarea => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            });
        } catch (e) {
            console.log(e);
        }
    }

    const validarTareaFn = () => {
        dispatch({
            type: VALIDAR_TAREAS
        });
    }

    const eliminarTareaFn = async (tareaId, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${tareaId}`, {params: {proyecto}});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: tareaId
            });
        } catch (e) {
            console.log(e);
        }
    }

    const actualizarTareaFn = async tarea => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            });
        } catch (e) {
            console.log(e);
        }
    }

    const guardarTareaActualFn = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
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
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareasFn,
                agregarTareaFn,
                validarTareaFn,
                eliminarTareaFn,
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