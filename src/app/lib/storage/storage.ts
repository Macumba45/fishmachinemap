export const getAuthenticatedToken = () => {
    if (typeof window !== 'undefined') {
        try {
            const token = window.localStorage.getItem('token')
            return token
        } catch (error) {
            console.log(error)
        }
    }
}

export const setAuthenticatedToken = (token: string) => {
    window.localStorage.setItem('token', token)
}
