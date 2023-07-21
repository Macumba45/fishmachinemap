'use client'

import { FC, useEffect, useState } from 'react'
import {
    MainContainer,
    UserContainerData,
    emailStyles,
    nameStyles,
} from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import { useLogicUser } from './logic'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import AccountMenu from '@/components/Menu'
import { IconButton, ListItemAvatar } from '@mui/material'
import { UserMarker } from '../maps/type'
import { Delete, Edit } from '@mui/icons-material'
import React from 'react'
import DeleteMarkerModal from '@/components/DeletedModalMarker'
import ButtonComp from '@/components/Button'
import customMarkerIcon from '../../assets/anzuelo.png'
import customMarkerIconShop from '../../assets/tienda.png'
import customMarkerIconPlace from '../../assets/destino.png'
import customMarkerIconPicture from '../../assets/back-camera.png'
import { StaticImageData } from 'next/image'
const Profile: FC = () => {
    const {
        user,
        userMarkers,
        getUser,
        getUserMarkers,
        deleteUserMarkers,
        setToBeDeletedMarkers,
        toBeDeletedMarkers,
    } = useLogicUser()

    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        // Check if window is available before setting the initial width
        if (typeof window !== 'undefined') {
            setWidth(window.innerWidth);
        }

        // Handle the resize event
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        // Add the event listener only if window is available
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    const noMarkers = userMarkers.length === 0

    useEffect(() => {
        getUser()
        getUserMarkers()
    }, [])

    useEffect(() => {
        if (toBeDeletedMarkers) {
            // Comparamos con true para saber si algún modal está abierto
            getUserMarkers()
        }
    }, [toBeDeletedMarkers])

    const goToMaps = () => {
        window.location.href = '/maps'
    }

    return (
        <>
            <AccountMenu />
            <MainContainer>
                <UserContainerData>
                    <Avatar
                        sx={{ width: 100, height: 100, marginTop: '2rem' }}
                    />
                    <Typography
                        style={{
                            textAlign: 'center',
                            ...nameStyles,
                        }}
                        variant="h6"
                        gutterBottom
                    >
                        {user?.name}
                    </Typography>
                    <Typography
                        style={{
                            textAlign: 'center',
                            ...emailStyles,
                        }}
                        variant="h6"
                        gutterBottom
                    >
                        {user?.email}
                    </Typography>
                </UserContainerData>
                <Typography
                    sx={{
                        display: noMarkers ? 'none' : 'flex',
                        justifyContent: 'center',
                        marginTop: '2rem',
                        color: '#49007a',
                        flexDirection: 'column',
                        textAlign: 'center',
                    }}
                    variant="h6"
                    gutterBottom
                >
                    Tus marcadores
                    <Divider
                        sx={{
                            my: 2,
                            backgroundColor: '#49007a',
                            width: '200px',
                            margin: '1rem auto',
                        }}
                    />
                </Typography>

                {noMarkers && (
                    <>
                        <Typography
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '2rem',
                                color: '#49007a',
                                flexDirection: 'column',
                                textAlign: 'center',
                            }}
                            variant="h6"
                            gutterBottom
                        >
                            No tienes marcadores
                        </Typography>
                        <ButtonComp
                            title="Añade tu primer marcador"
                            variant="contained"
                            color="#49007a"
                            style={{
                                marginTop: '2rem',
                                backgroundColor: '#49007a',
                            }}
                            onClick={goToMaps}
                        />
                    </>
                )}
                {userMarkers.map((marker: UserMarker) => (
                    <React.Fragment key={marker.id}>
                        <ListItem
                            sx={{
                                width: width,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            alignItems="flex-start"
                        >
                            <ListItemAvatar
                                key={marker.id}
                                sx={{ margin: '0' }}
                            >
                                <Avatar alt="Marker Icon">
                                    {(() => {
                                        switch (marker.markerType) {
                                            case 'pesquero':
                                                return (
                                                    <img
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        src={
                                                            customMarkerIconPlace.src
                                                        }
                                                        alt="Marker Icon"
                                                    />
                                                )

                                            case 'tienda':
                                                return (
                                                    <img
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        src={
                                                            customMarkerIconShop.src
                                                        }
                                                        alt="Marker Icon"
                                                    />
                                                )

                                            case 'cebos':
                                                return (
                                                    <img
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        src={
                                                            customMarkerIcon.src
                                                        }
                                                        alt="Marker Icon"
                                                    />
                                                )

                                            case 'fotos':
                                                return (
                                                    <img
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        src={
                                                            customMarkerIconPicture.src
                                                        }
                                                        alt="Marker Icon"
                                                    />
                                                )
                                            default:
                                                return null
                                        }
                                    })()}
                                </Avatar>
                            </ListItemAvatar>

                            <ListItemText
                                primaryTypographyProps={{ width: '200px' }}
                                primary={
                                    marker.direction.charAt(0).toUpperCase() +
                                    marker.direction.slice(1)
                                }
                                secondary={
                                    <>
                                        <Typography
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                fontWeight: 400,
                                                wordWrap: 'break-word',
                                            }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {marker.description
                                                .charAt(0)
                                                .toUpperCase() +
                                                marker.description.slice(1)}
                                        </Typography>
                                        <Typography
                                            component="p"
                                            sx={{
                                                width: '100%',
                                                fontWeight: 200,
                                                fontSize: '0.8rem',
                                            }}
                                        >
                                            {marker.markerType
                                                .charAt(0)
                                                .toUpperCase() +
                                                marker.markerType.slice(1)}
                                        </Typography>
                                    </>
                                }
                            />
                            <IconButton
                                onClick={() =>
                                    setToBeDeletedMarkers(prevState => ({
                                        ...prevState,
                                        [marker.id as string]: true,
                                    }))
                                }
                                edge="end"
                                aria-label="delete"
                            >
                                <Delete />
                            </IconButton>
                            <IconButton
                                // onClick={() => setToBeDeletedMarker(true)}
                                edge="end"
                                aria-label="edit"
                            >
                                <Edit />
                            </IconButton>
                        </ListItem>
                        <Divider variant="inset" component="hr" />
                        {marker.id && toBeDeletedMarkers[marker.id] && (
                            <>
                                <DeleteMarkerModal
                                    key={marker.id}
                                    isOpen={toBeDeletedMarkers[marker.id]}
                                    onCancel={() =>
                                        setToBeDeletedMarkers(prevState => ({
                                            ...prevState,
                                            [marker.id as string]: false,
                                        }))
                                    }
                                    onClick={() => {
                                        marker.id &&
                                            deleteUserMarkers(marker.id)
                                        setToBeDeletedMarkers(prevState => ({
                                            ...prevState,
                                            [marker.id as string]: false,
                                        }))
                                    }}
                                />
                            </>
                        )}
                    </React.Fragment>
                ))}
            </MainContainer>
            <SimpleBottomNavigation />
        </>
    )
}

export default Profile
