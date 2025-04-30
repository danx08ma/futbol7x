document.addEventListener("DOMContentLoaded", function() {
  const ligas = JSON.parse(localStorage.getItem('ligas')) || [];

  // Función para alternar entre modo oscuro y claro
  function toggleDarkMode() {
    document.body.classList.toggle('light-mode');
  }

  // Función para mostrar una sección específica
  function mostrarSeccion(id) {
    document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`#tab-${id}`).classList.add('active');
  }

  // Agregar liga
  document.getElementById("agregar-liga-btn").addEventListener("click", function() {
    const nombre = document.getElementById("nombre-liga").value.trim();
    if (nombre) {
      ligas.push({ nombre, equipos: [], partidos: [] });
      localStorage.setItem("ligas", JSON.stringify(ligas));
      renderizarLigas();
      document.getElementById("formulario-liga").style.display = "none";
    }
  });

  // Mostrar formulario para agregar equipo
  document.getElementById("agregar-equipo-btn").addEventListener("click", function() {
    const nombre = document.getElementById("nombre-equipo").value.trim();
    if (nombre) {
      const equipo = { nombre, jugadores: [] };
      ligas[ligas.length - 1].equipos.push(equipo);
      localStorage.setItem("ligas", JSON.stringify(ligas));
      renderizarEquipos();
      document.getElementById("formulario-equipo").style.display = "none";
    }
  });

  // Mostrar formulario para agregar jugador
  document.getElementById("agregar-jugador-btn").addEventListener("click", function() {
    const nombre = document.getElementById("nombre-jugador").value.trim();
    const posicion = document.getElementById("posicion-jugador").value;
    if (nombre && posicion) {
      const jugador = { nombre, posicion };
      ligas[ligas.length - 1].equipos[0].jugadores.push(jugador); // Asegúrate de elegir el equipo correcto
      localStorage.setItem("ligas", JSON.stringify(ligas));
      renderizarJugadores();
      document.getElementById("formulario-jugador").style.display = "none";
    }
  });

  // Función para renderizar la lista de ligas
  function renderizarLigas() {
    const listaLigas = document.getElementById("lista-ligas");
    listaLigas.innerHTML = "";
    ligas.forEach((liga, index) => {
      const ligaItem = document.createElement('li');
      ligaItem.innerHTML = `${liga.nombre} <button onclick="verLiga(${index})">Ver</button>`;
      listaLigas.appendChild(ligaItem);
    });
  }

  // Función para ver la liga
  function verLiga(index) {
    mostrarSeccion('liga');
    const liga = ligas[index];
    document.getElementById('nombre-liga-actual').innerText = liga.nombre;
    renderizarEquipos(liga);
  }

  // Función para renderizar la lista de equipos
  function renderizarEquipos() {
    const listaEquipos = document.getElementById("lista-equipos");
    listaEquipos.innerHTML = "";
    ligas[ligas.length - 1].equipos.forEach(equipo => {
      const equipoItem = document.createElement('li');
      equipoItem.innerHTML = `${equipo.nombre}`;
      listaEquipos.appendChild(equipoItem);
    });
  }

  // Función para renderizar la lista de jugadores
  function renderizarJugadores() {
    const listaJugadores = document.getElementById("lista-jugadores");
    listaJugadores.innerHTML = "";
    ligas.forEach(liga => {
      liga.equipos.forEach(equipo => {
        equipo.jugadores.forEach(jugador => {
          const jugadorItem = document.createElement('li');
          jugadorItem.innerHTML = `${jugador.nombre} - ${jugador.posicion}`;
          listaJugadores.appendChild(jugadorItem);
        });
      });
    });
  }

  // Mostrar secciones al cargar la página
  mostrarSeccion("ligas");
  renderizarLigas();

  // Eventos de mostrar secciones
  document.getElementById("tab-ligas").addEventListener("click", function() {
    mostrarSeccion('ligas');
  });
  document.getElementById("tab-equipos").addEventListener("click", function() {
    mostrarSeccion('equipos');
  });
  document.getElementById("tab-jugadores").addEventListener("click", function() {
    mostrarSeccion('jugadores');
  });
});
