'use client'

import { FC, useEffect } from 'react'
import { MainContainer, UserContainerData, emailStyles, nameStyles } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import { useLogicUser } from './logic'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import AccountMenu from '@/components/Menu'
import { IconButton, ListItemAvatar, Modal } from '@mui/material'
import { UserMarker } from '../maps/type'
import { Delete } from '@mui/icons-material'
import React from 'react'
import DeleteMarkerModal from '@/components/DeletedModalMarker'
import ButtonComp from '@/components/Button'

const Profile: FC = () => {
    const {
        user,
        userMarkers,
        getUser,
        getUserMarkers,
        deleteUserMarkers,
        setToBeDeletedMarker,
        toBeDeletedMarker,
    } = useLogicUser()

    const noMarkers = userMarkers.length === 0

    useEffect(() => {
        getUser()
        getUserMarkers()
    }, [])

    useEffect(() => {
        if (toBeDeletedMarker === false) {
            getUserMarkers()
        }
    }, [toBeDeletedMarker])

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
                            ...nameStyles
                        }}

                        variant="h6"
                        gutterBottom
                    >
                        {user?.name}
                    </Typography>
                    <Typography
                        style={{
                            textAlign: 'center',
                            ...emailStyles

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
                            title='Añade tu primer marcador'
                            variant='contained'
                            color='#49007a'
                            style={{ marginTop: '2rem', backgroundColor: '#49007a' }}
                            onClick={goToMaps}
                        />
                    </>
                )
                }
                {userMarkers.map((marker: UserMarker) => (
                    <React.Fragment key={marker.id}>
                        <ListItem sx={{ width: '80%' }} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar
                                    alt="Remy Sharp"
                                // src="/static/images/avatar/1.jpg"
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={marker.direction}
                                secondary={
                                    <>
                                        <Typography
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {marker.markerType
                                                .charAt(0)
                                                .toUpperCase() +
                                                marker.markerType.slice(1)}
                                        </Typography>
                                        <Typography
                                            component="p"
                                            sx={{
                                                width: '100%',
                                                wordWrap: 'break-word',
                                            }}
                                        >
                                            {marker.description}
                                        </Typography>
                                    </>
                                }
                            />
                            <IconButton
                                onClick={() => setToBeDeletedMarker(true)}
                                edge="end"
                                aria-label="delete"
                            >
                                <Delete />
                            </IconButton>
                        </ListItem>
                        <Divider variant="inset" component="hr" />
                        {toBeDeletedMarker && (
                            <>
                                <DeleteMarkerModal
                                    isOpen={!!toBeDeletedMarker}
                                    onCancel={() => setToBeDeletedMarker(false)}
                                    onClick={() =>
                                        marker.id &&
                                        deleteUserMarkers(marker.id)
                                    }
                                />
                            </>
                        )}
                    </React.Fragment>
                ))}
            </MainContainer >
            <SimpleBottomNavigation />
        </>
    )
}

export default Profile
