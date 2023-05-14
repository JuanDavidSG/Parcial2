import { useEffect, useState } from "react"

export const FormularioEstudiante = ({ agregar, estudianteEditar, actualizarEstudiante }) => {
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [semestre, setSemestre] = useState("");
    const [facultad, setFacultad] = useState("");
    const [programa, setPrograma] = useState("");
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        if (estudianteEditar) {
            setEditando(true);
            setId(estudianteEditar.id);
            setNombre(estudianteEditar.nombre);
            setSemestre(estudianteEditar.semestre);
            setFacultad(estudianteEditar.facultad);
            setPrograma(estudianteEditar.programa);
        }
    }, [estudianteEditar]);

    const guardarEstudiante = (event) => {

        let estudiante = {
            id: id,
            nombre: nombre,
            semestre: semestre,
            facultad: facultad,
            programa: programa
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
        setFacultad("");
        setPrograma("");
    }

    return (
        <>
            <h1 class="text-danger" ><center>SIGA ACADÉMICO </center> </h1>
            <form onSubmit={guardarEstudiante}>         
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" className="form-control" id="nombre" placeholder="nombre" minlength = "3" value={nombre} required onChange={(event) => setNombre(event.target.value)} />
                </div>
                <div>
                    <label for="semestre-select">Semestre: </label>
                    <select class="form-select" name="semestre" id="semestre-select" required value={semestre} onChange={(event) => setSemestre(event.target.value)}>
                        <option value="">--Seleccione--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                </select>
                </div> 
                <br />
                <div>
                    <label for="facultad-select">Facultad: </label>
                    <select class="form-select" name="facultad" id="facultad-select" required value={facultad} onChange={(event) => setFacultad(event.target.value)}>
                        <option value="">--Seleccione--</option>
                        <option value="Ingenieria">Ingenieria</option>
                        <option value="Medicina">Medicina</option>
                        <option value="Comunicacion">Comunicacion</option>
                        <option value="Educacion">Educacion</option>
                        <option value="Derecho">Derecho</option>                        
                </select>
                </div>
                <br />
                <div>
                    <label for="programa-select">Programa: </label>
                    <select class="form-select" name="programa" id="programa-select" required value={programa} onChange={(event) => setPrograma(event.target.value)}>
                        <option value="">--Seleccione--</option>
                        <option value="Ingenieria Informática">Ingenieria Informática</option>
                        <option value="Ingenieria Química">Ingenieria Química</option>
                        <option value="Ingenieria Mecánica">Ingenieria Mecánica</option>     
                        <option value="Medicina">Medicina</option>
                        <option value="Fisioterapia">Fisioterapia</option>       
                        <option value="Enfermería">Enfermería</option>   
                        <option value="Comunicación Social">Comunicación Social</option>  
                        <option value="Comunicación Audiovisual">Comunicación Audiovisual</option>     
                        <option value="Educacion Ciencias Naturales">Educacion Ciencias Naturales</option> 
                        <option value="Filosofía">Filosofía</option>      
                        <option value="Derecho">Derecho</option>                
                </select>
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