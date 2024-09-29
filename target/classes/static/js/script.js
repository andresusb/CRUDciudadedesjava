const apiUrl = "/api/ciudades";

// Función para obtener y mostrar las ciudades
function getCities() {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((ciudades) => {
            const listaCiudades = document.getElementById("lista-ciudades");
            listaCiudades.innerHTML = "";

            ciudades.forEach((ciudad) => {
                const div = document.createElement("div");
                div.className = "ciudad";
                div.innerHTML = `
                    <strong contenteditable="false">${ciudad.nombre}</strong> (${ciudad.pais})
                    <button onclick="editCities(this)">Editar</button>
                    <button onclick="removeCities('${ciudad.nombre}')">Eliminar</button>
                `;
                listaCiudades.appendChild(div);
            });
        });
}

// Función para agregar una ciudad
function addCities() {
    const nombre = document.getElementById("nombre").value;
    const pais = document.getElementById("pais").value;

    if (!nombre || !pais) {
        alert("Por favor completa todos los campos.");
        return;
    }

    const ciudad = { nombre, pais };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ciudad),
    }).then(() => {
        getCities();
        document.getElementById("nombre").value = "";
        document.getElementById("pais").value = "";
    });
}

// Función para activar la edición de una ciudad
function editCities(button) {
    const ciudadDiv = button.parentElement;
    const nombreElemento = ciudadDiv.querySelector("strong");
    const esEditable = nombreElemento.contentEditable === "true";

    if (esEditable) {
        const nuevoNombre = nombreElemento.innerText.trim();
        const pais = ciudadDiv
            .querySelector("strong")
            .nextSibling.textContent.split("(")[1]
            .split(")")[0]
            .trim();
        const ciudad = { nombre: nuevoNombre, pais };

        fetch(`${apiUrl}/${nombreElemento.dataset.originalName}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ciudad),
        }).then((response) => {
            if (response.ok) {
                nombreElemento.contentEditable = "false";
                button.innerText = "Editar";
                nombreElemento.removeAttribute("data-original-name");
            } else {
                alert("Error al actualizar la ciudad.");
            }
        });
    } else {
        // Activar edición
        nombreElemento.contentEditable = "true";
        nombreElemento.focus();
        button.innerText = "Guardar";
        nombreElemento.setAttribute(
            "data-original-name",
            nombreElemento.innerText.trim()
        );
    }
}

// Función para eliminar una ciudad
function removeCities(nombre) {
    fetch(`${apiUrl}/${nombre}`, {
        method: "DELETE",
    }).then(() => {
        getCities();
    });
}

// Obtener las ciudades al cargar la página
getCities();