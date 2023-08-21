export function isAuth(): boolean {
    const token = localStorage.getItem('token')
    if (token) {
        return true
    }
    return false
}
