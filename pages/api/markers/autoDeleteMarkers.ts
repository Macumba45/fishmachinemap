import { scheduleJob } from 'node-schedule';
import { prisma } from '@/lib/db'

// función para eliminar registros
async function deleteOldRecords() {
    const currentDate = new Date();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 24 horas * 60 minutos * 60 segundos * 1000 milisegundos
    console.log('currentDate', currentDate);
    // Calcula el valor en milisegundos para restar un día
    const oneDayAgoInMilliseconds = currentDate.getTime() - oneDayInMilliseconds;

    // Crea un nuevo objeto Date utilizando el valor calculado
    const oneDayAgo = new Date(oneDayAgoInMilliseconds);

    // consulta y elimina registros que cumplen el criterio
    const recordsToDelete = await prisma.marker.findMany({
        where: {
            createdAt: {
                lt: oneDayAgo,
            },
            markerType: "algas", // Agrega esta condición

        },
    });

    for (const record of recordsToDelete) {
        await prisma.marker.delete({
            where: {
                id: record.id,
            },
        });
    }
    console.log('Registros eliminados:', recordsToDelete.length);
    console.log('Registros eliminados:', recordsToDelete);
}

// // programa la ejecución de la función una vez al día
// scheduleJob('0 0 * * *', () => {
//     deleteOldRecords();
// });

// programa la ejecución de la función cada minuto
scheduleJob('*/1 * * * *', () => {
    deleteOldRecords();
});