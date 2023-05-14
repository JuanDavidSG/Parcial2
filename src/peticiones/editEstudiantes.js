export const editEstudiantes = async (estudiante) => {
    const url = `http://localhost:8086/estudiante/editar/${estudiante.id}`
    const resp = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(estudiante)
    })
    const data = await resp.json();

}