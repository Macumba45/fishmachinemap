import { FC } from 'react'
import Link from 'next/link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import PaidIcon from '@mui/icons-material/Paid'
import PlaceIcon from '@mui/icons-material/Place'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import CategoryIcon from '@mui/icons-material/Category'
import { Button, CardActions, IconButton } from '@mui/material'
import { ContainerInfo, LogoInfluencerContainer } from './style'
import { useLocale } from 'next-intl'

interface Props {
    title: string
    description: string
    price: string
    city: string
    country: string
    picture: string
    category: string
    whatsapp: string
    influencer: string
    userPicture?: string
    onClick?: () => void
    userId?: string
}

const CardExperiences: FC<Props> = ({
    title,
    description,
    price,
    city,
    category,
    whatsapp,
    influencer,
    userPicture,
    userId,
}) => {
    const locale = useLocale()
    const handleWhatsAppClick = () => {
        // Construir el enlace de WhatsApp con el número de teléfono
        const phoneNumber = whatsapp.replace(/\D/g, '') // Eliminar todos los caracteres que no sean dígitos del número de teléfono
        const whatsAppLink = `https://api.whatsapp.com/send?phone=${phoneNumber}`
        const message = `Hola, esoty interesado en la experiencia ${title} en ${city}.`
        const encodedMessage = encodeURIComponent(message)
        const finalWhatsAppLink = `${whatsAppLink}&text=${encodedMessage}`

        // Abrir el enlace de WhatsApp en una nueva ventana o pestaña
        window.open(finalWhatsAppLink)
    }

    return (
        <Card sx={{ minWidth: 300, margin: 2, maxWidth: 450, width: '100%' }}>
            <CardMedia
                component="img"
                height="140"
                image="https://upload.wikimedia.org/wikipedia/commons/d/d5/Recreational-fishing-colombia.jpg"
            />
            <LogoInfluencerContainer>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CardMedia
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            border: '1px solid #4675A6',
                        }}
                        image={userPicture}
                    />
                    <Typography
                        marginBottom={0}
                        fontSize={10}
                        marginLeft={1}
                        gutterBottom
                        variant="h6"
                        component="div"
                    >
                        <Link
                            style={{ color: '#4675A6' }}
                            href={`/${locale}/feed/${userId}`}
                        >
                            {influencer}
                        </Link>
                    </Typography>
                </div>
                <Button
                    onClick={() => console.log('click')}
                    sx={{
                        color: '#4675A6',
                        mr: 4,
                        fontSize: 10,
                        '&:hover': {
                            backgroundColor: '#42ACE8',
                            color: 'white',
                        },
                    }}
                >
                    Compártelo
                </Button>
            </LogoInfluencerContainer>
            <CardContent>
                <Typography
                    fontSize={18}
                    marginBottom={2}
                    gutterBottom
                    variant="h6"
                    component="div"
                >
                    {title}
                </Typography>
                <Typography
                    style={{ overflow: 'auto' }}
                    fontSize={12}
                    variant="h5"
                    color="text.secondary"
                    height={100}
                    maxHeight={100}
                    component="div"
                >
                    {description}
                </Typography>
                <ContainerInfo>
                    <Typography
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        variant="body2"
                        color="text.secondary"
                        component="div"
                    >
                        <PaidIcon
                            sx={{ width: 20, mr: 0.5, color: '#4675A6' }}
                        />{' '}
                        {price} €
                    </Typography>
                    <Typography
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        variant="body2"
                        color="text.secondary"
                        component="div"
                    >
                        <PlaceIcon
                            sx={{ width: 20, mr: 0.5, color: '#4675A6' }}
                        />{' '}
                        {city}
                    </Typography>
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                        variant="body2"
                        color="text.secondary"
                        component="div"
                    >
                        <CategoryIcon
                            sx={{ width: 20, mr: 1, color: '#4675A6' }}
                        />{' '}
                        {category}
                    </Typography>
                </ContainerInfo>
                {/* <Typography
                    sx={{
                        mt: 2,
                        display: 'flex',
                        alignItems: 'center',
                        color: '#4675A6',
                    }}
                    variant="body2"
                    color="text.primary"
                >

                </Typography> */}
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: '#4675A6 ',
                    padding: 0,
                    borderTopRightRadius: '4px',
                    borderTopLeftRadius: '4px',
                    height: '40px',
                }}
            >
                <div
                    onClick={handleWhatsAppClick}
                    style={{
                        width: '100%',
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <IconButton>
                        <Typography sx={{ color: 'white', mr: 1 }}>
                            Contactar
                        </Typography>
                        <WhatsAppIcon
                            fontSize="medium"
                            sx={{ color: '#25D366' }}
                        />
                    </IconButton>
                </div>
            </CardActions>
        </Card>
    )
}

export default CardExperiences
