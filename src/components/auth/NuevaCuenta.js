import React, {useState, useContext} from 'react';
import {Link} from "react-router-dom";
import alertaContext from "../../context/alertas/alertaContext";
import authContext from "../../context/autenticacion/authContext";

const NuevaCuenta = () => {

    //extraer valores del context
    const alertasContext = useContext(alertaContext);
    const {alerta, mostrarAlertaFn} = alertasContext;

    const authContexts = useContext(authContext);
    const {registrarUsuarioFn} = authContexts;

    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    const {nombre, email, password, confirmar} = usuario;

    const handleChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        //validar campos vacios
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlertaFn('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //Password minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlertaFn('El password debe ser de al menos 6 caracteres', 'alerta-error');
            return;
        }

        //los 2 passwords son iguales
        if(password !== confirmar) {
            mostrarAlertaFn('Los passwords no son iguales', 'alerta-error');
            return;
        }

        //pasarlo al action
        registrarUsuarioFn({
           nombre,
           email,
           password
        });
    }

    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear Cuenta</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={nombre}
                            onChange={handleChange}
                        />
                    </div>

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
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu Password"
                            value={confirmar}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Volver a iniciar sesión
                </Link>

            </div>
        </div>
    );
};

export default NuevaCuenta;
