import React, { FC, useEffect, useState } from 'react'
import {
    TextField,
    Button,
    Typography,
    Avatar,
    Grid,
    Modal,
    Paper,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { feedUseLogic } from '@/app/feed/logic'
import { Comments } from '@/app/maps/type'
import { Container } from './styles'
import { useLogicMaps } from '@/app/maps/logic'

interface CommentSectionProps {
    comments: Comments[]
    setComments: (comments: Comments[]) => void
    newComment: string
    setNewComment: (comment: string) => void
    onCommentSubmit: () => void
}

const CommentSection: FC<CommentSectionProps> = ({
    comments,
    setComments,
    newComment,
    setNewComment,
    onCommentSubmit,
}) => {
    const handleCommentChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewComment(event.target.value)
    }

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
                                marginRight: 2,
                            }}
                            alt="User Avatar"
                        />
                    </Grid>
                    <Grid>
                        <Typography
                            sx={{ fontSize: '0.7rem', fontWeight: 100 }}
                        >
                            {comment.user?.name}
                        </Typography>
                        <Typography variant="body2">{comment.text}</Typography>
                    </Grid>
                </Grid>
            ))}
            <Container>
                <TextField
                    label="Deja un comentario"
                    multiline
                    rows={1}
                    value={newComment}
                    onChange={handleCommentChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{ marginBottom: '1rem' }}
                />
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#49007a', color: 'white' }}
                    onClick={onCommentSubmit}
                    endIcon={<CheckIcon />}
                >
                    Comentar
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
    const { addComment, getAllComments, allComents } = feedUseLogic()
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
        getAllComments(id)
        setComments(allComents)
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
                />
            </Paper>
        </Modal>
    )
}

export default CommentModal
