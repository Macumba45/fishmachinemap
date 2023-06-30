'use client'

import { FC, memo } from 'react'
import { CardContainer, MainContainer } from './style'
import SimpleBottomNavigation from '@/components/BottomNav'
import CardList from '@/components/CardList'
import { shopsListID } from './data'

const List: FC = () => {
    return (
        <>
            <MainContainer>
                {shopsListID.map(
                    ({
                        id,
                        title,
                        description,
                        image,
                        titleImage,
                        city,
                        address,
                    }) => (
                        <CardContainer
                            key={id}
                        >
                            <CardList
                                id={id}
                                title={title}
                                description={description}
                                image={image}
                                titleImage={titleImage}
                                city={city}
                                address={address}
                            />
                        </CardContainer>
                    )
                )}

                <SimpleBottomNavigation />
            </MainContainer>
        </>
    )
}

export default memo(List)
