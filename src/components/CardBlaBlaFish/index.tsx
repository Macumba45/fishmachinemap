import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import Typography from '@mui/material/Typography'
import { FC, memo } from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import PaidIcon from '@mui/icons-material/Paid'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import { Button, IconButton } from '@mui/material'
import { InfoBlablaContainer, WhatsappContainer } from './styles'
import Link from 'next/link'
import { useLocale } from 'next-intl'

interface Props {
    id?: string
    date?: string
    departureCity: string
    arrivalCity: string
    departureTime: string
    description: string
    price: string
    phone: string
    user?: string
    iconCreator?: React.ReactNode
    userId?: string
    locale?: string
}

const CardBlaBlaFish: FC<Props> = ({
    id,
    departureCity,
    arrivalCity,
    departureTime,
    description,
    price,
    phone,
    date,
    user,
    iconCreator,
    userId,
    locale,
}) => {
    const handleWhatsAppClick = () => {
        // Construir el enlace de WhatsApp con el número de teléfono
        const phoneNumber = phone.replace(/\D/g, '') // Eliminar todos los caracteres que no sean dígitos del número de teléfono
        const whatsAppLink = `https://api.whatsapp.com/send?phone=${phoneNumber}`
        const message = `Hola, me gustaría reservar una plaza para el viaje de ${departureCity} a ${arrivalCity} el día ${date}.`
        const encodedMessage = encodeURIComponent(message)
        const finalWhatsAppLink = `${whatsAppLink}&text=${encodedMessage}`

        // Abrir el enlace de WhatsApp en una nueva ventana o pestaña
        window.open(finalWhatsAppLink)
    }

    return (
        <Card
            key={id}
            sx={{
                maxWidth: 550,
                minWidth: 320,
                maxHeight: 600,
                borderRadius: 0,
                marginBottom: '2rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
        >
            {/* <CardMedia
                component="img"
                alt="green iguana"
                height="110"
                image="https://www.a-alvarez.com/img/ybc_blog/post/surfcasting-lanzar-mas.jpg"
            /> */}
            <CardContent>
                <Typography
                    sx={{ display: 'flex', alignItems: 'center' }}
                    gutterBottom
                    variant="h5"
                    component="div"
                >
                    {departureCity}{' '}
                    <ArrowRightAltIcon
                        sx={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}
                    />{' '}
                    {arrivalCity}
                </Typography>
                <Typography
                    gutterBottom
                    component="div"
                    sx={{
                        fontSize: '1rem',
                        marginBottom: '1rem',
                        fontWeight: 800,
                    }}
                >
                    Fecha: {date}
                </Typography>
                <Link href={`feed/${userId}`}>
                    <Typography
                        gutterBottom
                        component="div"
                        sx={{
                            fontSize: '0.8rem',
                            marginBottom: '0.5rem',
                            fontWeight: 500,
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        {iconCreator}
                        {user}
                    </Typography>
                </Link>
                <Typography
                    gutterBottom
                    component="div"
                    sx={{
                        fontSize: '0.8rem',
                        marginBottom: '0.5rem',
                        fontWeight: 500,
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    <PaidIcon
                        sx={{ marginRight: '0.3rem', fontSize: '1.2rem' }}
                    />{' '}
                    <span style={{ color: 'green' }}>{price}€</span>
                </Typography>
                <Typography
                    gutterBottom
                    component="div"
                    sx={{
                        fontSize: '0.8rem',
                        marginBottom: '0.5rem',
                        fontWeight: 400,
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    <WatchLaterIcon
                        sx={{ marginRight: '0.3rem', fontSize: '1.2rem' }}
                    />{' '}
                    {departureTime}
                </Typography>
                <Typography
                    marginTop={3}
                    height={80}
                    overflow="scroll"
                    textOverflow="hidden"
                    variant="body2"
                    color="text.secondary"
                >
                    {description}
                </Typography>
            </CardContent>
            <WhatsappContainer>
                <IconButton onClick={handleWhatsAppClick}>
                    <WhatsAppIcon sx={{ color: 'white' }} />
                </IconButton>
                <Typography sx={{ color: 'white' }}>Contactar</Typography>
            </WhatsappContainer>
        </Card>
    )
}

export default memo(CardBlaBlaFish)
