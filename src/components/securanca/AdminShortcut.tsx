'use client'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminShortcut() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.shiftKey && e.code === 'Delete') {
        let newPath = ''
        const arrayNaoTemAdmin = ['/autenticar/cadastrar', '/autenticar/entrar']
        if (pathname.startsWith('/admin') || arrayNaoTemAdmin.includes(pathname)) {
          newPath = pathname.replace(/^\/admin/, '')
          if (newPath === '') newPath = '/'
        } else {
          newPath = `/admin${pathname}`
        }
        if (newPath !== pathname) {
          router.push(newPath)
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [pathname, router])
  return null
}
