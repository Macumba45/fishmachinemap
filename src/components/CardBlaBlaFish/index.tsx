import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import Typography from '@mui/material/Typography'

export default function CardBlaBlaFish() {
    return (
        <Card sx={{ maxWidth: 500, maxHeight: 500, borderRadius: 0 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="180"
                image="https://www.a-alvarez.com/img/ybc_blog/post/surfcasting-lanzar-mas.jpg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Desde Sevilla a Huelva
                </Typography>
                <Typography
                    fontSize="0.8rem"
                    marginBottom="0.5rem"
                    gutterBottom
                    variant="h6"
                    component="div"
                >
                    Salida: 10:00am
                </Typography>
                <Typography
                    fontSize="0.8rem"
                    marginBottom="0.5rem"
                    gutterBottom
                    variant="h6"
                    component="div"
                >
                    Vuelta: 20:00pm
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Este sabado me voy a ir al espigón de Huelva a pescar. Tengo
                    hueco para dos personas más. Si alguien se quiere apuntar
                    que me escriba.
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    backgroundColor: '#25D366',
                    width: '100px',
                    marginLeft: '1rem',
                    borderRadius: '30px',
                    marginBottom: '2rem',
                }}
            >
                <WhatsAppIcon sx={{ color: 'white' }} />
                <Button sx={{ color: 'white' }} size="small">
                    WhatsApp
                </Button>
            </CardActions>
        </Card>
    )
}
