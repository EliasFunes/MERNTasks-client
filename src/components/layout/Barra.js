import React, {useContext, useEffect} from 'react';
import authContext from "../../context/autenticacion/authContext";

const Barra = () => {
    // extraer la informacion de autenticacion
    const authcontexts = useContext(authContext);
    const {usuario, usuarioAutenticadoFn, cerrarSesionFn} = authcontexts;

    useEffect(() => {
        usuarioAutenticadoFn();
    }, []);

    return (
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}

            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesionFn()}
                >Cerrar Sesión</button>
            </nav>
        </header>
    );
};

export default Barra;
