// Copyright (c) 2023 Conrad Hale

import Modal from 'bootstrap/js/dist/modal'

const setupConfirmDeleteModal = (modal: Element) => {
    const onShow = (event: Modal.Event) => {
        const button = event.relatedTarget

        const modalBody = modal.querySelector<HTMLDivElement>('.modal-body')

        if (modalBody) {
            const movie = button?.getAttribute('data-movie')
            const year = button?.getAttribute('data-year')
            modalBody.innerHTML = `Are you sure you want to delete <span class="fw-semibold">${movie} (${year})</span>?`
        }

        const confirmButton = modal.querySelector('#confirm-button')

        const deleteURL = button?.getAttribute('data-url')

        if (deleteURL)
            confirmButton?.addEventListener('click', () =>
                fetch(deleteURL, { method: 'DELETE' }).then(() =>
                    location.replace(location.href)
                )
            )
    }
    modal.addEventListener('show.bs.modal', onShow)
}

export default setupConfirmDeleteModal
