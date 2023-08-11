import { FC, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { InputsContainer } from './styles'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useLogicBlaBla } from '@/app/blablafish/logic'
import { BlaBlaFish } from '@/app/blablafish/type'
import { LoadingButton } from '@mui/lab'

interface Props {
    open: boolean
    onClose: () => void
}

const CreateTripModal: FC<Props> = ({ open, onClose }) => {
    const {
        postBlaBlaFish,
        departureCity,
        setDepartureCity,
        arrivalCity,
        setArrivalCity,
        departureTime,
        setDepartureTime,
        description,
        setDescription,
        phone,
        setPhone,
        price,
        setPrice,
        selectedDate,
        setSelectedDate,
    } = useLogicBlaBla()

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const currentDate = new Date().toISOString().split('T')[0]

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

    const handleCreateTrip = async () => {
        if (
            !departureCity ||
            !arrivalCity ||
            !departureTime ||
            !description ||
            !phone ||
            !price
        ) {
            setSnackbarOpen(true)
            return
        }
        const newBlaBlaFish: BlaBlaFish = {
            departureCity,
            arrivalCity,
            departureTime,
            description,
            phone,
            price: price === null ? '' : price.toString(),
            date: selectedDate,
        }

        try {
            setLoading(true)
            await postBlaBlaFish(newBlaBlaFish)
            setSuccessSnackbarOpen(true)
            onClose()
        } catch (error) {
            console.error('Error al crear el viaje', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Crear BlaBlaFish</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Rellena los siguientes campos para crear un nuevo viaje:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        label="Fecha"
                        inputProps={{ min: currentDate }}
                        fullWidth
                        type="date"
                        margin="dense"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        sx={{ marginRight: '0.5rem' }}
                    />
                    <InputsContainer>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Ciudad de salida"
                            value={departureCity}
                            onChange={e => setDepartureCity(e.target.value)}
                            sx={{ marginRight: '0.5rem' }}
                        />
                        <TextField
                            margin="dense"
                            label="Ciudad de llegada"
                            value={arrivalCity}
                            onChange={e => setArrivalCity(e.target.value)}
                            sx={{ marginLeft: '0.5rem' }}
                        />
                    </InputsContainer>
                    <InputsContainer>
                        <TextField
                            margin="dense"
                            type="time"
                            fullWidth
                            placeholder='Ej: "10:00am"'
                            label={
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <AccessTimeIcon
                                        sx={{ marginRight: '0.3rem' }}
                                    />{' '}
                                    Salida
                                </div>
                            }
                            value={departureTime}
                            onChange={e => setDepartureTime(e.target.value)}
                        />
                    </InputsContainer>
                    <TextField
                        margin="dense"
                        placeholder="10€"
                        label="Precio €"
                        fullWidth
                        value={price}
                        type="number"
                        onChange={e => setPrice(e.target.value)}
                        inputProps={{
                            inputMode: 'numeric', // Indica que solo se deben permitir números en el teclado
                            pattern: '[0-9]*', // Patrón para garantizar que solo se permitan números válidos
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Descripción"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        placeholder="+34 123 456 789"
                        label="Teléfono de contacto"
                        fullWidth
                        value={phone}
                        onChange={e => {
                            const onlyNumbers = e.target.value.replace(
                                /[^0-9]/g,
                                ''
                            )
                            setPhone(onlyNumbers)
                        }}
                        inputProps={{
                            inputMode: 'numeric', // Indica que solo se deben permitir números en el teclado
                            pattern: '[0-9]*', // Patrón para garantizar que solo se permitan números válidos
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        loading={loading}
                        onClick={handleCreateTrip}
                        variant="contained"
                        sx={{ backgroundColor: '#49007a', color: 'white' }}
                    >
                        Crear Viaje
                    </LoadingButton>
                    <Button
                        hidden={loading}
                        sx={{ color: '#49007a' }}
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
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
                        Por favor, completa todos los campos requeridos antes de
                        crear el viaje.
                    </MuiAlert>
                </Snackbar>
            </Dialog>
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
        </>
    )
}

export default CreateTripModal
