tinymce.init({
    selector: '#descripcion-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });

const pokemones = []; //Definir un arreglo en javascript

const eliminar = async function() {

    let res = await Swal.fire({
        title: "Desea enviar el pokemon al profesor Oak?",
        showCancelButton: true,
        confirmButtonText: "Enviar!"
    });

    if (res.isConfirmed) {
        let nro = this.nro;
        pokemones.splice(nro,1); //el 1 indica la cantidad de elementos que se quiere eliminar
        cargarTabla();
    }else {
        Swal.fire("Operacion cancelada");
    }
    
};

const cargarTabla = ()=> {
    let tbody = document.querySelector("#poke-tbody");
    tbody.innerHTML = "";

    for (let i = 0; i < pokemones.length; i++) {
        let p = pokemones[i];

        let tr = document.createElement("tr");
        let tdNombre = document.createElement("td");
        let tdTipo = document.createElement("td");
        let tdDescripcion = document.createElement("td");
        let tdNro = document.createElement("td");
        let tdAcciones = document.createElement("td");

        tdNombre.innerText = p.nombre;

        let icono = document.createElement('i');
        if (p.tipo == 1) {
            icono.classList.add("fas","fa-tint","text-primary","fa-2x")
        } else if (p.tipo == 2) {
            icono.classList.add("fas","fa-fire","text-danger","fa-2x")
        } else if (p.tipo == 3) {
            icono.classList.add("fab","fa-envira","text-success","fa-2x")
        } else {
            icono.classList.add("fas","fa-bolt","text-warning","fa-2x")
        }

        //metodo appendChild sirve para agregar elementos hijos a la pagina
        tdTipo.classList.add("text-center");
        tdTipo.appendChild(icono);
   
        tdDescripcion.innerHTML = p.descripcion;
        tdNro.innerText = i+1;

        let boton = document.createElement("button");
        boton.nro = i; //de esta forma se puede guardar cualquier cosa dentro de un elemento HTML
        boton.addEventListener("click", eliminar);

        boton.innerText = "Enviar al profe Oak";
        boton.classList.add("btn","btn-danger");
        tdAcciones.classList.add("text-center");
        tdAcciones.appendChild(boton);

        tr.appendChild(tdNro);
        tr.appendChild(tdNombre);
        tr.appendChild(tdTipo);
        tr.appendChild(tdDescripcion);
        tr.appendChild(tdAcciones);
        tbody.appendChild(tr);

        console.log(p);
    }
}

document.querySelector("#poke-form").addEventListener('submit', (e)=>{
    e.preventDefault();

    let nombre = document.querySelector('#nombre-txt').value;
    let descripcion = tinymce.get("descripcion-txt").getContent();
    let legendario = document.querySelector("#legendario-si").checked;
    let tipo = document.querySelector("#tipo-select").value;
    let esValido = true;

    document.querySelector("#nombre-txt").classList.remove("is-invalid");

    if (nombre.trim() == "") {
        document.querySelector("#nombre-txt").classList.add("is-invalid");
        esValido = false;
    }
    if (descripcion.trim() == "") {
        document.querySelector("#descripcion-txt").classList.add("is-invalid");
        esValido = false;
    }

    if (esValido) {
        let pokemon = {};
        pokemon.nombre = nombre;
        pokemon.descripcion = descripcion;
        pokemon.legendario = legendario;
        pokemon.tipo = tipo;
    
        pokemones.push(pokemon);
        cargarTabla();
        Swal.fire("Pokemon registrado!!");
    }

    
});

document.querySelector("#limpiar-btn").addEventListener("click", ()=> {
    document.querySelector("#nombre-txt").value = "";
    tinymce.get("descripcion-txt").setContent("");
    document.querySelector("#legendario-si").checked = true;
    document.querySelector("#tipo-select").value = "1";
});