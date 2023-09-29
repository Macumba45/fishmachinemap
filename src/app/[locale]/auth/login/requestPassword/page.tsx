'use client'
import { Avatar, Container, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'

function RecoveryRequest() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault()
            setLoading(true)
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
        } catch (error) {
            console.error(
                'Error al enviar la solicitud de recuperación de contraseña',
                error
            )
        } finally {
            setLoading(false)
            setEmailSent(true)
        }
    }

    // Define el título dinámico
    const dynamicTitle = 'FishGram - Recupera tu contraseña'

    // Actualiza el título cuando el componente se monta
    useEffect(() => {
        document.title = dynamicTitle
    }, [dynamicTitle])
    return (
        <Container component="main" maxWidth="xs">
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '8px',
                }}
            >
                <Avatar style={{ margin: '8px', backgroundColor: 'primary' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography marginTop={2} component="h1" variant="h5">
                    Recuperación de contraseña
                </Typography>
                <form
                    style={{ width: '100%', marginTop: '16px' }}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo Electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <LoadingButton
                        loading={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ margin: '16px 0' }}
                    >
                        Enviar solicitud
                    </LoadingButton>
                </form>
            </div>
            {emailSent && (
                <Typography
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '16px',
                    }}
                >
                    Si el correo electrónico está registrado, recibirás un
                    correo electrónico con instrucciones para restablecer tu
                    contraseña.
                </Typography>
            )}
        </Container>
    )
}

export default RecoveryRequest
