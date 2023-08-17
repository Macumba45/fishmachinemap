import { FC } from 'react'
import { Button, Modal, Typography } from '@mui/material'

interface DeleteMarkerModalProps {
    isOpen: boolean
    onCancel: () => void
    onClick: () => void
}

const DeleteMarkerModal: FC<DeleteMarkerModalProps> = ({
    isOpen,
    onCancel,
    onClick,
}) => {
    return (
        <Modal
            style={{ backgroundColor: 'transparent' }} // Fondo transparente
            open={isOpen}
            onClose={onCancel}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    backgroundColor: '#fff',
                    padding: 20,
                    borderRadius: 8,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    ¿Estás seguro de eliminar el marcador?
                </Typography>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 20,
                    }}
                >
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={onClick}
                        style={{ marginRight: 10 }}
                    >
                        Confirmar
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onCancel}
                    >
                        Cancelar
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteMarkerModal
