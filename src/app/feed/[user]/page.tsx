'use client'

import { FC, useEffect } from 'react'
import { feedUseLogic } from '../logic'

interface Props {
    params: {
        user: string
    }
}

const Page: FC<Props> = ({ params }) => {
    const { userInfoFeed, dataFeedUser } = feedUseLogic()

    useEffect(() => {
        userInfoFeed(params.user)
    }, [params.user])

    console.log(dataFeedUser)

    return (
        <div>
            {/* Renderizar el perfil del usuario */}
            <h1>Perfil del usuario con ID:{params.user}</h1>
        </div>
    )
}

export default Page
