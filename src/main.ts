// Copyright (c) 2023 Conrad Hale

import 'vite/modulepreload-polyfill'
import './styles/main.scss'
import './bs_imports'
import setUpThemeSwitcher from './theme_switcher'
import setUpCookieAlert from './cookie_alert'
import setUpConfirmDelete from './confirm_delete'

setUpThemeSwitcher()
setUpCookieAlert()
setUpConfirmDelete()
