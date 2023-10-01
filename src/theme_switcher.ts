// Copyright (c) 2023 Conrad Hale

// Based on https://getbootstrap.com/docs/5.3/customize/color-modes/#javascript
// Licensed under the Creative Commons Attribution 3.0 Unported License.

const prefDarkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

const getThemePref = (): string =>
    localStorage.getItem('theme') ??
    (prefDarkMediaQuery.matches ? 'dark' : 'light')

const setTheme = (theme: string) => {
    if (theme === 'auto') theme = prefDarkMediaQuery.matches ? 'dark' : 'light'

    document.documentElement.setAttribute('data-bs-theme', theme)
}

const showActiveTheme = (theme: string, focus: boolean = false) => {
    const themeSwitcher = document.querySelector('#theme-switcher')

    if (!themeSwitcher) {
        return
    }

    const activeThemeIcon =
        themeSwitcher.querySelector<SVGElement>('#theme-icon use')

    const activeBtn = themeSwitcher.querySelector<HTMLButtonElement>(
        `[data-theme-pref="${theme}"]`
    )

    const themeSwitcherBtn = themeSwitcher.querySelector<HTMLButtonElement>(
        'button.dropdown-toggle'
    )

    const activeBtnIcon = activeBtn
        ?.querySelector<SVGElement>('svg use')
        ?.getAttribute('href')

    if (!activeBtn || !activeThemeIcon || !activeBtnIcon || !themeSwitcherBtn) {
        return
    }

    for (const element of themeSwitcher.querySelectorAll<HTMLButtonElement>(
        'button[data-theme-pref]'
    )) {
        element.classList.remove('active')
        element.setAttribute('aria-pressed', 'false')
    }

    activeBtn.classList.add('active')
    activeBtn.setAttribute('aria-pressed', 'true')
    activeThemeIcon.setAttribute('href', activeBtnIcon)

    if (focus) {
        themeSwitcherBtn.focus()
    }
}

const onThemeChange = () => {
    const storedTheme = localStorage.getItem('theme')
    if (!storedTheme || storedTheme == 'auto') {
        setTheme(getThemePref())
    }
}

const onClicked = (event: MouseEvent) => {
    const button = event.currentTarget as HTMLButtonElement | null
    const theme = button?.getAttribute('data-theme-pref')

    if (!theme) {
        return
    }

    localStorage.setItem('theme', theme)
    setTheme(theme)
    showActiveTheme(theme, true)
}

document.addEventListener('DOMContentLoaded', () => {
    setTheme(getThemePref())

    prefDarkMediaQuery.addEventListener('change', onThemeChange)

    showActiveTheme(getThemePref())

    const toggles = document.querySelectorAll<HTMLButtonElement>(
        'button[data-theme-pref]'
    )

    for (const toggle of toggles) {
        toggle.addEventListener('click', onClicked)
    }
})

const setUpThemeSwitcher = () => {
    setTheme(getThemePref())

    prefDarkMediaQuery.addEventListener('change', onThemeChange)

    showActiveTheme(getThemePref())

    const toggles = document.querySelectorAll<HTMLButtonElement>(
        'button[data-theme-pref]'
    )

    for (const toggle of toggles) {
        toggle.addEventListener('click', onClicked)
    }
}

export default setUpThemeSwitcher
