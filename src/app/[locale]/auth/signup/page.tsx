'use client'

import { FC, useEffect, useState } from 'react'
import { setAuthenticatedToken } from '../../../../lib/storage/storage'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { LoadingButton } from '@mui/lab'
import { Checkbox, FormControlLabel, Snackbar, Stack } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import MuiAlert from '@mui/material/Alert'

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

const SignUp: FC = () => {
    const t = useTranslations('login')
    const router = useRouter()
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const locale = useLocale() // Obtén el idioma actual utilizando useLocale
    const [hasReadConditions, setHasReadConditions] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)

    const handleOpenLOPD = () => {
        window.open('https://jade-mora-53.tiiny.site/')
    }
    const handleSnackbarClose = (event?: any, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setSnackbarOpen(false)
    }

    const handleSuccessSnackbarClose = (event?: any, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setSuccessSnackbarOpen(false)
    }

    const handleCheckboxChange = (event: any) => {
        setHasReadConditions(event.target.checked)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const form = event.currentTarget as HTMLFormElement
        const formData = new FormData(form)
        const name = formData.get('firstName') as string
        const email = (formData.get('email') as string).toLowerCase()
        const password = formData.get('password') as string

        if (email && password && name && hasReadConditions) {
            try {
                setLoading(true)
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    body: JSON.stringify({ email, password, name }),
                    headers: { 'Content-Type': 'application/json' },
                })
                if (response.ok) {
                    const data = await response.json()
                    setAuthenticatedToken(data.token) // Almacena el token JWT en el estado
                    setSuccessSnackbarOpen(true)
                    router.push(`/${locale}/maps`)
                    // Realiza alguna acción en respuesta al éxito
                } else {
                    const errorData = await response.json()
                    setError(errorData.message)
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error)
                setLoading(false)
                // Realiza alguna acción en caso de error de red u otro error
            }
        } else {
            setSnackbarOpen(true)

            console.log('Los valores de email y/o password son nulos')
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
                        {t('register')}
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
                                    label={t('nameRegister')}
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
                                    label={t('password')}
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={hasReadConditions}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label={
                                        <Typography style={{ fontSize: 14 }}>
                                            {t('lopd')}.{' '}
                                            <a
                                                target="blank"
                                                href="https://ivory-georgia-49.tiiny.site/"
                                            >
                                                {t('readPdf')}
                                            </a>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {error && (
                            <Typography
                                variant="body2"
                                color="error"
                                align="center"
                                sx={{ mt: 2 }}
                            >
                                {error}
                            </Typography>
                        )}
                        <Stack direction="row" mb={2} mt={2} spacing={2}>
                            <LoadingButton
                                id="signup-button"
                                type="submit"
                                variant="contained"
                                fullWidth
                                loading={loading}
                            >
                                {t('createAccount')}
                            </LoadingButton>
                        </Stack>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    href={`/${locale}/auth/login`}
                                    variant="body2"
                                >
                                    {t('alreadyAccount')}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={handleSnackbarClose}
                >
                    <MuiAlert
                        onClose={handleSnackbarClose}
                        severity="error"
                        sx={{ width: '100%' }}
                    >
                        Por favor, completa todos los campos para registrarte
                    </MuiAlert>
                </Snackbar>

                <Snackbar
                    open={successSnackbarOpen}
                    autoHideDuration={4000}
                    onClose={handleSuccessSnackbarClose}
                >
                    <MuiAlert
                        onClose={handleSuccessSnackbarClose}
                        severity="success"
                        sx={{ width: '100%' }}
                    >
                        ¡Viaje creado exitosamente!
                    </MuiAlert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    )
}

export default SignUp
