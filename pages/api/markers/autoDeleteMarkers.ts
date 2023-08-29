import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'

// función para eliminar registros
export default async function deleteOldRecords(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // consulta y elimina registros que cumplen el criterio
    const recordsToDelete = await prisma.marker.findMany({
        where: {
            markerType: 'algas', // Agrega esta condición
        },
    })

    for (const record of recordsToDelete) {
        await prisma.marker.delete({
            where: {
                id: record.id,
            },
        })
    }
    if (recordsToDelete.length > 0) {
        console.log('Registros eliminados:', recordsToDelete.length)
        console.log('Registros eliminados:', recordsToDelete)
        res.status(200).json({ recordsToDelete })
    } else {
        console.log('No hay registros para eliminar')
        res.status(200).json({ message: 'No hay registros para eliminar' })
    }
}
