 let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

function agregar() {
    let input = document.getElementById('tarea');
    if(input.value.trim()!== '') {
        tareas.push({texto: input.value, hecha: false});
        input.value = '';
        guardarYMostrar();
    }
}

function guardarYMostrar() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
    let lista = document.getElementById('lista');
    lista.innerHTML = '';
    tareas.forEach((t, i) => {
        lista.innerHTML += `<li class="${t.hecha? 'completada' : ''}" onclick="toggle(${i})">${t.texto} <button onclick="borrar(${i}); event.stopPropagation()">X</button></li>`;
    });
    document.getElementById('contador').innerText = `Te quedan ${tareas.filter(t =>!t.hecha).length} tareas`;
}

function toggle(i) {
    tareas[i].hecha =!tareas[i].hecha;
    guardarYMostrar();
}

function borrar(i) {
    tareas.splice(i, 1);
    guardarYMostrar();
}

function cambiarModo() {
    document.body.classList.toggle('dark');
}

guardarYMostrar();
