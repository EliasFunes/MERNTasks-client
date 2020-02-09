import React, {useContext, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import alertaContext from "../../context/alertas/alertaContext";
import authContext from "../../context/autenticacion/authContext";

const Login = (props) => {

    const alertasContext = useContext(alertaContext);
    const {alerta, mostrarAlertaFn} = alertasContext;

    const authContexts = useContext(authContext);
    const {mensaje, autenticado, iniciarSesionFn} = authContexts;

    // En caso de que el password o usuario no exista
    useEffect(() => {
        if(autenticado)
            props.history.push('/proyectos');

        if(mensaje)
            mostrarAlertaFn(mensaje.msg, mensaje.categoria);

    }, [mensaje, autenticado, props.history]);

    const [usuario, guardarUsuario] = useState({
        email: '',
        password:''
    });

    const {email, password} = usuario;

    const handleChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        //validar campos vacios
        if(email.trim() === '' || password.trim() === '') {
            mostrarAlertaFn('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //pasarlo al action
        iniciarSesionFn({email, password});
    }

    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>

                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>

            </div>
        </div>
    );
};

export default Login;
