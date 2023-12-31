'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Typography, TextField, Button, Box } from '@mui/material'
import ButtonComp from '@/components/Button'
import { useLocale } from 'next-intl'

function ResetPasswordForm() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const query = new URLSearchParams(window.location.search)
    const router = useRouter()
    const locale = useLocale()

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault()
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden')
                return
            }
            const response = await fetch('/api/password/resetPassword', {
                method: 'POST',
                body: JSON.stringify({
                    password,
                    token: query.get('token'),
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                console.log('Contraseña restablecida')
                setConfirmed(true)
            } else {
                console.log('Error al restablecer la contraseña')
            }
        } catch (error: any) {
            console.log('Error al restablecer la contraseña', error.message)
        }
    }
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                mt: 3,
            }}
            component="main"
            maxWidth="xs"
        >
            <Typography component="h1" variant="h5">
                Restablece tu contraseña
            </Typography>
            <Box sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        id="password"
                        label="Nueva Contraseña"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Confirmar Contraseña"
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={confirmed}
                        sx={{ mt: 2 }}
                    >
                        Restablecer Contraseña
                    </Button>
                </form>
            </Box>
            {confirmed && (
                <>
                    <Typography
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 2,
                        }}
                    >
                        Contraseña restablecida correctamente
                    </Typography>
                    <ButtonComp
                        bgColor="#4675A6"
                        style={{ marginTop: '1rem' }}
                        color="white"
                        title="Volvel a iniciar sesión"
                        onClick={() => router.push(`/${locale}/auth/login`)}
                    ></ButtonComp>
                </>
            )}
        </Container>
    )
}

export default ResetPasswordForm
