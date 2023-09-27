'use client'
import React, { useState } from 'react'
import {
    Container,
    CssBaseline,
    Typography,
    TextField,
    Button,
    Paper,
} from '@mui/material'

function ResetPasswordForm() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const query = new URLSearchParams(window.location.search)

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
            });
            if (response.ok) {
                console.log('Contraseña restablecida')
            } else {
                console.log('Error al restablecer la contraseña')
            }
        } catch (error: any) {
            console.log('Error al restablecer la contraseña', error.message)

        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper elevation={3}>
                <Typography component="h1" variant="h5">
                    Restablecer Contraseña
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                        margin="normal"
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
                    >
                        Restablecer Contraseña
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default ResetPasswordForm
