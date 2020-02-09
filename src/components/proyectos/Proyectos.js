import React, {useContext, useEffect} from 'react';

import Sidebar from "../layout/Sidebar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
import authContext from "../../context/autenticacion/authContext";

const Proyectos = () => {
    // extraer la informacion de autenticacion
    const authcontexts = useContext(authContext);
    const {usuarioAutenticadoFn} = authcontexts;

    useEffect(() => {
        usuarioAutenticadoFn();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="contenedor-app">
            <Sidebar/>
            <div className="seccion-principal">
                <Barra/>
                <main>
                    <FormTarea/>
                    <div className="contenedor-tareas">
                        <ListadoTareas/>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Proyectos;
