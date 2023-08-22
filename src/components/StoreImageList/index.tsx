import * as React from 'react'
import { FC, memo } from 'react'
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

let width: any

if (typeof window !== 'undefined') {
    if (window.innerWidth <= 320) {
        width = 150
    } else if (window.innerWidth <= 449) {
        width = 170
    } else if (window.innerWidth >= 450) {
        width = 180
    }
}

let height: any

if (typeof window !== 'undefined') {
    if (window.innerWidth <= 320) {
        height = 150
    } else if (window.innerWidth <= 449) {
        height = 160
    } else if (window.innerWidth >= 450) {
        height = 180
    }
}

const TitlebarImageList: FC<Props> = ({
    id,
    title,
    description,
    picture,
    price,
}) => {
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
                style={{
                    borderBottomRightRadius: '10px',
                    borderBottomLeftRadius: '10px',
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
