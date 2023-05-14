export const postEstudiantes = async (estudiante) =>{
    const url = 'http://localhost:8086/estudiante/crear'
    const resp = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(estudiante)
    })
    const data= await resp.json();

}
