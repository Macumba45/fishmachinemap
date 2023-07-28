import React, { FC, useState } from 'react'
import { useLogicMaps } from '@/app/maps/logic'
import {
    Modal,
    Box,
    Typography,
    Select,
    MenuItem,
    TextField,
    Button,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material'
import ButtonComp from '@/components/Button'
import { LoadingButton } from '@mui/lab'

interface Props {
    isOpen: boolean
    onClose?: () => void
    onClick?: () => void
    positionMarkerUser?:
    | google.maps.LatLngLiteral
    | {
        lat: number | undefined
        lng: number | undefined
    }
    direction?: string
    markerType?: string
    description?: string
    pictures?: string
}

const ModalCrearMarcador: FC<Props> = ({
    isOpen,
    onClose,
    onClick,
    positionMarkerUser,
}) => {
    const {
        confirmMarker,
        direccion,
        setDireccion,
        tipoLugar,
        setTipoLugar,
        descripcion,
        setDescripcion,
        fotos,
        setFotos,
        setAddingMarker,
    } = useLogicMaps()

    const [isLoading, setIsLoading] = useState(false)
    const handleDireccionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDireccion(event.target.value)
    }

    const handleTipoLugarChange = (event: SelectChangeEvent<string>) => {
        setTipoLugar(event.target.value)
    }

    const handleDescripcionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDescripcion(event.target.value)
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
            setFotos(base64Data) // Guarda la imagen en formato Base64 en el estado
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)

        event.preventDefault()
        await confirmMarker(
            positionMarkerUser,
            direccion || '',
            tipoLugar || '',
            descripcion || '',
            fotos || null
        )
        setIsLoading(false)
        onClose!()
    }

    return (
        <Modal open={isOpen}>
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
                <Typography variant="h6" component="h2" align="center">
                    Crear Marcador
                </Typography>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Box sx={{ mt: 2, borderRadius: '20px' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <Typography variant="body2" component="label">
                                Introduce la Dirección/Lugar
                            </Typography>
                            <TextField
                                value={direccion}
                                fullWidth
                                id="outlined-controlled"
                                onChange={handleDireccionChange}
                                required
                            />
                        </div>
                        <Typography variant="body2" component="label">
                            Tipo de lugar:
                        </Typography>
                        <Select
                            value={tipoLugar}
                            onChange={handleTipoLugarChange}
                            fullWidth
                            required
                        >
                            <MenuItem value="pesquero">Pesquero</MenuItem>
                            <MenuItem value="tienda">Tienda de Pesca</MenuItem>
                            <MenuItem value="cebos">Cebos 24H</MenuItem>
                            <MenuItem value="fotos">Fotos de Capturas</MenuItem>
                        </Select>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" component="label">
                            Descripción del lugar:
                        </Typography>
                        <TextField
                            value={descripcion}
                            onChange={handleDescripcionChange}
                            fullWidth
                            multiline
                            rows={4}
                            required
                        />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" component="label">
                            Subir fotos:
                        </Typography>
                        <input
                            required
                            accept=".jpg, .png, .gif, .jpeg"
                            type="file"
                            onChange={handleFotosChange}
                        />
                    </Box>

                    <Box
                        sx={{
                            mt: 2,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            style={{
                                backgroundColor: isLoading
                                    ? 'white'
                                    : '#49007a',
                                marginRight: isLoading ? '0' : '0.5rem',
                            }}
                            title="Confirmar"
                            loading={isLoading}
                            loadingPosition="center"
                        >
                            Confirmar
                        </LoadingButton>
                        <ButtonComp
                            type="button"
                            variant="contained"
                            style={{
                                backgroundColor: '#49007a',
                                display: isLoading ? 'none' : 'block',
                            }}
                            title="Cancelar"
                            onClick={onClose}
                            disabled={isLoading}
                        />
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default ModalCrearMarcador
