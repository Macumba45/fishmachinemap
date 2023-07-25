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
import IconButton from '@mui/material/IconButton'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import InputAdornment from '@mui/material/InputAdornment'
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
        returnTime,
        setReturnTime,
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
            !returnTime ||
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
            returnTime,
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
                            fullWidth
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
                            sx={{ marginRight: '0.5rem' }}
                        />
                        <TextField
                            margin="dense"
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
                                    Vuelta
                                </div>
                            }
                            fullWidth
                            value={returnTime}
                            onChange={e => setReturnTime(e.target.value)}
                            sx={{ marginLeft: '0.5rem' }}
                        />
                    </InputsContainer>
                    <TextField
                        margin="dense"
                        label="Precio €"
                        fullWidth
                        value={price}
                        type="number"
                        onChange={e => setPrice(e.target.value)}
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
                        label="Teléfono de contacto"
                        fullWidth
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
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
