'use client'
import { useEffect, useState } from 'react'

function RecoveryRequest() {
    const [email, setEmail] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        // Envía la solicitud de recuperación de contraseña al servidor
        const response = await fetch('/api/password/recoveryRequest', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            // Muestra un mensaje de éxito o redirige al usuario a una página de confirmación

            console.log('Solicitud de recuperación de contraseña enviada')
        } else {
            alert(`Este ${email} no está registrado en FishGram`)
        }
    }

    // Define el título dinámico
    const dynamicTitle = 'FishGram - Recupera tu contraseña'

    // Actualiza el título cuando el componente se monta
    useEffect(() => {
        document.title = dynamicTitle
    }, [])

    return (
        <div>
            <h1>Solicitud de recuperación de contraseña</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Correo Electrónico:
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <button type="submit">Enviar solicitud</button>
            </form>
        </div>
    )
}

export default RecoveryRequest
