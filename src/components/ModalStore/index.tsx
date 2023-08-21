import React, { FC, useState } from 'react'
import { useLogicStore } from '@/app/store/logic'
import { LoadingButton } from '@mui/lab'
import MuiAlert from '@mui/material/Alert'
import {
    Modal,
    Fade,
    Box,
    Typography,
    Button,
    Snackbar,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
} from '@mui/material'
import { ModalWrapper, ModalContent } from './styles'

interface Props {
    open: boolean
    onClose: () => void
}

const StoreModal: FC<Props> = ({ open, onClose }) => {
    const {
        title,
        setTitle,
        picture,
        setPicture,
        description,
        setDescription,
        phone,
        setPhone,
        price,
        setPrice,
        postStore,
        category,
        setCategory,
    } = useLogicStore()

    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
    const [loading, setLoading] = useState(false)

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

    const getBase64FromUrl = async (url: string) => {
        const data = await fetch(url)
        const blob = await data.blob()
        return new Promise<string>(resolve => {
            const reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                const base64data = reader.result as string
                resolve(base64data)
            }
        })
    }

    const handleFotosChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files
        if (files && files.length > 0) {
            const file = files[0]

            // Reducir el tamaño de la imagen antes de convertirla a Base64
            const resizedFile = await resizeImage(file, {
                maxWidth: 1024,
                maxHeight: 1024,
            })

            const fileUrl = URL.createObjectURL(resizedFile)
            const base64Data = await getBase64FromUrl(fileUrl)
            setPicture(base64Data) // Guarda la imagen en formato Base64 en el estado
        }
    }

    const resizeImage = (
        file: File,
        options: { maxWidth: number; maxHeight: number }
    ) => {
        return new Promise<File>(resolve => {
            const img = new Image()
            img.src = URL.createObjectURL(file)

            img.onload = () => {
                const { width, height } = img
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                canvas.width = options.maxWidth
                canvas.height = options.maxHeight

                const scaleFactor = Math.min(
                    options.maxWidth / width,
                    options.maxHeight / height
                )
                canvas.width = width * scaleFactor
                canvas.height = height * scaleFactor

                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
                canvas.toBlob(resizedBlob => {
                    if (resizedBlob) {
                        const resizedFile = new File([resizedBlob], file.name, {
                            type: file.type,
                        })
                        resolve(resizedFile)
                    } else {
                        resolve(file)
                    }
                }, file.type)
            }
        })
    }

    const handleSubmit = async () => {
        if (!title || !picture || !description || !phone || !price) {
            setSnackbarOpen(true)
            return
        }
        // Handle submission of store data, e.g., send to backend
        const storeData = {
            title,
            category,
            picture,
            description,
            phone,
            price,
        }
        try {
            setLoading(true)
            await postStore(storeData)
            setSuccessSnackbarOpen(true)
            onClose()
        } catch (error) {
            console.log(error)
        }
        onClose()
    }

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Fade in={open}>
                    <ModalWrapper style={{ width: '310px', margin: '0 auto' }}>
                        <ModalContent>
                            <Typography variant="h6">Crear Anuncio</Typography>
                            <TextField
                                margin="dense"
                                placeholder="Carrete de Pesca Shimano..."
                                label="Producto"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e: any) => setTitle(e.target.value)}
                            />
                            <FormControl
                                sx={{ mb: '4px', mt: '8px' }}
                                fullWidth
                            >
                                <InputLabel id="demo-simple-select-label">
                                    Categoria
                                </InputLabel>
                                <Select
                                    margin="dense"
                                    labelId="demo-simple-select-label"
                                    fullWidth
                                    label="Categoria"
                                    value={category}
                                    onChange={(e: any) =>
                                        setCategory(e.target.value)
                                    }
                                >
                                    <MenuItem value="Accesorios">
                                        Accesorios
                                    </MenuItem>
                                    <MenuItem value="Ropa">
                                        Ropa y Calzado
                                    </MenuItem>
                                    <MenuItem value="Camping">Camping</MenuItem>
                                    <MenuItem value="Equipamiento">
                                        Equipamiento de Embarcaciones
                                    </MenuItem>
                                    <MenuItem value="Equipo">
                                        Equipo Completo
                                    </MenuItem>
                                    <MenuItem value="Cañas">
                                        Cañas de Pesca
                                    </MenuItem>
                                    <MenuItem value="Cebos">
                                        Cebos Artificiales
                                    </MenuItem>
                                    <MenuItem value="Bolsas">
                                        Bolsas y Fundas
                                    </MenuItem>
                                    <MenuItem value="Electrónica">
                                        Electrónica
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                margin="dense"
                                placeholder="Carrete de Pesca Shimano en buen estado, con poco uso..."
                                label="Descripción"
                                fullWidth
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e: any) =>
                                    setDescription(e.target.value)
                                }
                            />

                            <TextField
                                margin="dense"
                                placeholder="10€"
                                label="Precio €"
                                fullWidth
                                value={price}
                                type="number"
                                onChange={(e: any) => setPrice(e.target.value)}
                                inputProps={{
                                    inputMode: 'numeric', // Indica que solo se deben permitir números en el teclado
                                    pattern: '[0-9]*', // Patrón para garantizar que solo se permitan números válidos
                                }}
                            />
                            <TextField
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                value={phone}
                                onChange={(e: any) => {
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
                                placeholder="+34 123 456 789"
                                label="Teléfono de contacto"
                            />
                            <Box sx={{ mt: 2, mb: 2 }}>
                                <Typography
                                    variant="body2"
                                    component="label"
                                ></Typography>
                                <input
                                    accept=".jpg, .png, .gif, .jpeg"
                                    type="file"
                                    onChange={handleFotosChange}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    mt: 4,
                                }}
                            >
                                <LoadingButton
                                    loading={loading}
                                    onClick={handleSubmit}
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#49007a',
                                        color: 'white',
                                    }}
                                >
                                    Vender Producto
                                </LoadingButton>
                                <Button
                                    hidden={loading}
                                    sx={{ color: '#49007a' }}
                                    onClick={onClose}
                                >
                                    Cancelar
                                </Button>
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
                                    Por favor, completa todos los campos
                                    requeridos antes de vender el producto.
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
                                    ¡Producto en venta exitosamente!
                                </MuiAlert>
                            </Snackbar>
                        </ModalContent>
                    </ModalWrapper>
                </Fade>
            </Modal>
        </>
    )
}

export default StoreModal
