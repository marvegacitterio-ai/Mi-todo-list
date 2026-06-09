let input = document.getElementById('tarea');
let lista = document.getElementById('lista');

function agregar() {
  if(input.value!= '') {
    crearTarea(input.value);
    input.value = '';
    guardarTareas();
  }
}

function crearTarea(texto) {
  let li = document.createElement('li');
  li.textContent = texto;

  let btnBorrar = document.createElement('button');
  btnBorrar.textContent = 'X';
  btnBorrar.style.marginLeft = '10px';
  btnBorrar.style.background = 'red';
  btnBorrar.style.color = 'white';
  btnBorrar.style.border = 'none';
  btnBorrar.style.cursor = 'pointer';

  btnBorrar.onclick = function(e) {
    e.stopPropagation();
    lista.removeChild(li);
    actualizarContador();
    guardarTareas();
  }

  li.addEventListener('click', function(e) {
    if(e.target.tagName!== 'BUTTON') {
      li.classList.toggle('tachada');
      guardarTareas();
    }
  });

  li.appendChild(btnBorrar);
  lista.appendChild(li);
  actualizarContador();
}

function guardarTareas() {
  localStorage.setItem('tareas', lista.innerHTML);
}

function actualizarContador() {
  let tareas = document.querySelectorAll('#lista li').length;
  document.getElementById('contador').textContent = `Te quedan ${tareas} tareas`;
}

function cambiarModo() {
  document.body.classList.toggle('modo-claro');
}

// Cargar tareas guardadas y reconectar botones
function cargarTareas() {
  lista.innerHTML = localStorage.getItem('tareas') || '';
  let items = lista.querySelectorAll('li');
  items.forEach(li => {
    let texto = li.childNodes[0].textContent;
    lista.removeChild(li);
    crearTarea(texto);
    if(li.classList.contains('tachada')) {
      lista.lastChild.classList.add('tachada');
    }
  });
}

cargarTareas();