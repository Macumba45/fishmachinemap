import React, { FC, useEffect, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { feedUseLogic } from '@/app/feed/logic'
import { Comments } from '@/app/maps/type'
import { Container } from './styles'
import { Delete } from '@mui/icons-material'
import { getAuthenticatedToken } from '@/lib/storage/storage'
import {
    TextField,
    Button,
    Typography,
    Avatar,
    Grid,
    Modal,
    Paper,
    IconButton,
} from '@mui/material'

interface CommentSectionProps {
    comments: Comments[]
    setComments: (comments: Comments[]) => void
    newComment: string
    setNewComment: (comment: string) => void
    onCommentSubmit: () => void
    onDeleteComment: (commentId: string) => void
    disabled?: boolean
}

const CommentSection: FC<CommentSectionProps> = ({
    comments,
    newComment,
    setNewComment,
    onCommentSubmit,
    onDeleteComment,
    disabled,
}) => {
    const token = getAuthenticatedToken()
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : ''
    const handleCommentChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewComment(event.target.value)
    }

    const [isLogged, setIsLogged] = useState(false)
    const textButton = isLogged ? 'Comentar' : 'Inicia sesión para comentar'

    useEffect(() => {
        if (!token) {
            setIsLogged(false)
            // router.push('/auth/login'); // Redirige al usuario a la página de inicio de sesión si no hay token
        } else {
            setIsLogged(true)
        }
    }, [])

    return (
        <div>
            {comments.map((comment, index) => (
                <Grid
                    padding={0}
                    container
                    spacing={1}
                    alignItems="center"
                    key={index}
                    margin={1}
                    flexWrap={'nowrap'}
                >
                    <Grid
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '0px',
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 30,
                                height: 30,
                                paddingLeft: '0px',
                                marginRight: 1.5,
                            }}
                            alt="User Avatar"
                            src={comment.user?.picture}
                        />
                    </Grid>
                    <Grid>
                        <Typography
                            sx={{ fontSize: '0.7rem', fontWeight: 100 }}
                        >
                            {comment.user?.name}
                        </Typography>
                        <Typography
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                wordWrap: 'break-word',
                            }}
                            variant="body2"
                        >
                            {comment.text}
                            <IconButton
                                onClick={() => {
                                    if (comment.user?.id === userId) {
                                        onDeleteComment(comment.id as string)
                                    }
                                }}
                                sx={{ paddingTop: 0, paddingBottom: 0 }}
                                disabled={comment.user?.id !== userId} // Deshabilitar el botón si no es el usuario logueado
                            >
                                <Delete
                                    sx={{
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        paddingTop: 0,
                                        display:
                                            comment.user?.id !== userId
                                                ? 'none'
                                                : 'flex', // Cambiar el color si está deshabilitado
                                    }}
                                />
                            </IconButton>
                        </Typography>
                    </Grid>
                </Grid>
            ))}
            <Container>
                <TextField
                    label="Deja un comentario"
                    multiline
                    rows={2}
                    value={newComment}
                    onChange={handleCommentChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{
                        marginBottom: '1rem',
                        display: isLogged ? 'flex' : 'none',
                    }}
                />
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#49007a', color: 'white' }}
                    onClick={onCommentSubmit}
                    endIcon={<CheckIcon />}
                    disabled={!isLogged}
                >
                    {textButton}
                </Button>
            </Container>
        </div>
    )
}

interface CommentModalProps {
    open: boolean
    onClose?: () => void
    id: string
    updateComments?: (comments: Comments[]) => void
}

const CommentModal: FC<CommentModalProps> = ({
    open,
    onClose,
    id,
    updateComments,
}) => {
    const { addComment, getAllComments, allComents, deleteCommentUser } =
        feedUseLogic()
    const [comments, setComments] = useState<Comments[]>([])
    const [newComment, setNewComment] = useState<string>('')

    const handleCommentSubmit = async () => {
        if (newComment.trim() !== '') {
            await addComment(newComment, id)
            const updatedComments = await getAllComments(id)
            setComments(updatedComments)
            setNewComment('')
        }
    }

    useEffect(() => {
        if (open) {
            getAllComments(id).then(updatedComments => {
                setComments(updatedComments)
            })
        }
    }, [open])

    return (
        <Modal sx={{ outline: 'none' }} open={open} onClose={onClose}>
            <Paper
                sx={{
                    p: 2,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    maxHeight: '500px', // Ajusta la altura del modal según tus necesidades
                    overflow: 'auto', // Agrega el scroll al modal
                    outline: 'none',
                }}
            >
                <Typography
                    sx={{ marginLeft: 1, marginBottom: 1 }}
                    variant="h6"
                >
                    Comentarios
                </Typography>
                <CommentSection
                    comments={allComents}
                    setComments={updateComments || setComments}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    onCommentSubmit={handleCommentSubmit}
                    onDeleteComment={deleteCommentUser}
                />
            </Paper>
        </Modal>
    )
}

export default CommentModal
