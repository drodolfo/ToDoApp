const fecha = document.querySelector('#fecha')                                    //Referencia a ID en HTML
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id
let LIST 

//CREACION DE FECHA

const FECHA = new Date()
fecha.innerHTML=FECHA.toLocaleDateString('es-MX', {weekday:'long', month:'long', day:'numeric'})

//FUNCION AGREGAR TAREA

function agregarTarea(tarea, id, realizado, eliminado){  
  
  if (eliminado) { 
  return
}
  
  const REALIZADO = realizado ?check :uncheck             //?si es True y :si es False, asigna las variables

  const LINE = realizado ?lineThrough :''

  const elemento = `
                      <li id="elemento"> 
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                      </li>
                    `
  lista.insertAdjacentHTML("beforeend", elemento)               //Inserta al final de lista la variable elemento
}

//FUNCION TAREA REALIZADA

function tareaRealizada(element) {                              //Agrega la variable de check o uncheck al class de element
  element.classList.toggle(check)
  element.classList.toggle(uncheck)
  element.parentNode.querySelector('.text').classList.toggle(lineThrough) //Agregar a la clase el tachado
  LIST[element.id].realizado = LIST[element.id].realizado ?false :true
}

//FUNCION DE TAREA ELIMINADA

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode) //Pasa de Li a Lu, y de ahí borra el Li del cual se selcciono el ícono Trash
  LIST[element.id].eliminado = true
  console.log(LIST)
}

botonEnter.addEventListener('click', ()=> {                     //Al hacer click en botonEnter ejecuta la funcion de agregar Tareas
  const tarea = input.value
  if(tarea) {                                                   //Solo si hay algo en el input
    agregarTarea(tarea, id, false, false)
    LIST.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false
    })
  }
  localStorage.setItem('TODO', JSON.stringify(LIST))
  input.value=''                                                //Limpia el input
  id++
})

document.addEventListener('keyup', function(event){             //Al dar presionar determina tecla ejecuta la funcion agregar Tareas
  if(event.key=='Enter'){                                       //Si la tecla es "Enter"
    const tarea = input.value
    if(tarea){
      agregarTarea(tarea, id, false, false)
      LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false
      })
  localStorage.setItem('TODO', JSON.stringify(LIST))
  input.value=''
  id++
  }
}
})

lista.addEventListener('click', function(event){              //Escucha evento click en el objeto lista
  const element = event.target         
  const elementData = element.attributes.data.value           //Busca el value para ver si es realizado (circle) o eliminado (trahs)
  if (elementData=='realizado'){
    tareaRealizada(element)
  }
  else if (elementData==='eliminado'){
    tareaEliminada(element)
  }
  localStorage.setItem('TODO', JSON.stringify(LIST))
})

//LOCAL STORAGE GET ITEM

let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}

function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado)
    })
}
