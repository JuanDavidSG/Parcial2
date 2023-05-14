import { useEffect, useState } from "react"
import { FormularioEstudiante } from "./componentes/FormularioEstudiante";
import { TablaEstudiante } from "./componentes/TablaEstudiante";
import { getEstudiantes } from "./peticiones/getEstudiantes";
import { postEstudiantes } from "./peticiones/postEstudiantes";
import { deleteEstudiantes } from "./peticiones/deleteEstudiantes";



export const EstudiantesApp = () => {

    const [estudiantes, setEstudiantes] = useState([]);
    const [estudianteEditar, setEstudianteEditar] = useState(null);
    const [busqueda, setBusqueda] = useState("");
                          
    
    const agregarEstudiante = (estudiante) => {
        const existeEstudiante = estudiantes.some((element) => element.id === estudiante.id);
        if (existeEstudiante) {
            window.alert("¡El estudiante con este ID ya existe!");
        } else {
         //   setEstudiantes([...estudiantes, estudiante]);
            postEstudiantes(estudiante);
        }
    }

    const eliminarEstudiante = (id) => {
        const isEliminar = window.confirm(`Desea eliminar el estudiante con id: ${id}`)

        if (isEliminar) {
            const filterEstudiantes = estudiantes.filter(est => est.id !== id)
            deleteEstudiantes(filterEstudiantes);
        }
    }

    const editarEstudiante = (estudiante) => {
        setEstudianteEditar(estudiante);
    }

    const actualizarEstudiante = (estudiante) => {
        const indice = estudiantes.findIndex((est) => est.id === estudiante.id);
        const nuevosEstudiantes = [...estudiantes];
        nuevosEstudiantes[indice] = estudiante;
        setEstudiantes(nuevosEstudiantes);
        console.log(nuevosEstudiantes)
        setEstudianteEditar(null);
    };

    const filtrarEstudiantes = (estudiantes, busqueda) => {
        if (busqueda === "") {
            return estudiantes;
        } else {
            const estudiantesFiltrados = estudiantes.filter((est) =>
                est.nombre.toLowerCase().includes(busqueda.toLowerCase())
            );
            return estudiantesFiltrados;
        }
    };

    const listaEstudiantesFiltrados = filtrarEstudiantes(estudiantes, busqueda);

    const cargueEstudiantes = async () => {
        const datos = await getEstudiantes()
        setEstudiantes(datos);
    } 

    useEffect(()=>{
        cargueEstudiantes();
    },[])

    return (
        <>
            <FormularioEstudiante
                agregar={agregarEstudiante}
                setBusqueda={setBusqueda}
                estudianteEditar={estudianteEditar}
                actualizarEstudiante={actualizarEstudiante}
            />
            <TablaEstudiante
                listaEstudiantes={listaEstudiantesFiltrados}
                eliminarEstudiante={eliminarEstudiante}
                editarEstudiante={editarEstudiante}
            />
        </>
    )
}