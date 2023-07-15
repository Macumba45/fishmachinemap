import React, { FC, useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Rating,
} from '@mui/material';
import { TypographyContainer, ContenidoGoogle } from './style';

interface Props {
    isOpen: boolean;
    onClose?: () => void;
    onClick?: () => void;
    dataMarkerUser?: {
        comments: string;
        rating: number;
    };
    direction?: string;
    markerType?: string;
    description?: string;
    pictures?: string;
}

const ModalUserMarkers: FC<Props> = ({
    isOpen,
    onClose,
    dataMarkerUser,
    direction,
    description,
    markerType,
    pictures,

}) => {
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = () => {
        // Aquí puedes realizar la lógica para guardar los comentarios y la valoración
        // Puedes acceder a los datos de dataMarkerUser y los nuevos comentarios y valoración
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
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
                <TypographyContainer>
                    <ContenidoGoogle
                        id="modal-modal-title"
                        style={{
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        Contenido de{' '}
                        <img
                            style={{
                                width: '16px',
                                height: '16px',
                                marginLeft: '0.5rem',
                            }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
                            alt=""
                        />
                    </ContenidoGoogle>
                </TypographyContainer>
                <TypographyContainer>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Direccion: {direction}
                    </Typography>
                </TypographyContainer>
                <TypographyContainer>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Typography sx={{ mb: 1, fontWeight: '800' }}>
                            Descripción:
                        </Typography>
                        {description}
                    </Typography>
                </TypographyContainer>
                <TypographyContainer>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Marcador: {markerType}
                    </Typography>
                </TypographyContainer>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" component="label">
                        Comentarios de Usuarios:
                    </Typography>
                    <TextField
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" component="label">
                        Valoraciones:
                    </Typography>
                    <Rating
                        value={rating}
                        onChange={(e, value) => setRating(value || 0)}
                    />
                </Box>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" onClick={onClose}>
                        Cerrar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalUserMarkers;