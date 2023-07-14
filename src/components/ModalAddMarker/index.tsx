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

interface Props {
    isOpen: boolean
    onClose?: () => void
    onClick?: () => void
    address?: string
    positionMarkerUser?:
        | google.maps.LatLngLiteral
        | {
              lat: number | undefined
              lng: number | undefined
          }
}

const ModalCrearMarcador: FC<Props> = ({
    isOpen,
    onClose,
    onClick,
    address,
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
    } = useLogicMaps()
    console.log(direccion)
    console.log(tipoLugar)
    console.log(descripcion)
    console.log(fotos)

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

    const handleFotosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            const fileArray = Array.from(files) as File[]
            setFotos(fileArray)
        } else {
            setFotos([])
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        confirmMarker(
            positionMarkerUser,
            direccion,
            tipoLugar,
            descripcion,
            fotos
        )
    }

    console.log(positionMarkerUser)

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

                <form onSubmit={handleSubmit}>
                    <Box sx={{ mt: 2, borderRadius: '20px' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <Typography variant="body1" component="label">
                                <TextField
                                    value={direccion}
                                    fullWidth
                                    id="outlined-controlled"
                                    label="Introduce la Dirección/Lugar"
                                    onChange={handleDireccionChange}
                                />
                            </Typography>
                        </div>
                        <Typography variant="body2" component="label">
                            Tipo de lugar:
                        </Typography>
                        <Select
                            value={tipoLugar}
                            onChange={handleTipoLugarChange}
                            fullWidth
                        >
                            <MenuItem value="Pesquero">Pesquero</MenuItem>
                            <MenuItem value="store">Tienda de Pesca</MenuItem>
                            <MenuItem value="worm">Cebos 24H</MenuItem>
                            <MenuItem value="pictures">
                                Fotos de Capturas
                            </MenuItem>
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
                        />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" component="label">
                            Subir fotos:
                        </Typography>
                        <input
                            multiple
                            type="file"
                            onChange={handleFotosChange}
                        />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <ButtonComp
                            type="button"
                            variant="contained"
                            style={{
                                backgroundColor: '#49007a',
                            }}
                            title="Confirmar"
                            onClick={onClick}
                        />
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default ModalCrearMarcador
