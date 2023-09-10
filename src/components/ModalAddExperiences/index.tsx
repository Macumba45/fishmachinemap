import React, { FC, useState } from 'react'
import { useLogicExperience } from '@/app/[locale]/experiencias/logic'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

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
        setPicture,
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
        setUrl,
    } = useLogicExperience()

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const experienceData = {
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
            await postExperience(experienceData)
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
                            <MenuItem value="Accesorios">Accesorios</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        name="price"
                        label="Precio"
                        variant="outlined"
                        fullWidth
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Teléfono de contacto"
                        variant="outlined"
                        fullWidth
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Whatsapp de contacto"
                        variant="outlined"
                        fullWidth
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Ciudad"
                        variant="outlined"
                        fullWidth
                        value={city}
                        onChange={e => setCity(e.target.value)}
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
