class Propiedades {
  static contadorProp = 0;

  constructor(
    ciudad,
    barrio,
    ambientes,
    metros,
    precio,
    telefono,
    mail,
    disponibilidad
  ) {
    this.ciudad = ciudad;
    this.barrio = barrio;
    this.ambientes = ambientes;
    this.metros = metros;
    this.precio = precio;
    this.numero = ++Propiedades.contadorProp;
    this.telefono = telefono;
    this.mail = mail;
    this.disponibilidad = disponibilidad;
  }

  get numeroPropiedad() {
    return this.numero;
  }
}

//------Traer Propiedades con AJAX:

const fetchPropiedades = async () => {
  try {
    let resp = await fetch(`./propiedades.json`);
    let prop = await resp.json();

    prop.forEach((propiedad) => {
      propiedad = new Propiedades(
        propiedad.ciudad,
        propiedad.barrio,
        propiedad.ambientes,
        propiedad.metros,
        propiedad.precio,
        propiedad.telefono,
        propiedad.mail,
        propiedad.disponibilidad
      );

      mostrarPropiedadEnNavegador(propiedad);
    });
  } catch (err) {}
};

fetchPropiedades();

//-------- añadiendo elementos HTML/JS || DOM : ---------------------------------------------
//Creamos contenedores:
let contenedor = document.createElement(`div`);
let sectionContainer = document.getElementById("section-container");
let sectionInputSubirProp = document.createElement(`section`);
sectionInputSubirProp.classList.add("sectionInputSP"); //para darle estilos por css

//Creamos boton subir propiedad y se la añadimos a contenedor.
let btnSubirProp = document.createElement(`button`);
btnSubirProp.className = "btnSubirProp";
btnSubirProp.innerHTML = `<b>Subir Propiedad</b>`;

contenedor.appendChild(btnSubirProp);

//Creamos los botones para subir la propiedad:

let subirPropCiudad = document.createElement(`input`);
subirPropCiudad.placeholder = `Ciudad`;
let subirPropBarrio = document.createElement(`input`);
subirPropBarrio.placeholder = `Barrio`;
let subirPropAmbientes = document.createElement(`input`);
subirPropAmbientes.placeholder = `Cantidad Ambientes`;
let subirPropMetros = document.createElement(`input`);
subirPropMetros.placeholder = `Metros Cuadrados`;
let subirPropPrecio = document.createElement(`input`);
subirPropPrecio.placeholder = `Precio`;
let subirPropTel = document.createElement(`input`);
subirPropTel.placeholder = `Telefono`;
let subirPropMail = document.createElement(`input`);
subirPropMail.placeholder = `eMail`;
let subirPropDisponibilidad = document.createElement(`input`);
subirPropDisponibilidad.placeholder = `dias de visita, sin coma y en singular`;

//Tambien creamos un boton para guardar la info y otro para cancelar:
let btnGuardarProp = document.createElement(`button`);
btnGuardarProp.innerText = `Guardar`;
let btnCancelarProp = document.createElement(`button`);
btnCancelarProp.innerText = `Cancelar`;

sectionInputSubirProp.append(
  subirPropCiudad,
  subirPropBarrio,
  subirPropAmbientes,
  subirPropMetros,
  subirPropPrecio,
  subirPropTel,
  subirPropMail,
  subirPropDisponibilidad,
  btnGuardarProp,
  btnCancelarProp
);

//Aca añadimos los contenedores a la seccion propiedades.
let sectionPropiedades = document.querySelector(`#propiedades`);
sectionPropiedades.appendChild(contenedor);
sectionPropiedades.appendChild(sectionInputSubirProp);

//----------------Fin Añadir elementos con JS---------------------------

//-------------------Eventos: ------------------------------------------
//-Evento para que aparezcan los botones para subir la propiedad:
btnSubirProp.addEventListener("click", desplegarSubirProp);
function desplegarSubirProp() {
  sectionInputSubirProp.style.display = `contents`;
}

//-Evento para ocultar la section para subir una propiedad:
btnCancelarProp.addEventListener("click", ocultarSubirProp);
function ocultarSubirProp() {
  sectionInputSubirProp.style.display = `none`;
}

//Evento para guardar propiedades:
btnGuardarProp.addEventListener("click", subirPropiedad);
//-------------------Fin Eventos:---------------------------------------------------

let propiedades = [];

// Verificar y cargar propiedades desde el localStorage al cargar la página
window.addEventListener("load", () => {
  const propiedadesGuardadas = JSON.parse(localStorage.getItem("propiedades"));
  if (propiedadesGuardadas) {
    propiedades = propiedadesGuardadas.map(
      (propiedadData) =>
        new Propiedades(
          propiedadData.ciudad,
          propiedadData.barrio,
          propiedadData.ambientes,
          propiedadData.metros,
          propiedadData.precio,
          propiedadData.telefono,
          propiedadData.mail,
          propiedadData.disponibilidad
        )
    );

    propiedades.forEach((propiedad) => {
      mostrarPropiedadEnNavegador(propiedad);
    });
  }
});

function subirPropiedad() {
  const inputCiudadValue = subirPropCiudad.value;
  const inputBarrioValue = subirPropBarrio.value;
  const inputAmbientesValue = subirPropAmbientes.value;
  const inputMetrosValue = subirPropMetros.value;
  const inputPrecioValue = subirPropPrecio.value;
  const inputTelValue = subirPropTel.value;
  const inputMailValue = subirPropMail.value;
  const inputDisponibilidadValue = subirPropDisponibilidad.value;

  if (!inputCiudadValue)
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Los campos no pueden estar vacios",
    });
  if (!/^[a-zA-Z\s]+$/.test(inputCiudadValue)) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El campo Ciudad no puede ser un numero",
    });
  }

  if (!inputBarrioValue)
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Los campos no pueden estar vacios",
    });
  if (!/^[a-zA-Z]+$/.test(inputBarrioValue)) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El campo Barrio no puede ser un numero",
    });
  }

  if (!inputAmbientesValue)
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Los campos no pueden estar vacios",
    });
  if (/^\d+$/.test(inputAmbientesValue)) {
  } else {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El campo Ambientes tiene que ser un numero",
    });
  }

  if (!inputMetrosValue)
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Los campos no pueden estar vacios",
    });
  if (/^\d+$/.test(inputMetrosValue)) {
  } else {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El campo Metros tiene que ser un numero",
    });
  }

  if (!inputPrecioValue)
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Los campos no pueden estar vacios",
    });
  if (/^\d+$/.test(inputPrecioValue)) {
  } else {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El campo Precio tiene que ser un numero",
    });
  }

  if (!inputTelValue)
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Los campos no pueden estar vacios",
    });
  if (/^\d+$/.test(inputTelValue)) {
  } else {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El campo telefono tiene que ser un numero",
    });
  }

  if (!inputMailValue)
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Los campos no pueden estar vacios",
    });
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(inputMailValue)) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El campo Mail tiene que ser un correo electronico",
    });
  }

  const propiedad = new Propiedades(
    inputCiudadValue,
    inputBarrioValue,
    inputAmbientesValue,
    inputMetrosValue,
    inputPrecioValue,
    inputTelValue,
    inputMailValue,
    [inputDisponibilidadValue]
  );

  propiedades.push(propiedad);

  // Guardar propiedades en el localStorage
  localStorage.setItem(
    "propiedades",
    JSON.stringify(
      propiedades.map((propiedad) => ({
        ciudad: propiedad.ciudad,
        barrio: propiedad.barrio,
        ambientes: propiedad.ambientes,
        metros: propiedad.metros,
        precio: propiedad.precio,
        telefono: propiedad.telefono,
        mail: propiedad.mail,
        disponibilidad: propiedad.disponibilidad,
      }))
    )
  );

  mostrarPropiedadEnNavegador(propiedad);

  subirPropCiudad.value = ``;
  subirPropBarrio.value = ``;
  subirPropAmbientes.value = ``;
  subirPropMetros.value = ``;
  subirPropPrecio.value = ``;
  subirPropTel.value = ``;
  subirPropMail.value = ``;
  subirPropDisponibilidad.value = ``;
}

function mostrarPropiedadEnNavegador(propiedad) {
  const listaPropiedades = document.getElementById("listaPropiedades");
  const nuevaPropiedad = document.createElement("li");

  nuevaPropiedad.innerHTML = `
  <b>N° ${propiedad.numeroPropiedad}</b><br>
  <hr>
  <aside></aside>
  <hr>
  <b class="p-ciudad">${propiedad.ciudad}</b><br>
  <b class="p-barrio">${propiedad.barrio}</b><br>
  <b>Ambientes: ${propiedad.ambientes}</b><br>
  <b>Metros: ${propiedad.metros} m²</b><br>
  <b>Precio: $${propiedad.precio} usd.-</b><br>
  <hr>
  <a href="#modal-1"><button id="btn-visitar" class="btnVisitar">Visitar</button></a>
  `;

  // Agregar un atributo personalizado al botón para almacenar los datos de la propiedad
  const btnVisitar = nuevaPropiedad.querySelector("#btn-visitar");
  btnVisitar.setAttribute("data-propiedad", JSON.stringify(propiedad));

  // Agregar el elemento li a la lista de propiedades
  listaPropiedades.append(nuevaPropiedad);
}

//----------------------------------------

//Visitar:
let ventanaModal = document.getElementById("modal-1");

document.addEventListener("click", function (event) {
  if (event.target && event.target.id === "btn-visitar") {
    const propiedadData = event.target.getAttribute("data-propiedad");
    const propiedad = JSON.parse(propiedadData);

    // Obtener los datos de disponibilidad del usuario desde el localStorage
    const datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));

    // Verificar si los datos de usuario están disponibles
    if (datosUsuario) {
      // Comprobar si hay coincidencias en los días de disponibilidad
      const coincidencias = propiedad.disponibilidad.some((dia) =>
        datosUsuario.diasDisponibles.includes(dia)
      );

      // Ahora puedes acceder a los datos de la propiedad y realizar la acción deseada
      // Por ejemplo, mostrarlos en una ventana emergente
      ventanaModal.innerHTML = `
      <a href="#cerrar" class="modal-close"> <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19.9375 0H2.0625C0.923828 0 0 1.0558 0 2.35714V19.6429C0 20.9442 0.923828 22 2.0625 22H19.9375C21.0762 22 22 20.9442 22 19.6429V2.35714C22 1.0558 21.0762 0 19.9375 0ZM19.9375 19.3482C19.9375 19.5103 19.8215 19.6429 19.6797 19.6429H2.32031C2.17852 19.6429 2.0625 19.5103 2.0625 19.3482V2.65179C2.0625 2.48973 2.17852 2.35714 2.32031 2.35714H19.6797C19.8215 2.35714 19.9375 2.48973 19.9375 2.65179V19.3482ZM15.3184 7.98482L12.6801 11L15.3184 14.0152C15.516 14.2411 15.516 14.6094 15.3184 14.8402L14.3602 15.9353C14.1625 16.1612 13.8402 16.1612 13.6383 15.9353L11 12.9201L8.36172 15.9353C8.16406 16.1612 7.8418 16.1612 7.63984 15.9353L6.68164 14.8402C6.48398 14.6143 6.48398 14.246 6.68164 14.0152L9.31992 11L6.68164 7.98482C6.48398 7.75893 6.48398 7.39062 6.68164 7.15982L7.63984 6.06473C7.8375 5.83884 8.15977 5.83884 8.36172 6.06473L11 9.07991L13.6383 6.06473C13.8359 5.83884 14.1582 5.83884 14.3602 6.06473L15.3184 7.15982C15.5203 7.38571 15.5203 7.75402 15.3184 7.98482Z"
          fill="#ff0000" />
      </svg>
    </a>
    <h3 class="title-modal"> <u>Datos de contacto:</u></h3>

        <h5>Número de Propiedad: ${propiedad.numero}</h5>
        <h5>Ciudad: ${propiedad.ciudad}</h5>
        <h5>Barrio: ${propiedad.barrio}</h5>
        <h5>Ambientes: ${propiedad.ambientes}</h5>
        <h5>Telefono de Contacto: ${propiedad.telefono}</h5>
        <h5>Correo Electronico: ${propiedad.mail}</h5>
        <h5>Disponibilidad: ${propiedad.disponibilidad}</h5>
        <hr>
        <h5>Días de Disponibilidad del Usuario: ${datosUsuario.diasDisponibles.join(
          ", "
        )}</h5>
        <h5>¿Coincidencias en los Días de Disponibilidad?: ${
          coincidencias ? "Sí" : "No"
        }</h5>
        <hr>
         <button class="btn-visitar-modal" id="btnVisitar"> Enviar Solicitud </button>
      `;
    } else {
      // El usuario no está logeado o no hay datos de usuario disponibles
      // Puedes mostrar un mensaje o realizar otra acción según tus necesidades
      ventanaModal.innerHTML = `
          <a href="#cerrar" class="modal-close"> <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19.9375 0H2.0625C0.923828 0 0 1.0558 0 2.35714V19.6429C0 20.9442 0.923828 22 2.0625 22H19.9375C21.0762 22 22 20.9442 22 19.6429V2.35714C22 1.0558 21.0762 0 19.9375 0ZM19.9375 19.3482C19.9375 19.5103 19.8215 19.6429 19.6797 19.6429H2.32031C2.17852 19.6429 2.0625 19.5103 2.0625 19.3482V2.65179C2.0625 2.48973 2.17852 2.35714 2.32031 2.35714H19.6797C19.8215 2.35714 19.9375 2.48973 19.9375 2.65179V19.3482ZM15.3184 7.98482L12.6801 11L15.3184 14.0152C15.516 14.2411 15.516 14.6094 15.3184 14.8402L14.3602 15.9353C14.1625 16.1612 13.8402 16.1612 13.6383 15.9353L11 12.9201L8.36172 15.9353C8.16406 16.1612 7.8418 16.1612 7.63984 15.9353L6.68164 14.8402C6.48398 14.6143 6.48398 14.246 6.68164 14.0152L9.31992 11L6.68164 7.98482C6.48398 7.75893 6.48398 7.39062 6.68164 7.15982L7.63984 6.06473C7.8375 5.83884 8.15977 5.83884 8.36172 6.06473L11 9.07991L13.6383 6.06473C13.8359 5.83884 14.1582 5.83884 14.3602 6.06473L15.3184 7.15982C15.5203 7.38571 15.5203 7.75402 15.3184 7.98482Z"
          fill="#ff0000" />
          </svg>
          </a>
          <p>Debes iniciar sesión para ver los detalles de esta propiedad.</p>
          `;
    }
    const btnVisitar = document.getElementById("btnVisitar");

    btnVisitar.addEventListener("click", confirmaSolicitud);

    function confirmaSolicitud() {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Solicitud Enviada!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
});

//---------------------------------------------------------------------------

//Formulario Usuario:

const formulario = document.getElementById("miFormulario");
const formSubmit = document.getElementById("usu-form-submit");

formSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  const nombre = formulario.querySelector(".usu-form-name").value;
  const apellido = formulario.querySelector(".usu-form-apellido").value;
  const telefono = formulario.querySelector(".usu-form-tel").value;
  const email = formulario.querySelector(".usu-form-mail").value;
  const edad = formulario.querySelector(".usu-form-edad").value;
  const diasDisponibles = Array.from(
    formulario.querySelectorAll('input[name="dias[]"]:checked')
  ).map((input) => input.value);

  //---------------------------------------------------
  if (!nombre || !apellido || !telefono || !email || !edad) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Los campos no pueden estar vacios",
    });
  }
  //---------------------------------------------------

  // Almacena los datos en localStorage
  const datosUsuario = {
    nombre,
    apellido,
    telefono,
    email,
    edad,
    diasDisponibles,
  };

  localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));

  Swal.fire({
    position: "center",
    icon: "success",
    title: "Usuario Guardado!",
    showConfirmButton: false,
    timer: 1500,
  });

  formulario.reset();
});

//Que agregar para el trabajo final:

// Swit Alert al completar el formulario.
// Buscador de propiedades por barrio / ciudad.
