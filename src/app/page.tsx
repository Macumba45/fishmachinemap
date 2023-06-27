import Link from 'next/link'
import Login from './auth/login/page'
import Signup from './auth/signup/page'

export default function Home() {
    return (
        <>
            <Link href="/auth/login">LOGIN</Link>
            <Link href="/auth/signup">SIGNUP</Link>
            <Link href="/map">MAPAS</Link>
        </>
    )
}
