const puppeteer = require('puppeteer')

;(async () => {
    // Inicia una instancia del navegador
    const browser = await puppeteer.launch()

    // Abre una nueva página
    const page = await browser.newPage()

    // Carga la extensión de Chrome para capturar solicitudes de red
    await page.goto(
        'chrome-extension://lcipembjfkmeggpihdpdgnjildgniffl/index.html'
    )

    // Navega al sitio web donde se encuentra el video
    await page.goto(
        'https://www.skylinewebcams.com/es/webcam/espana/andalucia.html'
    )

    // Espera un tiempo para asegurarte de que el video se reproduzca
    await page.waitForTimeout(10000) // Ajusta el tiempo según sea necesario

    // Captura todas las solicitudes de red
    const requests = await page.evaluate(() => {
        const requests = []
        const entries = window.performance.getEntries()
        for (const entry of entries) {
            if (entry.initiatorType === 'xmlhttprequest') {
                requests.push(entry.name)
            }
        }
        return requests
    })

    // Filtra y obtén los enlaces m3u8
    const m3u8Links = requests.filter(request => request.includes('.m3u8'))

    // Imprime los enlaces m3u8
    console.log('Enlaces m3u8:', m3u8Links)

    // Cierra el navegador
    await browser.close()
})()
