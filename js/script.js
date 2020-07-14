let arrayListado = [];
leerContactos();

function nuevoContacto() {
    let arrayContacto = [];

    let nombre = document.getElementById('inputNombre').value;
    let telefono = document.getElementById('inputTelefono').value;

    if (document.getElementById('inputNombre').value.length > 3 && document.getElementById('inputTelefono').value.length > 9) {
        arrayContacto.push(nombre);
        arrayContacto.push(telefono);
        arrayListado.push(arrayContacto);

        //agregar al localstorage...
        localStorage.setItem("contactos", JSON.stringify(arrayListado));

        //borro los input...
        document.getElementById('inputNombre').value = "";
        document.getElementById('inputTelefono').value = "";
        console.log(arrayListado);
    } else {
        alert('Completar con datos validos');
    };

    leerContactos();
};

function leerContactos() {
    if (localStorage.length > 0) {
        let ulContactos = document.getElementById('listaContactos');
        let _arrayContacto = JSON.parse(localStorage.getItem("contactos"));
        let codHTML = "";

        borrarItems();

        for (let i in _arrayContacto) {
            codHTML = `
            <li class="list-group-item d-flex justify-content-around pt-4" id="${i}">
            <div id="orden${i}">${i}-</div>
            <div id="nombre">${_arrayContacto[i][0]}</div>
            <div id="telefono">${_arrayContacto[i][1]}</div>
            <button class="btn bg-light text-secondary" onclick="itemSeleccionado(${i})"><i class="fas fa-trash-alt"></i></button>
        </li>`;
            ulContactos.innerHTML += codHTML;
        };
        if (arrayListado.length == 0) {
            arrayListado = _arrayContacto;
        };
    };
};

function borrarItems(){
    let ulContactos = document.getElementById('listaContactos');
    if(ulContactos.children.length > 0){
        while(ulContactos.firstChild){
            ulContactos.removeChild(ulContactos.firstChild);
        }
    }
};

function allClean(){
    localStorage.clear();
    arrayListado = [];
    borrarItems();
};

function itemSeleccionado(i){
    //reconozco la posicion del item seleccionado
    console.log("item seleccionado " + i);

    //borro el item del arreglo
    arrayListado.splice(i, 1);

    //actualizar el localstorage
    localStorage.setItem('contactos', JSON.stringify(arrayListado));

    //dibujar de vuelta en pantalla
    leerContactos();
};