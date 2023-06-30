import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Backdrop, Divider, IconButton } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import ButtonComp from '@/components/Button'
import CloseIcon from '@mui/icons-material/Close'
import NavigationIcon from '@mui/icons-material/Navigation'
import { ButtonContainer, ImageContainer, ImageModal, TypographyContainer } from './style'
import SimpleSlider from '../Carousel/page'

export const openMap = (address: string) => {
    const baseUrl = 'https://www.google.com/maps/search/?api=1&query='
    const encodedAddress = encodeURIComponent(address)
    window.open(baseUrl + encodedAddress)
}


interface Props {
    label?: string
    direction?: string
    onClose?: () => void
    isOpenProp?: boolean
    icon?: React.ReactNode
    children?: React.ReactNode
}

const BasicModal: FC<Props> = ({
    label,
    direction,
    onClose,
    isOpenProp,
    children,
}) => {

    const pictures = [
        { src: 'https://www.barcelo.com/content/dam/bpt/posts/2023/2/mejores%20playas%20del%20mundo%20tripadvisor%202023.jpg' },
        { src: 'https://images.ecestaticos.com/QgNpC-WUOuhX5IBWxi74bU_bgAE=/0x0:1254x836/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F9a6%2F1ff%2F5eb%2F9a61ff5eb796f5dc603dc05f5764286c.jpg' },
        { src: 'https://offloadmedia.feverup.com/sevillasecreta.co/wp-content/uploads/2020/06/19141341/shutterstock_297099269-1.jpg' },
    ];


    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(isOpenProp || true)
    }, [isOpenProp])

    // const handleClose = () => {
    //     setIsOpen(false)
    // }

    let width = window.innerWidth
    if (width < 600) {
        width = 300
    } else {
        width = 400
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
    }

    return (
        <Modal
            open={isOpen}
            // onClose={handleClose}
            disableEscapeKeyDown={true}
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
                <TypographyContainer>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {label}
                    </Typography>
                </TypographyContainer>
                <TypographyContainer>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {direction}
                    </Typography>
                </TypographyContainer>
                <ImageContainer>
                    <SimpleSlider pictures={pictures} />
                </ImageContainer>
                <Divider sx={{ width: '100px', margin: '3rem auto' }} />
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
    )
}

export default BasicModal
