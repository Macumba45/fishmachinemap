'use client'

import { FC } from 'react'
import { useTranslations } from 'next-intl'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { MainContainer } from './style'
import { MarkerType } from '@/app/[locale]/maps/type'
import customMarkerIcon from '../../assets/anzuelo.png'
import customMarkerIconShop from '../../assets/tienda.png'
import customMarkerIconPlace from '../../assets/destino.png'
import customMarkerIconPicture from '../../assets/back-camera.png'
import customMarkerIconLikes from '../../assets/likes.png'
import customMarkerIconAll from '../../assets/all.png'
import { ListItemIcon } from '@mui/material'

type FilterComponentProps = {
    onChange: (newFilter: MarkerType) => void
    selectedFilter: MarkerType
    open: boolean
    onClose?: () => void
}

const FilterComponent: FC<FilterComponentProps> = ({
    onChange,
    selectedFilter,
    open,
    onClose,
}) => {
    const t = useTranslations('FilterComponent')

    const handleFilterChange = (event: any) => {
        const newFilter = event.target.value as MarkerType
        onChange(newFilter)
        onClose && onClose()
    }

    return (
        <MainContainer>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle sx={{ textAlign: 'center' }}>
                    Filtra Marcadores
                </DialogTitle>
                <DialogContent
                    sx={{
                        padding: '10px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel sx={{ height: '100px' }} id="filter-label">
                            Filtrar
                        </InputLabel>
                        <Select
                            labelId="filter-label"
                            value={selectedFilter}
                            onChange={handleFilterChange}
                            label="Filtrar"
                        >
                            <MenuItem value="all">
                                <ListItemIcon
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'black',
                                    }}
                                >
                                    <img
                                        style={{ width: 30, paddingRight: 15 }}
                                        src={customMarkerIconAll.src}
                                        alt="Anzuelo"
                                    />
                                    {t('all')}
                                </ListItemIcon>
                            </MenuItem>
                            <MenuItem value="spot">
                                <ListItemIcon
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'black',
                                    }}
                                >
                                    <img
                                        style={{ width: 30, paddingRight: 15 }}
                                        src={customMarkerIconPlace.src}
                                        alt="Destino"
                                    />
                                    {t('spots')}
                                </ListItemIcon>
                            </MenuItem>
                            <MenuItem value="tienda">
                                <ListItemIcon
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'black',
                                    }}
                                >
                                    <img
                                        style={{ width: 30, paddingRight: 15 }}
                                        src={customMarkerIconShop.src}
                                        alt="Tienda"
                                    />
                                    {t('stores')}
                                </ListItemIcon>
                            </MenuItem>
                            <MenuItem value="cebos">
                                <ListItemIcon
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'black',
                                    }}
                                >
                                    <img
                                        style={{ width: 30, paddingRight: 15 }}
                                        src={customMarkerIcon.src}
                                        alt="Anzuelo"
                                    />
                                    {t('cebos')}
                                </ListItemIcon>
                            </MenuItem>
                            <MenuItem value="fotos">
                                <ListItemIcon
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'black',
                                    }}
                                >
                                    <img
                                        style={{ width: 30, paddingRight: 15 }}
                                        src={customMarkerIconPicture.src}
                                        alt="Cámara"
                                    />
                                    {t('pictures')}
                                </ListItemIcon>
                            </MenuItem>
                            <MenuItem value="likes">
                                <ListItemIcon
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'black',
                                    }}
                                >
                                    <img
                                        style={{ width: 30, paddingRight: 15 }}
                                        src={customMarkerIconLikes.src}
                                        alt="Likes"
                                    />
                                    {t('likes')}
                                </ListItemIcon>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
            </Dialog>
        </MainContainer>
    )
}

export default FilterComponent
