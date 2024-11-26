// Función para manejar el envío del formulario (añadir o editar)
document.getElementById('formularioVenta').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener los valores del formulario
    const codigo = document.getElementById('codigo').value;
    const estado = document.getElementById('estado').value;
    const comprador = document.getElementById('comprador').value;
    const proveedor = document.getElementById('proveedor').value;
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const costo = parseFloat(document.getElementById('costo').value);

    // Calcular el total para este registro (solo se usa el costo)
    const total = costo;

    // Crear el objeto de registro
    const registro = {
        codigo,
        estado,
        comprador,
        proveedor,
        cantidad,
        costo,
        total
    };

    // Obtener los registros guardados en el almacenamiento local
    let registrosGuardados = JSON.parse(localStorage.getItem('registrosVentas')) || [];

    // Comprobar si ya existe un registro con el mismo código para editarlo
    const indexExistente = registrosGuardados.findIndex(reg => reg.codigo === codigo);

    if (indexExistente !== -1) {
        // Si el código ya existe, editar el registro existente
        registrosGuardados[indexExistente] = registro;
    } else {
        // Si el código no existe, agregar un nuevo registro
        registrosGuardados.push(registro);
    }

    // Guardar los registros actualizados en el almacenamiento local
    localStorage.setItem('registrosVentas', JSON.stringify(registrosGuardados));

    // Limpiar los campos del formulario
    document.getElementById('formularioVenta').reset();

    // Mostrar los registros actualizados
    mostrarRegistros();
});

// Función para mostrar los registros
function mostrarRegistros() {
    const registros = JSON.parse(localStorage.getItem('registrosVentas')) || [];
    const tablaVentas = document.querySelector('#tablaVentas tbody');
    tablaVentas.innerHTML = ''; // Limpiar la tabla antes de mostrar los nuevos registros

    registros.forEach(registro => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${registro.codigo}</td>
            <td>${registro.estado}</td>
            <td>${registro.comprador}</td>
            <td>${registro.proveedor}</td>
            <td>${registro.cantidad}</td>
            <td>${registro.costo.toFixed(2)}</td>
            <td>${registro.total.toFixed(2)}</td>
            <td>
                <button class="edit" onclick="editarRegistro('${registro.codigo}')">Editar</button>
                <button class="delete" onclick="eliminarRegistro('${registro.codigo}')">Eliminar</button>
            </td>
        `;
        tablaVentas.appendChild(fila);
    });

    // Actualizar el total general
    actualizarTotalGeneral();
}

// Función para actualizar el total general
function actualizarTotalGeneral() {
    const registros = JSON.parse(localStorage.getItem('registrosVentas')) || [];
    const totalGeneral = registros.reduce((acc, registro) => acc + registro.total, 0);
    document.getElementById('totalSumado').textContent = totalGeneral.toFixed(2);
}

// Función para editar un registro
function editarRegistro(codigo) {
    const registros = JSON.parse(localStorage.getItem('registrosVentas')) || [];
    const registro = registros.find(reg => reg.codigo === codigo);

    // Rellenar el formulario con los datos del registro seleccionado
    if (registro) {
        document.getElementById('codigo').value = registro.codigo;
        document.getElementById('estado').value = registro.estado;
        document.getElementById('comprador').value = registro.comprador;
        document.getElementById('proveedor').value = registro.proveedor;
        document.getElementById('cantidad').value = registro.cantidad;
        document.getElementById('costo').value = registro.costo;
    }
}

// Función para eliminar un registro
function eliminarRegistro(codigo) {
    let registros = JSON.parse(localStorage.getItem('registrosVentas')) || [];
    registros = registros.filter(reg => reg.codigo !== codigo);

    // Guardar los registros actualizados en el almacenamiento local
    localStorage.setItem('registrosVentas', JSON.stringify(registros));

    // Mostrar los registros actualizados
    mostrarRegistros();
}

// Función para filtrar registros por código
function filtrarRegistros() {
    const codigoBusqueda = document.getElementById('buscadorCodigo').value.toLowerCase();
    const registros = JSON.parse(localStorage.getItem('registrosVentas')) || [];
    const registrosFiltrados = registros.filter(registro => registro.codigo.toString().includes(codigoBusqueda));

    // Mostrar los registros filtrados en la tabla
    const tablaVentas = document.querySelector('#tablaVentas tbody');
    tablaVentas.innerHTML = ''; // Limpiar la tabla antes de mostrar los nuevos registros

    registrosFiltrados.forEach(registro => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${registro.codigo}</td>
            <td>${registro.estado}</td>
            <td>${registro.comprador}</td>
            <td>${registro.proveedor}</td>
            <td>${registro.cantidad}</td>
            <td>${registro.costo.toFixed(2)}</td>
            <td>${registro.total.toFixed(2)}</td>
            <td>
                <button class="edit" onclick="editarRegistro('${registro.codigo}')">Editar</button>
                <button class="delete" onclick="eliminarRegistro('${registro.codigo}')">Eliminar</button>
            </td>
        `;
        tablaVentas.appendChild(fila);
    });

    // Actualizar el total general
    actualizarTotalGeneral();
}

// Mostrar los registros al cargar la página
mostrarRegistros();
