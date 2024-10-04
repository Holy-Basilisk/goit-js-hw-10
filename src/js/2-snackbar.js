import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form')

form.addEventListener('submit', createNotif)

function createNotif(event) {
    event.preventDefault()
    const delay = event.target.elements.delay.value;
    const state = event.target.elements.state.value;
    form.reset()

    createPromise(state, delay)
        .then((delay) => iziToast.show({
            class: 'toast-message',
            message: `✅ Fulfilled promise in ${delay}ms`,
            messageColor: '#fff',
            backgroundColor: '#59A10D',
            border: '2px solid #B5EA7C',
            position: 'topRight',
        }))
        .catch((delay) => iziToast.show({
            class: 'toast-message',
            message: `❌ Rejected promise in ${delay}ms`,
            messageColor: '#fff',
            backgroundColor: '#EF4040',
            border: '2px solid #FFBEBE',
            position: 'topRight',
        }));
}

function createPromise(state, delay) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay)
            } else {
                reject(delay)
            }
        }, delay)
    })
}