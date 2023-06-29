import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { Props } from './types'

const MediaCard: FC<Props> = ({
    id,
    title,
    description,
    image,
    titleImage,
    city,
    address,
}) => {
    const openMap = (address: any) => {
        const baseUrl = 'https://www.google.com/maps/search/?api=1&query='
        const encodedAddress = encodeURIComponent(address)
        window.open(baseUrl + encodedAddress, '_blank')
    }

    return (
        <Card key={id} sx={{ width: 345 }}>
            <CardMedia sx={{ height: 140 }} image={image} title={titleImage} />
            <CardContent>
                <Typography
                    sx={{ fontSize: '25px', fontWeight: '500' }}
                    gutterBottom
                    component="div"
                >
                    {title}
                </Typography>
                <Typography
                    sx={{ fontSize: '20px', fontWeight: '200' }}
                    gutterBottom
                    component="div"
                >
                    {city}, {address}
                </Typography>
                {/* <Typography sx={{ fontSize: '15px', fontWeight: '500' }} gutterBottom component="div">
                    {address}
                </Typography> */}
                <Typography variant="body2" color="text.terciary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    sx={{ marginLeft: '0.4rem' }}
                    onClick={() => openMap(city)}
                    size="small"
                >
                    Llévame
                </Button>
                {/* <Button size="small">Learn More</Button> */}
            </CardActions>
        </Card>
    )
}

export default MediaCard
