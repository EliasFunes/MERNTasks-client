import React, {useContext} from 'react';

import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({proyecto}) => {

    const proyectosContext = useContext(proyectoContext);
    const {proyectoActualFn} = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const{obtenerTareasFn} = tareasContext;

    //funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActualFn(id);
        obtenerTareasFn(id);
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto.id)}
            >{proyecto.nombre}</button>
        </li>
    );
};

export default Proyecto;
