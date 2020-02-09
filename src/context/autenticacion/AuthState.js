import React, {useReducer} from 'react';
import authContext from "./authContext";
import authReducer from "./authReducer";
import tokenAuth from "../../config/tokenAuth";

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
        mensaje: null,
        cargando: true
    }

    const [state, dispatch]  = useReducer(authReducer, initialState);

    const registrarUsuarioFn = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type:REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            //Obtener el usuario
            usuarioAutenticadoFn();
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

    // Retorna el usuario autenticado
    const usuarioAutenticadoFn = async () => {
        const token = localStorage.getItem('token');
        if(token)
            tokenAuth(token);

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });
        } catch (e) {
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    // Cuando el usuario inicia sesion
    const iniciarSesionFn = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });

            //Obtener el usuario
            usuarioAutenticadoFn();
        } catch (e) {
            const alerta = {
                msg: e.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    //cierra la sesion del usuario
    const cerrarSesionFn = () => {
        dispatch({
            type: CERRAR_SESION
        });
    }

    return(
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuarioFn,
                iniciarSesionFn,
                usuarioAutenticadoFn,
                cerrarSesionFn
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;