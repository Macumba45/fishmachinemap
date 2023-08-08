import React, { FC, useState } from 'react'
import { Modal, Fade, Box, Typography } from '@mui/material'
import {
    ModalWrapper,
    ModalContent,
    ModalTitle,
    StyledTextField,
    StyledButton,
} from './styles'
import { useLogicStore } from '@/app/store/logic'

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
    } = useLogicStore()

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
        // Handle submission of store data, e.g., send to backend
        const storeData = {
            title,
            picture,
            description,
            phone,
            price,
        }
        console.log(storeData)
        try {
            await postStore(storeData)
        } catch (error) {
            console.log(error)
        }
        onClose()
    }

    const handleCancel = () => {
        onClose()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Fade in={open}>
                <ModalWrapper>
                    <ModalContent>
                        <ModalTitle variant="h6">Crear Anuncio</ModalTitle>
                        <StyledTextField
                            margin="dense"
                            label="Producto"
                            autoFocus
                            variant="outlined"
                            fullWidth
                            value={title}
                            onChange={(e: any) => setTitle(e.target.value)}
                        />
                        <StyledTextField
                            margin="dense"
                            label="Descripción"
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e: any) =>
                                setDescription(e.target.value)
                            }
                        />

                        <StyledTextField
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
                        <StyledTextField
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
                        <StyledButton
                            variant="contained"
                            style={{ backgroundColor: '#49007a' }}
                            onClick={handleSubmit}
                        >
                            Crear Anuncio
                        </StyledButton>
                        <StyledButton
                            variant="outlined"
                            style={{ color: '#49007a', borderColor: '#49007a' }}
                            onClick={handleCancel}
                        >
                            Cancelar
                        </StyledButton>
                    </ModalContent>
                </ModalWrapper>
            </Fade>
        </Modal>
    )
}

export default StoreModal