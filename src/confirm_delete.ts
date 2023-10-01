// Copyright (c) 2023 Conrad Hale

import Modal from 'bootstrap/js/dist/modal'

const setUpConfirmDelete = () => {
    const modal = document.querySelector('#confirm-delete')

    if (!modal) {
        return
    }

    let deleteURL: string | null | undefined = null

    const onShow = (event: Modal.Event) => {
        const button = event.relatedTarget
        const modalBody = modal.querySelector<HTMLDivElement>('.modal-body')

        if (!button || !modalBody) {
            return
        }

        deleteURL = button?.getAttribute('data-url')

        const movie = button?.getAttribute('data-movie')
        const year = button?.getAttribute('data-year')
        modalBody.innerHTML = `Are you sure you want to delete <span class="fw-semibold">${movie} (${year})</span>?`
    }

    modal.addEventListener('show.bs.modal', onShow)

    const confirmButton =
        modal.querySelector<HTMLButtonElement>('#confirm-button')

    confirmButton?.addEventListener('click', async () => {
        if (deleteURL) {
            const reload = () => location.replace(location.href)
            await fetch(deleteURL, { method: 'DELETE' }).finally(reload)
        }
    })
}

export default setUpConfirmDelete
