'use client'

import { FC, useState } from 'react'
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
import { setAuthenticatedToken } from '../../../../pages/storage/storage'

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

const SignUp: FC = () => {
    const [token, setToken] = useState('');
    const router = useRouter()
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const form = event.currentTarget as HTMLFormElement
        const formData = new FormData(form)
        const name = formData.get('firstName') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        console.log(name, email, password)

        if (email && password && name) {
            try {
                const response = await fetch('../../api/auth', {
                    method: 'POST',
                    body: JSON.stringify({ email, password, name }),
                    headers: { 'Content-Type': 'application/json' },
                })
                console.log(response)
                if (response.ok) {
                    const data = await response.json()
                    console.log(data.message)
                    setAuthenticatedToken(data.token);; // Almacena el token JWT en el estado
                    router.push('/maps')
                    // Realiza alguna acción en respuesta al éxito
                } else {
                    console.error(
                        'Error al registrar usuario:',
                        response.statusText
                    )
                    // Realiza alguna acción en respuesta al error
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error)
                // Realiza alguna acción en caso de error de red u otro error
            }
        } else {
            console.log('Los valores de email y/o password son nulos')
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registrate
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Nombre"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Registrarse
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    ¿Tienes una cuenta ya? Inicia sesión
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default SignUp
