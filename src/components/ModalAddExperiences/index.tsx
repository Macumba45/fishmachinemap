import React, { FC, useState } from 'react'
import { useLogicExperience } from '@/app/[locale]/experiencias/logic'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MuiAlert from '@mui/material/Alert'
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
} from '@mui/material'

interface ExperienceModalProps {
    isOpen: boolean
    onClose: () => void
}

const ExperienceModal: FC<ExperienceModalProps> = ({ isOpen, onClose }) => {
    const {
        postExperience,
        title,
        setTitle,
        picture,
        category,
        setCategory,
        description,
        setDescription,
        price,
        setPrice,
        phone,
        setPhone,
        city,
        setCity,
        whatsapp,
        setWhatsapp,
        url,
    } = useLogicExperience()

    const [loading, setLoading] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
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

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!title || !description || !price || !phone || !city || !whatsapp) {
            setSnackbarOpen(true)
            return
        }
        const experienceData = {
            type: '',
            title,
            picture,
            category,
            description,
            price,
            phone,
            city,
            whatsapp,
            url,
        }

        try {
            setLoading(true)
            await postExperience(experienceData)
            setSuccessSnackbarOpen(true)
        } catch (error) {
            console.log(error)
        }
        // Aquí puedes manejar la lógica de envío del formulario
        // Puedes enviar los datos a la API o realizar otras acciones necesarias
        // Luego, cierra el modal
        onClose()
    }

    const handleClose = () => {
        onClose()
    }

    return (
        <>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="experience-modal-title"
                aria-describedby="experience-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: 280,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: '30px',
                        p: 4,
                    }}
                >
                    <Typography
                        textAlign="center"
                        variant="h6"
                        id="experience-modal-title"
                        gutterBottom
                    >
                        Sube tu experiencia
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="dense"
                            name="title"
                            label="Titulo de la experiencia"
                            variant="outlined"
                            fullWidth
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Descripcion"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={2}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            name="city"
                            label="Ciudad"
                            variant="outlined"
                            fullWidth
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <FormControl sx={{ mb: '4px', mt: '8px' }} fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Categoria
                            </InputLabel>
                            <Select
                                margin="dense"
                                name="categoria"
                                label="Categoria"
                                variant="outlined"
                                fullWidth
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            >
                                <MenuItem value="AltaMar">
                                    Pesca Alta Mar
                                </MenuItem>
                                <MenuItem value="Surfcasting">
                                    Surfcasting
                                </MenuItem>
                                <MenuItem value="Spinning">Spinning</MenuItem>
                                <MenuItem value="Sub">Submarinismo</MenuItem>
                                <MenuItem value="Kayak">Kayak</MenuItem>
                                <MenuItem value="Rio">Rio/lago</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            type="number"
                            margin="dense"
                            name="price"
                            label="Precio €"
                            variant="outlined"
                            fullWidth
                            inputProps={{
                                inputMode: 'numeric', // Indica que solo se deben permitir números en el teclado
                                pattern: '[0-9]*', // Patrón para garantizar que solo se permitan números válidos
                            }}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                        <TextField
                            type="number"
                            margin="dense"
                            name="phoneContact"
                            label="Teléfono de contacto"
                            variant="outlined"
                            fullWidth
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            inputProps={{
                                inputMode: 'numeric', // Indica que solo se deben permitir números en el teclado
                                pattern: '[0-9]*', // Patrón para garantizar que solo se permitan números válidos
                            }}
                        />
                        <TextField
                            type="number"
                            margin="dense"
                            name="whatsapp"
                            label="Whatsapp de contacto"
                            variant="outlined"
                            fullWidth
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                            inputProps={{
                                inputMode: 'numeric', // Indica que solo se deben permitir números en el teclado
                                pattern: '[0-9]*', // Patrón para garantizar que solo se permitan números válidos
                            }}
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '1rem',
                            }}
                        >
                            <Button
                                style={{
                                    backgroundColor: loading
                                        ? 'white'
                                        : '#4675A6',
                                    marginRight: loading ? '0' : '0.5rem',
                                }}
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Confirmar
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: '#4675A6',
                                    display: loading ? 'none' : 'block',
                                }}
                                variant="contained"
                                color="primary"
                                onClick={handleClose}
                            >
                                Cancelar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
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
                    crear la experiencia.
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
        </>
    )
}

export default ExperienceModal
