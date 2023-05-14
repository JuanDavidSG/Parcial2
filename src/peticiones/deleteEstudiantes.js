export const deleteEstudiantes = async (id) => {
    const url = `http://localhost:8086/estudiante/eliminar/${id}`
    const resp = await fetch(url, {
        method: 'DELETE'
    })
    const data = await resp.json();
    return data;

}