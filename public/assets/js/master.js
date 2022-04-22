/**
 * @author Eric Neves
 * @version 1.0
 * @description Main file 
*/

const $openModal = document.getElementById('openModal')
const $closeModal = document.querySelector('.close a')
const boxModal   = document.querySelector('.box__modal')

/**
 * @description Ajax config
 * @param Object config
*/
async function ajax(config) {
    try {
        const request = await fetch(config.url)
        const response = await request.json()
        config.success(response)

    } catch (error) {
        config.error(error)
    }
}

/**
 * @description Open and Close the class .box__modal
*/
function eventBoxModal() {
    boxModal.classList.add('fade')
    $closeModal.onclick = () => boxModal.classList.remove('fade')
}

/**
 * @description Render data in HTML
 * @argument Object data 
*/
function renderData(data) {
    const { url, title, date, explanation, copyright = 'Nasa' } = data

    const component = `
        <div class="modal__image">
                <img src="${url}" alt="APOD">
        </div>
            
        <div class="modal__description">
            <h2>${title}</h2>
            <span class="date">${date}</span>
            
            <p>${explanation}</p>
            
            <span class="copyright">- ${copyright}</span>
        </div>
    `

    document.querySelector('.modal article')
        .insertAdjacentHTML('afterbegin', component)
}

function init() {
    $openModal.addEventListener('click', eventBoxModal)

    ajax({
        url: 'https://api.nasa.gov/planetary/apod?api_key=3AXsuVMwkt39C3DFsah6PZtGbQBuXgre46ISpntw',
        success(data) {
            renderData(data)
        },
        error(error) {
            alert('Something is wrong! :(')
        }
    })

    const currentDate = new Date()
    document.querySelector('#year')
        .insertAdjacentText('afterend', currentDate.getFullYear())
}

document.addEventListener('DOMContentLoaded', init)