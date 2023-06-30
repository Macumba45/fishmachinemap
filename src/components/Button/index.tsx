import { FC, memo } from 'react'
import { MainContainer } from './style'
import { Button } from '@mui/material'
import { Props } from './type'

const ButtonComp: FC<Props> = ({
    title,
    icon,
    bgColor,
    marginBottom,
    border,
    href,
    style,
    variant,
    color,
    fontFamily,
    children,
    onClick,
}) => {
    const ButtonStyles = {
        backgroundColor: bgColor || 'transparent',
        color: color || '#00b1f6',
        marginBottom: marginBottom || '1rem',
        marginLeft: '1rem',
        marginRight: '1rem',
        border: border || 'none',
        fontSize: '0.9rem',
        width: '250px',
        cursor: 'pointer',
        opacity: 1,
        fontFamily: fontFamily,
    }

    return (
        <MainContainer>
            <Button
                target="blank"
                style={style || ButtonStyles}
                href={href || ''} // Proporciona un valor predeterminado en caso de que href sea undefined
                onClick={onClick}
                variant={variant as 'text' | 'outlined' | 'contained'} // Añadir el tipo correcto para la prop variant
            >
                {icon}
                {title}
            </Button>
            {children} {/* Renderiza los elementos hijos */}
        </MainContainer>
    )
}

export default memo(ButtonComp)
