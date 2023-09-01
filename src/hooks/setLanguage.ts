import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export default function useSetLanguage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (locale: string) => {
    // now you got a read/write object
    const current = new URLSearchParams(Array.from(searchParams!.entries())) // -> has to use this form
    console.log(current.get('lang')) // -> 'en'
    console.log(current.has('lang')) // -> true
    current.set('lang', locale)

    // cast to string
    const search = current.toString()
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }
}
