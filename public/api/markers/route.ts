import { userMarker } from "@/app/maps/type";



const addUserMarker = async (userMark: userMarker) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/marker/markers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(userMark),
        });
        // console.log('Respuesta:', response);
        if (response.ok) {
            const data = await response.json();
            // console.log('Objeto enviado correctamente:', data);
        } else {
            throw Error;
        }
    } catch (error) {
        console.error('Error al enviar el objeto:', error);
    }
}


export default addUserMarker;