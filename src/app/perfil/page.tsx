'use client'

import { FC, useEffect, useState } from 'react'
import {
    Container,
    ContainerData,
    MainContainer,
    UserContainerData,
} from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import { useLogicUser } from './logic'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import RoomIcon from '@mui/icons-material/Room'
import { ProfileProps } from './type'
import AccountMenu from '@/components/Menu'

const Profile: FC = () => {
    const { user, userMarkers, getUser, getUserMarkers } = useLogicUser()
    const [userMarkersSorted, setUserMarkersSorted] = useState<any>([])

    console.log(userMarkers)
    console.log(user)

    useEffect(() => {
        getUser()
        getUserMarkers()
    }, [])

    // Ordenar los marcadores por fecha (nuevos primero)
    useEffect(() => {
        const sortedMarkers = [...userMarkers].sort((a, b) => {
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
        })
        setUserMarkersSorted(sortedMarkers)
    }, [userMarkers])

    return (
        <>
            <AccountMenu />

            <MainContainer>
                <UserContainerData>
                    <Avatar
                        sx={{ width: 100, height: 100, marginTop: '2rem' }}
                    />
                    <Typography
                        sx={{
                            color: 'white',
                            marginTop: '1rem',
                            fontFamily: 'Roboto',
                            textAlign: 'center',
                            fontSize: '1.5rem',
                            fontWeight: '400',
                        }}
                        variant="h6"
                        gutterBottom
                    >
                        {user?.name}
                    </Typography>
                    <Typography
                        sx={{
                            color: 'white',
                            marginTop: '0.5rem',
                            fontFamily: 'Roboto',
                            textAlign: 'center',
                            fontSize: '1rem',
                            fontWeight: '200',
                        }}
                        variant="h6"
                        gutterBottom
                    >
                        {user?.email}
                    </Typography>
                </UserContainerData>
                <div>
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

                    {userMarkersSorted.map((marker: any) => (
                        <div key={marker.id} style={{ display: 'flex' }}>
                            <Container >
                                <ContainerData>
                                    <RoomIcon />
                                    <Typography
                                        variant="body1"
                                        component="span"
                                    >
                                        {marker.direction}
                                    </Typography>
                                </ContainerData>
                                <ContainerData>
                                    <RoomIcon />
                                    <Typography
                                        variant="body1"
                                        component="span"
                                    >
                                        {marker.markerType}
                                    </Typography>
                                </ContainerData>
                            </Container>
                            <Divider />
                        </div>
                    ))}
                </div>
            </MainContainer>
            <SimpleBottomNavigation />
        </>
    )
}

export default Profile
