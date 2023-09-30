// Copyright (c) 2023 Conrad Hale

import 'vite/modulepreload-polyfill'
import './styles/main.scss'
import './custom_bootstrap'
import setupCookieAlert from './cookie_alert'
import setupConfirmDeleteModal from './confirm_delete'

const button = document.querySelector<HTMLButtonElement>(
    '#cookieAlert button[data-cookie-string]'
)

const modal = document.getElementById('confirmDeleteModal')

button && setupCookieAlert(button)
modal && setupConfirmDeleteModal(modal)
