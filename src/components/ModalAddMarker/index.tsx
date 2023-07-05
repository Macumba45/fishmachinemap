'use client'


import React, { FC, useState } from 'react';
import { Modal, Box, Typography, Select, MenuItem, TextField, Button, Input } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import ButtonComp from '@/components/Button';


interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const ModalCrearMarcador: FC<Props> = ({ isOpen, onClose }) => {
    const [tipoLugar, setTipoLugar] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fotos, setFotos] = useState<File[]>([]);
    console.log(fotos);
    console.log(tipoLugar);
    console.log(descripcion);

    const handleTipoLugarChange = (event: SelectChangeEvent<string>) => {
        setTipoLugar(event.target.value);
    };
    const handleDescripcionChange = (event: any) => {
        setDescripcion(event.target.value);
    };

    const handleFotosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files) as File[];
            setFotos(fileArray);
        } else {
            setFotos([]);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Aquí puedes enviar los datos del marcador al servidor
        // y realizar cualquier otra acción necesaria
        // ...

        // Cerrar el modal después de enviar el formulario
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
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
                        <Typography variant="body2" component="label">
                            Tipo de lugar:
                        </Typography>
                        <Select
                            value={tipoLugar}
                            onChange={handleTipoLugarChange}
                            fullWidth
                            required
                        >
                            <MenuItem value="">Seleccionar tipo de lugar</MenuItem>
                            <MenuItem value="restaurante">Restaurante</MenuItem>
                            <MenuItem value="hotel">Hotel</MenuItem>
                            <MenuItem value="parque">Parque</MenuItem>
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
                        <input multiple required type="file" onChange={handleFotosChange} />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <ButtonComp
                            type="submit"
                            variant="contained"
                            style={{
                                // position: 'absolute',
                                // zIndex: 999999,
                                // top: '12%',
                                // left: '50%',
                                // transform: 'translate(-50%, -50%)',
                                backgroundColor: '#49007a',
                            }}
                            title="Confirmar"
                        />
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default ModalCrearMarcador;
