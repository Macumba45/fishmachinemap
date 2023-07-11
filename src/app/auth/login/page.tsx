'use client'

import { FC, useState } from 'react'
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
import { useScrollBlock } from '@/hooks'
import { setAuthenticatedToken } from '../../../../pages/storage/storage'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { SpanError } from './styles'

const Login: FC = () => {
    const [blockScroll] = useScrollBlock()

    blockScroll()

    const router = useRouter()
    const [error, setError] = useState('')

    const notifySucces = () => {
        toast.success('Inicio de sesión correctamente', {
            position: toast.POSITION.TOP_LEFT,
            toastId: 'success1',
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const email = event.currentTarget.email.value
        const password = event.currentTarget.password.value

        if (email && password) {
            try {
                const response = await fetch('../../api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: { 'Content-Type': 'application/json' },
                })
                console.log(response)
                if (response.ok) {
                    const data = await response.json()
                    setAuthenticatedToken(data.token) // Almacena el token JWT en el estado
                    notifySucces()
                    router.push('/maps')
                    // Realiza alguna acción en respuesta al éxito
                } else {
                    // Error al hacer login de usuario
                    const errorMessage = await response.text()
                    setError(errorMessage)
                }
            } catch (error) {
                console.log('Error al realizar la solicitud:', error)
            }
        }
    }
    return (
        <>
            <CssBaseline />
            <Container component="main" maxWidth="xs">
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
                        Inicia sesión
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                        />
                        {error && (
                            <SpanError>
                                Usuario o contraseña inválidos
                            </SpanError>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Iniciar Sesión
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Olvidaste la contraseña?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/auth/signup" variant="body2">
                                    {'¿No tienes una cuenta? Regístrate'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Login
