let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let list = document.querySelector('.task');
let reset = document.querySelector('.res')
let alltask = document.querySelectorAll('.added')
let arr = []; // array of tasks


//clicking reset
reset.addEventListener('click', () => {
    localStorage.removeItem('task');
    arr = []
    let alltask = document.querySelectorAll('.added')
    alltask.forEach(t => t.remove());
});

// Load tasks from localStorage on page load
window.onload = function() {
    getfromlocalstorage();
}

submit.onclick = function() { 
    if (input.value !== '') { 
        addinputtoarr(input.value); 
        input.value = ''; 
    }
}

input.addEventListener('keydown', function(event) {  
    if (event.key === 'Enter') {
        if (input.value !== '') { 
            addinputtoarr(input.value); 
            input.value = ''; 
        }
    }
});

function addinputtoarr(task) {
    let taskprop = {
        id: Date.now(),
        name: task,
        done: false,
    }
    arr.push(taskprop);
    addtasktolist(taskprop);   
    addtolocalstorage();
}

function addtolocalstorage(){
    window.localStorage.setItem('task', JSON.stringify(arr));
}

function getfromlocalstorage(){
    let data = window.localStorage.getItem('task')
    if (data){
        arr = JSON.parse(data);
        arr.forEach(taskprop => addtasktolist(taskprop));
    }
}

function addtasktolist(taskprop) {
    let x = document.createElement('div');
    x.className = 'added';
    x.setAttribute('data-id', taskprop.id);
    x.appendChild(document.createTextNode(taskprop.name));

    if (taskprop.done) {
        x.classList.add('done');
    }

    let y = document.createElement('div');
    y.className = 'btn';

    if (!taskprop.done) {
        let a = document.createElement('span');
        a.className = 'donee';
        a.appendChild(document.createTextNode('Done'));
        y.appendChild(a);

        a.addEventListener('click', function() {
            taskprop.done = true;
            a.remove(); // Remove the "Done" button
            x.classList.add('done'); // Mark the task as done
            addtolocalstorage(); // Update localStorage
        });
    }

    let b = document.createElement('span');
    b.className = 'delet';
    b.appendChild(document.createTextNode('Delete'));
    y.appendChild(b);

    b.addEventListener('click', function() {
        arr = arr.filter(task => task.id !== taskprop.id);
        x.remove(); // Remove the entire task
        addtolocalstorage(); // Update localStorage
    });

    x.appendChild(y);
    list.appendChild(x);
}




