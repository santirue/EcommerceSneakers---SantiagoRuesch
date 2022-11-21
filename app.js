const stockProductos = [
  {
    id: 1,
    nombre: "Adidas Yeezy 450",
    cantidad: 1,
    desc: "Las adidas Yeezy 450 presentan una estructura tan poco convencional como genial. Lanzadas por primera vez en abril de 2021, las 450 consolidan la voluntad de la marca de ir más allá de los patrones establecidos como estéticos y demostrar que se puede triunfar con una silueta poco convencional",
    precio: 1200,
    img: "img/yeezy450.jpg",
  },
  {
    id: 2,
    nombre: "Adidas ZX 8000",
    cantidad: 1,
    desc: "Estas zapatillas adidas ZX 8000 están inspiradas en las versiones originales lanzadas por primera vez en los 80 Lucen un look retro pero moderno a la vez, con una mediasuela de EVA ligera que brinda comodidad y la tecnología Torsion System para estabilidad adicional.",
    precio: 1500,
    img: "img/adidaszx8000.jpg",
  },
  {
    id: 3,
    nombre: "Adidas Forum",
    cantidad: 1,
    desc: "Zapatillas adidas Forum, Zapatillas con un diseño que refleja tu pasión, hechas parcialmente con material reciclado, Como una nota de amor de ti, para ti. Encuentra en esta sección zapatillas adidas Forum que celebran la iniciativa del amor propio",
    precio: 1570,
    img: "img/forum.webp",
  },
  {
    id: 4,
    nombre: "Adidas Oznova",
    cantidad: 1,
    desc: "Las adidas Oznova combinan gamuza, goma semitraslúcida y materiales sintéticos en tonos neutros para crear una nueva silueta vanguardista.",
    precio: 1000,
    img: "img/oznova.webp",
  },
  {
    id: 5,
    nombre: "Nike Jordan 6 DMP",
    cantidad: 1,
    desc: "Estas sneakers nike presenta una construcción de gran calidad basada en materiales premium. Su upper combina una parte superior de piel con piel de vacuno para conseguir una sujeción y ajuste de primer nivel que confiere a esta silueta un toque extra de comodidad gracias a su excelente acolchado interior.",
    precio: 1200,
    img: "img/Air-Jordan-6-DMP.jpg",
  },
  {
    id: 6,
    nombre: "Nike Jordan 1",
    cantidad: 1,
    desc: "Los Air Jordan 1 son una especie de santo grial en el mundo de los tenis. Básicamente, comparten muchas de las cualidades que caracterizan a su homónimo, Michael Jordan: son confiables, atléticos y poseen un estilo atemporal.",
    precio: 1200,
    img: "img/jordan1.jpg",
  },
  {
    id: 7,
    nombre: "Nike Jordan 12",
    cantidad: 1,
    desc: "Las Air Jordan 12 son un clásico entre clásicos de los fans del basket y de Michael Jordan.",
    precio: 1400,
    img: "img/jordan12.jpg",
  },
  {
    id: 8,
    nombre: "Nike Jordan 3",
    cantidad: 1,
    desc: "Este modelo Nike Air Jordan 3, lanzado en 1988, es uno de los 5 modelos favoritos de Michael Jordan en toda la historia de la línea Air Jordan.",
    precio: 1200,
    img: "img/jordan3.jpg",
  },
  {
    id: 9,
    nombre: "Nike Jordan 4",
    cantidad: 1,
    desc: "Los Air Jordan 4 definieron la cultura de los tenis modernos de formas más sutiles. En 1999, justo después del segundo retiro de Michael Jordan, fue el primer lanzamiento retro por el que los fanáticos se volvieron locos, sentando así las bases para el calzado que han definido la cultura de los tenis deportivos.",
    precio: 1400,
    img: "img/jordan4.jpg",
  },
  {
    id: 10,
    nombre: "Nike SB Dunk",
    cantidad: 1,
    desc: "Las Nike Dunk Low son unas zapatillas casual que se inspiran en modelos deportivos pero que destacan por su comodidad. Su diseño se basa en la clásica deportiva de baloncesto que Nike lanzó en 1985.",
    precio: 1200,
    img: "img/sbdunk.jpg",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if(existe){
    const prod = carrito.map(prod => {
      if(prod.id === id){
        prod.cantidad++
      }
    })
  } else {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()

};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

 function enviarCompra(e){
   e.preventDefault()
   const cliente = document.querySelector('#cliente').value
   const email = document.querySelector('#correo').value

   if(email === '' || cliente == ''){
     Swal.fire({
       title: "¡Debes completar tu email y nombre!",
       text: "Rellena el formulario",
       icon: "error",
       confirmButtonText: "Aceptar",
   })
 } else {

  const btn = document.getElementById('button');

// document.getElementById('procesar-pago')
//  .addEventListener('submit', function(event) {
//    event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_qxwi0jn';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Finalizar compra';
      alert('Correo enviado!');
    }, (err) => {
      btn.value = 'Finalizar compra';
      alert(JSON.stringify(err));
    });
    
   const spinner = document.querySelector('#spinner')
   spinner.classList.add('d-flex')
   spinner.classList.remove('d-none')

   setTimeout(() => {
     spinner.classList.remove('d-flex')
     spinner.classList.add('d-none')
     formulario.reset()

     const alertExito = document.createElement('p')
     alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
     alertExito.textContent = 'Compra realizada correctamente'
     formulario.appendChild(alertExito)

     setTimeout(() => {
       alertExito.remove()
     }, 3000)


   }, 3000)
 }
 localStorage.clear()

 }