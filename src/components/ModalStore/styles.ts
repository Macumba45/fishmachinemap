import { Button, TextField, Typography } from '@mui/material'
import styled from 'styled-components'

export const ModalWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`

export const ModalContent = styled.div`
    background-color: #ffffff;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    padding: 24px;
    border-radius: 8px;
    max-width: 400px;
    width: 90%;
    text-align: center;
`

export const ModalTitle = styled(Typography)`
    margin-bottom: 16px;
`

export const StyledTextField = styled(TextField)`
    margin-bottom: 16px;
`

export const StyledButton = styled(Button)`
    margin-top: 16px;
    margin-right: 1rem;
`
