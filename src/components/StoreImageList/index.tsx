import { FC, memo, useEffect, useState } from 'react'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import EuroIcon from '@mui/icons-material/Euro'

interface Props {
    id?: string
    title: string
    description: string
    picture: string
    price: string
}

const TitlebarImageList: FC<Props> = ({
    id,
    title,
    description,
    picture,
    price,
}) => {
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)

    const calculateSize = () => {
        if (window.innerWidth <= 320) {
            setWidth(150)
            setHeight(150)
        } else if (window.innerWidth <= 449) {
            setWidth(170)
            setHeight(160)
        } else if (window.innerWidth >= 615) {
            setWidth(300)
            setHeight(180)
        }
    }

    useEffect(() => {
        calculateSize()
        window.addEventListener('resize', calculateSize)
        return () => {
            window.removeEventListener('resize', calculateSize)
        }
    }, []) // Este efecto se ejecuta solo una vez al montar el componente
    return (
        <ImageListItem
            component="div"
            style={{
                display: 'flex',
                width: width,
                height: height,
                margin: '0.2rem',
            }}
            key={id}
        >
            <img
                src={`${picture}`}
                srcSet={`${picture}`}
                style={{
                    width: '100%',
                    height: height,
                    objectFit: 'cover',
                    borderRadius: '10px',
                }}
            />
            <ImageListItemBar
                title={title}
                subtitle={description}
                sx={{
                    borderBottomRightRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    '.MuiImageListItemBar-title': {
                        fontSize: '0.8rem',
                    },
                    '.MuiImageListItemBar-subtitle': {
                        fontSize: '0.6rem',
                    },
                }}
                actionIcon={
                    <IconButton
                        sx={{
                            color: 'rgba(0, 255, 76, 0.641)',
                            fontSize: '1rem',
                        }}
                        aria-label={`info about ${title}`}
                    >
                        {price}
                        <EuroIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                }
            />
        </ImageListItem>
    )
}

export default memo(TitlebarImageList)
