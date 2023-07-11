export const getAuthenticatedToken = () => {
    try {
        const token = window.localStorage.getItem('token')
        return token ? token : null
    } catch (error) {
        console.log(error)
    }
}
export const setAuthenticatedToken = (token: string) => {
    window.localStorage.setItem('token', token)
}
