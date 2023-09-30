// Copyright (c) 2023 Conrad Hale

const setupCookieAlert = (button: HTMLButtonElement) => {
    const getCookie = (event: MouseEvent) => {
        const button = event.currentTarget as Element | null
        const cookie = button?.getAttribute('data-cookie-string')
        cookie && (document.cookie = cookie)
    }

    button.addEventListener('click', getCookie)
}

export default setupCookieAlert
