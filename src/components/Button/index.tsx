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
    disabled,
    type,
    id,
    width,
}) => {
    const ButtonStyles = {
        backgroundColor: bgColor || 'transparent',
        color: color || '#00b1f6',
        marginBottom: marginBottom || '0rem',
        marginLeft: '1rem',
        marginRight: '1rem',
        border: border || 'none',
        fontSize: '0.9rem',
        width: '250px' || width,
        cursor: 'pointer',
        opacity: 1,
        fontFamily: fontFamily,
        marginTop: '1rem',
    }

    return (
        <MainContainer>
            <Button
                id={id}
                target="blank"
                style={style || ButtonStyles}
                href={href || ''} // Proporciona un valor predeterminado en caso de que href sea undefined
                onClick={onClick}
                variant={variant as 'text' | 'outlined' | 'contained'} // Añadir el tipo correcto para la prop variant
                disabled={disabled}
                type={type}
            >
                {icon}
                {title}
            </Button>
            {children} {/* Renderiza los elementos hijos */}
        </MainContainer>
    )
}

export default memo(ButtonComp)
