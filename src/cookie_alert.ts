// Copyright (c) 2023 Conrad Hale

const setUpCookieAlert = () => {
    const button = document.querySelector<HTMLButtonElement>(
        '#cookie-alert button[data-cookie-string]'
    )
    button?.addEventListener('click', () => {
        const cookie = button.getAttribute('data-cookie-string')
        cookie && (document.cookie = cookie)
    })
}

export default setUpCookieAlert
