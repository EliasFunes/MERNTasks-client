import React, {useReducer} from 'react';
import authContext from "./authContext";
import authReducer from "./authReducer";

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from "../../types";

import clienteAxios from "../../config/axios";

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    const [state, dispatch]  = useReducer(authReducer, initialState);

    const registrarUsuarioFn = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type:REGISTRO_EXITOSO,
                payload: respuesta.data
            });
        } catch (e) {
            // console.log(e.response.data.msg);
            const alerta = {
                msg: e.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        }
    }


    return(
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuarioFn
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;