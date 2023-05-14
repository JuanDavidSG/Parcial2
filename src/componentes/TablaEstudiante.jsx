import { useState } from "react"

export const TablaEstudiante = ({ listaEstudiantes, editarEstudiante, eliminarEstudiante}) => {

   

    const [filtroFacultad, setFiltroFacultad] = useState("");

    const filtrarEstudiantes = (estudiantes, filtroFacultad) => {
        return estudiantes.filter((estudiante) =>
            estudiante.nombre.toLowerCase().includes(filtroFacultad.toLowerCase())
        );
    };

    const estudiantesFiltrados = filtrarEstudiantes(listaEstudiantes, filtroFacultad);

    return (
        <>
            <br />
            <div className="mb-3">
                <label htmlFor="Buscar" class="text-danger">Buscar:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por facultad"
                    value={filtroFacultad}
                    onChange={(e) => setFiltroFacultad(e.target.value)}
                />
            </div>
            <table class="table table-dark">
                <thead >
                    <tr>
                        <th scope="col">Id Estudiante</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Semestre</th>
                        <th scope="col">Facultad</th>
                        <th scope="col">Programa</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantesFiltrados.map((estudiante) => (
                        <tr key={estudiante.id}>
                            <td>{estudiante.id}</td>
                            <td>{estudiante.nombre}</td>
                            <td>{estudiante.semestre}</td>
                            <td>{estudiante.facultad}</td>
                            <td>{estudiante.programa}</td>
                            <td>
                                <button
                                    className="btn btn-info me-2"
                                    onClick={() => editarEstudiante(estudiante)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => eliminarEstudiante(estudiante.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}