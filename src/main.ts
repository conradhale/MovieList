// Copyright (c) 2023 Conrad Hale

import 'vite/modulepreload-polyfill'
import './styles/main.scss'
import './custom_bootstrap'
import setupCookieAlert from './cookie_alert'
import setupConfirmDeleteModal from './confirm_delete'
import setupThemeSwitcher from './theme_switcher'

const button = document.querySelector<HTMLButtonElement>(
    '#cookie-alert button[data-cookie-string]'
)

const modal = document.getElementById('confirm-delete')

button && setupCookieAlert(button)
modal && setupConfirmDeleteModal(modal)

document.querySelectorAll<HTMLButtonElement>('[data-theme-pref]')

setupThemeSwitcher()
