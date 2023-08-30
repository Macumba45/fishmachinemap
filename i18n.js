module.exports = {
    locales: ['en', 'es'],
    defaultLocale: 'es',
    pages: {
        '*': ['common'],
        '/': ['common'], // app/page.tsx
        '/auth/login': ['common'], // app/auth/login/page.tsx
        '/auth/signup': ['common'], // app/auth/signup/page.tsx
        '/checkout': ['checkout'], // app/checkout/page.tsx
    },
    pagesInDir:{
        
    }
}