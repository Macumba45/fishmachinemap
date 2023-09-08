import React, { FC, useState } from 'react'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'

interface ExperienceModalProps {
    isOpen: boolean
    onClose: () => void
    experience: {
        title: string
        category: string
        description: string
        price: string
        phone: string
        url: string
        role: string
    }
}

const ExperienceModal: FC<ExperienceModalProps> = ({
    isOpen,
    onClose,
    experience,
}) => {
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        title: experience.title,
        description: experience.description,
        price: experience.price,
        phone: experience.phone,
        url: experience.url,
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = () => {
        // Aquí puedes manejar la lógica de envío del formulario
        // Puedes enviar los datos a la API o realizar otras acciones necesarias
        // Luego, cierra el modal
        onClose()
    }

    const handleClose = () => {
        onClose()
    }

    return (
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
                    width: 300,
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
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Descripcion"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Precio"
                        variant="outlined"
                        fullWidth
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Teléfono de contacto"
                        variant="outlined"
                        fullWidth
                        value={formData.phone}
                        onChange={handleChange}
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
                                backgroundColor: loading ? 'white' : '#49007a',
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
                                backgroundColor: '#49007a',
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
    )
}

export default ExperienceModal
