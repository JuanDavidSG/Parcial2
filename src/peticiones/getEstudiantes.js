
export const getEstudiantes = async () =>{
    const url = 'http://localhost:8086/estudiantes/todos'
    const resp = await fetch(url)
    const {data} = await resp.json();

    const estudianteList = data.map(estudiante =>({
        id  : estudiante.codigo,
        nombre: estudiante.nombre,
        semestre : estudiante.semestre,
        facultad : estudiante.facultad
    }));
    return estudianteList; 
}
