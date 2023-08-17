import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import Typography from '@mui/material/Typography'
import { FC, memo } from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import PaidIcon from '@mui/icons-material/Paid'
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import { IconButton } from '@mui/material'

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
                maxWidth: 800,
                minWidth: 320,
                maxHeight: 900,
                borderRadius: 0,
                marginBottom: '2rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
        >
            <CardMedia
                component="img"
                alt="green iguana"
                height="180"
                image="https://www.a-alvarez.com/img/ybc_blog/post/surfcasting-lanzar-mas.jpg"
            />
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
                        marginBottom: '0.5rem',
                        fontWeight: 800,
                    }}
                >
                    Fecha: {date}
                </Typography>
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
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <IconButton
                onClick={handleWhatsAppClick}
                sx={{
                    backgroundColor: '#25D366',
                    marginLeft: '1rem',
                    borderRadius: '30px',
                    marginBottom: '2rem',
                }}
            >
                <WhatsAppIcon sx={{ color: 'white' }} />
            </IconButton>
        </Card>
    )
}

export default memo(CardBlaBlaFish)
