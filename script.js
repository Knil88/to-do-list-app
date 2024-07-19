

//Operazioni iniziali

const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyMessage = document.querySelector('.empty-message-list')
const resetList = document.getElementById('reset');
const STORAGE_KEY = 'todo'


// Preparazione array di attività

let activities = [];

const storage = localStorage.getItem(STORAGE_KEY)

if (storage) {
    activities = JSON.parse(storage)
}

showContent();

// Evento Click per aggiungere attività

button.addEventListener('click', function () {
    const newActivity = inputField.value.trim();
    if (newActivity.length < 3 || newActivity == '') {
        let errorMessage = emptyMessage;
        errorMessage.innerHTML = `<p id="error">Attività troppo corta o nulla</p>`
        setTimeout(() => {
            const errorElement = document.getElementById('error');
            if (errorElement) {

                errorElement.remove();
                showContent();
            }
            else {
                showContent();
            }
        }, 5000);
    }
    else {
        addActivity(newActivity)
    }

})

resetList.addEventListener('click', function () {

    activities = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    showContent();
});




// Funzioni

function showContent() {
    todoList.innerText = ''
    emptyMessage.innerText = ''

    if (activities.length > 0) {
        activities.forEach(function (activity, index) {

            todoList.innerHTML +=
                `
                 <li class="todo-item">
                    <div class="todo-check">
                        <img src="./images/check.svg" alt="">
                    </div>
                    <p class="todo-text"><span class="activity-color">Attività ${index + 1} :</span> ${activity}</p>
                </li>
                ` });
        makeChecksClickable()
    } else {
        emptyMessage.innerText = 'Al momento non hai attività da svolgere'
    }
}

function makeChecksClickable() {
    const checks = document.querySelectorAll('.todo-check');
    checks.forEach(function (check, index) {
        check.addEventListener('click', function () {
            const controll = window.confirm('Vuoi confermare?');
            if (controll) {
                activities.splice(index, 1);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
            }
            showContent();
        });
    });
}


function addActivity(newActivity) {
    activities.push(newActivity)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    showContent();
    inputField.value = ''
}




