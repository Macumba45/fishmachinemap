'use client'

import { FC, memo, useEffect, useState } from 'react'
import { useLogicStore } from '../logic'

interface Props {
    params: {
        storeId: string
    }
}

const Page: FC<Props> = ({ params }) => {
    const { getProductId, storeId } = useLogicStore()

    console.log(storeId)

    useEffect(() => {
        getProductId(params.storeId)
    }, [])
    return (
        <>
            <div>{params.storeId}</div>
        </>
    )
}

export default memo(Page)
