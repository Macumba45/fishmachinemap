import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

interface Props {
    id: number
    title: string
    description: string
    image: string
    titleImage: string
    city: string
    address: string | undefined
}

const MediaCard: FC<Props> = ({
    id,
    title,
    description,
    image,
    titleImage,
    city,
    address,
}) => {
    const openMap = (address: string) => {
        const baseUrl = 'https://www.google.com/maps/search/?api=1&query='
        const encodedAddress = encodeURIComponent(address)
        window.open(baseUrl + encodedAddress, '_blank')
    }

    let widthCard
    switch (window.innerWidth <= 320) {
        case true:
            widthCard = 280
            break
        case false:
            widthCard = 345
            break;


    }

    console.log(widthCard)

    return (
        <Card key={id} sx={{ width: widthCard }}>
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
