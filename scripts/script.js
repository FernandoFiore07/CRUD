const API_URL = "https://690bbc6f6ad3beba00f60966.mockapi.io/users";
const results = document.getElementById("results");

// Mostrar usuarios en la lista
function mostrar(usuarios) {
  results.innerHTML = "";
  usuarios.forEach(u => {
    results.innerHTML += `<li class="list-group-item bg-dark text-white">ID ${u.id}: ${u.name} ${u.lastname}</li>`;
  });
}

// Buscar (todos o por ID)
async function buscar() {
  const id = document.getElementById("inputGet1Id").value.trim();
  const url = id ? `${API_URL}/${id}` : API_URL;
  try {
    const res = await fetch(url);
    const data = await res.json();
    mostrar(Array.isArray(data) ? data : [data]);
  } catch {
    alert("Error al buscar");
  }
}

// Agregar
async function agregar() {
  const name = document.getElementById("inputPostNombre").value.trim();
  const lastname = document.getElementById("inputPostApellido").value.trim();

  if (!name || !lastname) return alert("Completa los campos");

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, lastname }),
    });
    buscar();
  } catch {
    alert("Error al agregar");
  }
}

// Modificar
async function modificar() {
  const id = document.getElementById("inputPutId").value.trim();
  if (!id) return alert("Ingresá un ID");

  const name = prompt("Nuevo nombre:");
  const lastname = prompt("Nuevo apellido:");

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, lastname }),
    });
    buscar();
  } catch {
    alert("Error al modificar");
  }
}

// Borrar
async function borrar() {
  const id = document.getElementById("inputDelete").value.trim();
  if (!id) return alert("Ingresá un ID");

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    buscar();
  } catch {
    alert("Error al borrar");
  }
}

// Eventos
document.getElementById("btnGet1").addEventListener("click", buscar);
document.getElementById("btnPost").addEventListener("click", agregar);
document.getElementById("btnPut").addEventListener("click", modificar);
document.getElementById("btnDelete").addEventListener("click", borrar);

// Mostrar todos al inicio
buscar();
