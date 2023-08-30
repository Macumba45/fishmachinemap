module.exports = {
    locales: ['en', 'es'],
    defaultLocale: 'es',
    pages: {
        '*': ['common'],
        '/': ['common'], // app/page.tsx
        '/auth/login': ['common'], // app/auth/login/page.tsx
        '/auth/signup': ['common'], // app/auth/register/page.tsx
        '/checkout': ['checkout'], // app/checkout/page.tsx
    },
}