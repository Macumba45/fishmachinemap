import { FC, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

interface Props {
    open: boolean
    onClose: () => void
}

const CreateTripModal: FC<Props> = ({ open, onClose }) => {
    const [departureCity, setDepartureCity] = useState('')
    const [arrivalCity, setArrivalCity] = useState('')
    const [departureTime, setDepartureTime] = useState('')
    const [returnTime, setReturnTime] = useState('')
    const [description, setDescription] = useState('')
    const [phone, setPhone] = useState('')

    const handleCreateTrip = () => {
        // Aquí puedes realizar la lógica para guardar los datos del viaje
        console.log({
            departureCity,
            arrivalCity,
            departureTime,
            returnTime,
            description,
            phone,
        })

        // Cierra el modal después de guardar los datos
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Crear Viaje</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Rellena los siguientes campos para crear un nuevo viaje:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Ciudad de salida"
                    fullWidth
                    value={departureCity}
                    onChange={e => setDepartureCity(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Ciudad de llegada"
                    fullWidth
                    value={arrivalCity}
                    onChange={e => setArrivalCity(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Hora de salida"
                    fullWidth
                    value={departureTime}
                    onChange={e => setDepartureTime(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Hora de Vuelta"
                    fullWidth
                    value={returnTime}
                    onChange={e => setReturnTime(e.target.value)}
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
                <Button
                    onClick={handleCreateTrip}
                    variant="contained"
                    sx={{ backgroundColor: '#49007a', color: 'white' }}
                >
                    Crear Viaje
                </Button>
                <Button sx={{ color: '#49007a' }} onClick={onClose}>
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateTripModal
