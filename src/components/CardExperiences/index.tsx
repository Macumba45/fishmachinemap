import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material'
import { CardContainer, Spanbold } from './style'
import { Phone } from '@mui/icons-material'

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
                    sx={{ mt: 2, display: 'flex', alignItems: 'center' }}
                    variant="body2"
                    color="text.secondary"
                >
                    <IconButton>
                        <Phone />
                    </IconButton>
                    Llamar
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    + Info
                </Button>
            </CardActions>
        </Card>
    )
}
