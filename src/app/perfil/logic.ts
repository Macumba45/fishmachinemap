import { User } from "next-auth"
import { useState } from "react"
import { getAuthenticatedToken } from "../lib/storage/storage"

export const useLogicUser = () => {

    const [user, setUser] = useState<User | null>(null)

    const getUser = async () => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/user/user', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setUser(data.user);
            console.log('data:', data);
            return response;
        }
    }

    return {
        user,
        getUser
    }
}
