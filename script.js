let ligas = JSON.parse(localStorage.getItem('ligas')) || [];

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('light-mode');
}

function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  if (id === 'ligas') document.querySelector('.tab:nth-child(1)').classList.add('active');
  else if (id === 'equipos') document.querySelector('.tab:nth-child(2)').classList.add('active');
  else document.querySelector('.tab:nth-child(3)').classList.add('active');
}

function mostrarFormularioLiga() {
  document.getElementById('formulario-liga').style.display = 'block';
}

function guardarLiga() {
  const nombre = document.getElementById("nombre-liga").value.trim();
  if (!nombre) return;

  ligas.push({
    nombre,
    equipos: [],
    partidos: [],
    tablaClasificacion: [],
  });

  localStorage.setItem("ligas", JSON.stringify(ligas));
  renderizarLigas();
  document.getElementById("formulario-liga").style.display = "none";
}

function renderizarLigas() {
  let html = "<h3>Lista de Ligas</h3><ul>";
  ligas.forEach((liga, i) => {
    html += `
      <li>
        ${liga.nombre}
        <button onclick="mostrarPartidos(${i})">Partidos</button>
        <button onclick="mostrarClasificacion(${i})">Clasificación</button>
      </li>
    `;
  });
  html += "</ul>";
  document.getElementById("lista-ligas").innerHTML = html;
}

function mostrarFormularioEquipo() {
  document.getElementById('formulario-equipo').style.display = 'block';
}

function guardarEquipo() {
  const nombre = document.getElementById("nombre-equipo").value.trim();
  if (!nombre) return;

  const equipo = {
    nombre,
    jugadores: [],
  };

  const liga = ligas[ligas.length - 1];
  liga.equipos.push(equipo);
  localStorage.setItem("ligas", JSON.stringify(ligas));
  renderizarEquipos();
  document.getElementById("formulario-equipo").style.display = "none";
}

function renderizarEquipos() {
  let html = "<h3>Lista de Equipos</h3><ul>";
  ligas.forEach(liga => {
    liga.equipos.forEach(equipo => {
      html += `<li>${equipo.nombre}</li>`;
    });
  });
  html += "</ul>";
  document.getElementById("lista-equipos").innerHTML = html;
}

function mostrarFormularioJugador() {
  document.getElementById('formulario-jugador').style.display = 'block';
}

function guardarJugador() {
  const nombre = document.getElementById("nombre-jugador").value.trim();
  const posicion = document.getElementById("posicion-jugador").value;
  const goles = document.getElementById("goles").value;
  const asistencias = document.getElementById("asistencias").value;

  if (!nombre) return;

  const jugador = { nombre, posicion, goles, asistencias };

  const equipo = ligas[ligas.length - 1].equipos[0];
  equipo.jugadores.push(jugador);
  localStorage.setItem("ligas", JSON.stringify(ligas));
  renderizarJugadores();
  document.getElementById("formulario-jugador").style.display = "none";
}

function renderizarJugadores() {
  let html = "<h3>Lista de Jugadores</h3><ul>";
  ligas.forEach(liga => {
    liga.equipos.forEach(equipo => {
      equipo.jugadores.forEach(jugador => {
        html += `<li>${jugador.nombre} - ${jugador.posicion} (${jugador.goles} goles, ${jugador.asistencias} asistencias)</li>`;
      });
    });
  });
  html += "</ul>";
  document.getElementById("lista-jugadores").innerHTML = html;
}

function volverALigas() {
  mostrarSeccion("ligas");
}

renderizarLigas();
