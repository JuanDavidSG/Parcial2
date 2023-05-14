import { useEffect, useState } from "react"
import { FormularioEstudiante } from "./componentes/FormularioEstudiante";
import { TablaEstudiante } from "./componentes/TablaEstudiante";
import { getEstudiantes } from "./peticiones/getEstudiantes";
import { postEstudiantes } from "./peticiones/postEstudiantes";
import { deleteEstudiantes } from "./peticiones/deleteEstudiantes";
import { editEstudiantes } from "./peticiones/editEstudiantes";



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
        const isEliminar = window.confirm(`Desea eliminar el estudiante con id: ${id}`);

        if (isEliminar) {
            deleteEstudiantes(id)
                .then(response => {
                    const filterEstudiantes = estudiantes.filter(est => est.id !== id);
                    setEstudiantes(filterEstudiantes);
                })
                .catch(error => {
                    console.error(`Error eliminando estudiante con id ${id}: ${error}`);
                });
        }
    }

    const editarEstudiante = (estudiante) => {
        setEstudianteEditar(estudiante);
    }

    const actualizarEstudiante = (estudiante) => {
        editEstudiantes(estudiante)
            .then(data => {
                const indice = estudiantes.findIndex((est) => est.id === estudiante.id);
                const nuevosEstudiantes = [...estudiantes];
                nuevosEstudiantes[indice] = data;
                setEstudiantes(nuevosEstudiantes);
                setEstudianteEditar(null);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const filtrarEstudiantes = (estudiantes, busqueda) => {
        if (busqueda === "") {
            return estudiantes;
        } else {
            const estudiantesFiltrados = estudiantes.filter((est) =>
                est.facultad && est.facultad.toLowerCase().includes(busqueda.toLowerCase())
            );
            return estudiantesFiltrados;
        }
    };

    const listaEstudiantesFiltrados = filtrarEstudiantes(estudiantes, busqueda);

    const cargueEstudiantes = async () => {
        const datos = await getEstudiantes()
        setEstudiantes(datos);
    }

    useEffect(() => {
        cargueEstudiantes();
    }, [])


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