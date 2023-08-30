'use client'

import { FC, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { setAuthenticatedToken } from '../../../lib/storage/storage'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'
import useTranslation from 'next-translate/useTranslation'
import { SpanError } from './styles'

const Login: FC = () => {
    const { t } = useTranslation('common')
    const router = useRouter()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const notifySucces = () => {
        toast.success('Inicio de sesión correctamente', {
            position: toast.POSITION.TOP_LEFT,
            toastId: 'success1',
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const email = event.currentTarget.email.value.toLowerCase()
        const password = event.currentTarget.password.value

        if (email && password) {
            try {
                setLoading(true)
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: { 'Content-Type': 'application/json' },
                })
                if (response.ok) {
                    const data = await response.json()
                    setAuthenticatedToken(data.token) // Almacena el token JWT en el estado
                    notifySucces()
                    router.push('/maps')
                    // Realiza alguna acción en respuesta al éxito
                } else {
                    // Error al hacer login de usuario
                    setLoading(false)
                    const errorMessage = await response.text()
                    setError(errorMessage)
                }
            } catch (error) {
                console.log('Error al realizar la solicitud:', error)
            }
        }
    }

    useEffect(() => {
        const handleScroll = (event: Event) => {
            event.preventDefault()
        }

        // Bloquear el desplazamiento cuando se monta el componente
        document.body.style.overflow = 'hidden'
        document.addEventListener('scroll', handleScroll, { passive: false })

        return () => {
            // Permitir el desplazamiento cuando se desmonta el componente
            document.body.style.overflow = ''
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

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
                        {t('login')}
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
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={t('password')}
                            type="password"
                            id="password"
                        />
                        {error && <SpanError>{t('errorLogin')}</SpanError>}

                        <Stack direction="row" mb={2} mt={2} spacing={2}>
                            <LoadingButton
                                id="login-button"
                                type="submit"
                                // startIcon={<SaveIcon />}
                                variant="contained"
                                fullWidth
                                loading={loading}
                            >
                                {t('login')}
                            </LoadingButton>
                        </Stack>
                        <Grid container>
                            {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Olvidaste la contraseña?
                                </Link>
                            </Grid> */}
                            <Grid item>
                                <Link href="/auth/signup" variant="body2">
                                    {t('noAccount')}
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
