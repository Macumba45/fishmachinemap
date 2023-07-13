export const getAuthenticatedToken = () => {
    if (typeof window !== 'undefined') {
        try {
            const token = window.localStorage.getItem('token');
            return token ? token : null;
        } catch (error) {
            console.log(error);
        }
    }
    return null;
};

export const setAuthenticatedToken = (token: string) => {
    window.localStorage.setItem('token', token)
}
