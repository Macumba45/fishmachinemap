import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { CardContainer, Spanbold } from './style'
import { Phone, WhatsApp, WhatshotRounded } from '@mui/icons-material'

export default function MultiActionAreaCard() {
    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image="https://upload.wikimedia.org/wikipedia/commons/d/d5/Recreational-fishing-colombia.jpg"
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    Pescar en Alta Mar - Atún Rojo
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Disfruta de una experiencia única en alta mar, pesca atúnes
                    y disfruta de la brisa del mar.
                </Typography>
                <Typography
                    sx={{ mt: 2 }}
                    variant="body2"
                    color="text.secondary"
                >
                    <Spanbold>Precio:</Spanbold> 100€
                </Typography>
                <Typography
                    sx={{ mt: 2 }}
                    variant="body2"
                    color="text.secondary"
                >
                    <Spanbold>Ciudad:</Spanbold> Cádiz
                </Typography>
                <Typography
                    sx={{ mt: 2 }}
                    variant="body2"
                    color="text.secondary"
                >
                    <Spanbold>Teléfono:</Spanbold> +34 666 666 666
                </Typography>
                <Typography
                    sx={{
                        mt: 2,
                        display: 'flex',
                        alignItems: 'center',
                        color: '#49007a',
                    }}
                    variant="body2"
                    color="text.primary"
                ></Typography>
            </CardContent>
            <CardActions
                sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <Button
                    sx={{ color: 'white', backgroundColor: '#49007a', ml: 1 }}
                    size="small"
                    color="primary"
                >
                    + Info
                </Button>
                <IconButton
                    sx={{
                        fontSize: '1rem',
                        color: '#49007a',
                        backgroundColor: '#25D366',
                        borderRadius: '30px',
                        mr: 2,
                        mb: 1,
                        '&:hover': {
                            backgroundColor: '#1a8642', // Cambiar color del hover
                        },
                    }}
                >
                    <WhatsAppIcon sx={{ color: 'white' }} />
                </IconButton>
            </CardActions>
        </Card>
    )
}
