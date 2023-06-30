import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import ButtonComp from '@/components/Button';
import CloseIcon from '@mui/icons-material/Close';
import NavigationIcon from '@mui/icons-material/Navigation';
import { ButtonContainer } from './style';

export const openMap = (address: string) => {
    const baseUrl = 'https://www.google.com/maps/search/?api=1&query=';
    const encodedAddress = encodeURIComponent(address);
    window.open(baseUrl + encodedAddress, '_blank');
};

interface Props {
    label?: string;
    direction?: string;
    onClose?: () => void;
    isOpenProp?: boolean;
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

const BasicModal: FC<Props> = ({
    label,
    direction,
    onClose,
    isOpenProp,
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(isOpenProp || true);
    }, [isOpenProp]);

    const handleClose = () => {
        setIsOpen(false);
    };

    let width = window.innerWidth;

    if (width < 600) {
        width = 300;
    } else {
        width = 400;
    }

    const style = {
        position: 'absolute' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: width,
        bgcolor: 'background.paper',
        boderShadow: '0 10px 100px #000',
        p: 4,
        borderRadius: '10px',
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <IconButton
                    aria-label="Close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 9999999,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {label}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {direction}
                </Typography>
                {children}
                <ButtonContainer>
                    <ButtonComp
                        icon={<NavigationIcon fontSize="medium" />}
                        color="white"
                        title="Abrir en Google Maps"
                        bgColor="#135a5a"
                        variant="contained"
                        onClick={() => openMap(direction || '')}
                    ></ButtonComp>
                </ButtonContainer>
            </Box>
        </Modal>
    );
};

export default BasicModal;
