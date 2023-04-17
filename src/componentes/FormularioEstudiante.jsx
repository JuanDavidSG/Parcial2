import { useEffect, useState } from "react"

export const FormularioEstudiante = ({ agregar, estudianteEditar, actualizarEstudiante }) => {
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [semestre, setSemestre] = useState("");
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        if (estudianteEditar) {
            setEditando(true);
            setId(estudianteEditar.id);
            setNombre(estudianteEditar.nombre);
            setSemestre(estudianteEditar.semestre);
        }
    }, [estudianteEditar]);

    const guardarEstudiante = (event) => {
        event.preventDefault();

        let estudiante = {
            id: id,
            nombre: nombre,
            semestre: semestre
        }

        if (editando) {
            actualizarEstudiante(estudiante);
            setEditando(false);
        } else {
            agregar(estudiante);
        }

        setId("");
        setNombre("");
        setSemestre("");
    }

    return (
        <>
            <form onSubmit={guardarEstudiante}>
                <div className="form-group ">
                    <label htmlFor="id">ID Estudiante</label>
                    <input type="number" className="form-control" id="id" placeholder="Ingrese id" value={id} onChange={(event) => setId(event.target.value)} disabled={editando} />
                </div>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" className="form-control" id="nombre" placeholder="nombre" value={nombre} onChange={(event) => setNombre(event.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="semestre">Semestre</label>
                    <input type="number" className="form-control" id="semestre" placeholder="semestre" value={semestre} onChange={(event) => setSemestre(event.target.value)} />
                </div>
                <br />
                <button type="submit" class="btn btn-success">{editando ? "Actualizar" : "Registrar"}</button>

                {editando &&
                    <button type="button" className="btn btn-secondary ml-3" onClick={() => setEditando(false)}>Cancelar</button>
                }
            </form>
        </>
    )
}