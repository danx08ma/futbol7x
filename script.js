// Datos iniciales
const ligas = [
  {
    nombre: "Liga Estelar",
    equipos: ["Dragones FC", "Águilas Doradas", "Tiburones", "Leones", "Pumas", "Panteras", "Cóndores", "Tigres"],
    tabla: [],
    partidos: []
  }
];

const ligasContainer = document.getElementById('ligasContainer');
const ligaSeccion = document.getElementById('ligaSeccion');
const ligaNombre = document.getElementById('ligaNombre');
const partidosContainer = document.getElementById('partidosContainer');
const tablaClasificacion = document.getElementById('tablaClasificacion');

let ligaActual = null;

// Mostrar ligas
function mostrarLigas() {
  ligasContainer.innerHTML = '';
  ligas.forEach((liga, index) => {
    const card = document.createElement('div');
    card.className = 'liga-card';
    card.innerText = liga.nombre;
    card.onclick = () => abrirLiga(index);
    ligasContainer.appendChild(card);
  });
}

function abrirLiga(index) {
  ligaActual = ligas[index];
  ligaSeccion.classList.remove('oculto');
  ligasContainer.classList.add('oculto');
  ligaNombre.innerText = ligaActual.nombre;
  if (ligaActual.partidos.length === 0) crearPartidos();
  mostrarPartidos();
  mostrarTabla();
}

function volverInicio() {
  ligaSeccion.classList.add('oculto');
  ligasContainer.classList.remove('oculto');
}

function crearPartidos() {
  for (let i = 0; i < ligaActual.equipos.length; i += 2) {
    ligaActual.partidos.push({
      local: ligaActual.equipos[i],
      visitante: ligaActual.equipos[i + 1],
      golesLocal: null,
      golesVisitante: null,
      goleadores: [],
      mvp: null
    });
  }
  ligaActual.tabla = ligaActual.equipos.map(equipo => ({
    nombre: equipo, pts: 0, pj: 0, gf: 0, gc: 0, dg: 0
  }));
}

function mostrarPartidos() {
  partidosContainer.innerHTML = '';
  ligaActual.partidos.forEach((p, index) => {
    const card = document.createElement('div');
    card.className = 'partido-card';

    card.innerHTML = `
      <div>${p.local}</div>
      <div class="partido-info">
        <h2>${p.golesLocal != null ? p.golesLocal : 0} - ${p.golesVisitante != null ? p.golesVisitante : 0}</h2>
        ${p.mvp ? `<p>MVP: ${p.mvp}</p>` : ''}
        ${p.goleadores.length > 0 ? `<p>Goleadores: ${p.goleadores.join(', ')}</p>` : ''}
      </div>
      <div>${p.visitante}</div>
      <button onclick="simularPartido(${index})">Simular</button>
    `;
    partidosContainer.appendChild(card);
  });
}

function simularPartido(index) {
  const p = ligaActual.partidos[index];
  p.golesLocal = Math.floor(Math.random() * 5);
  p.golesVisitante = Math.floor(Math.random() * 5);

  // Goleadores
  p.goleadores = [];
  for (let i = 0; i < p.golesLocal + p.golesVisitante; i++) {
    const equipo = i < p.golesLocal ? p.local : p.visitante;
    p.goleadores.push(`${equipo} (${Math.floor(Math.random() * 90) + 1}')`);
  }

  // MVP aleatorio
  p.mvp = Math.random() > 0.5 ? p.local : p.visitante;

  actualizarTabla(p);
  mostrarPartidos();
  mostrarTabla();
}

function simularJornada() {
  ligaActual.partidos.forEach((_, i) => {
    if (ligaActual.partidos[i].golesLocal === null) {
      simularPartido(i);
    }
  });
}

function actualizarTabla(partido) {
  ligaActual.tabla.forEach(e => {
    if (e.nombre === partido.local || e.nombre === partido.visitante) {
      e.pj += 1;
    }
    if (e.nombre === partido.local) {
      e.gf += partido.golesLocal;
      e.gc += partido.golesVisitante;
      e.dg = e.gf - e.gc;
      if (partido.golesLocal > partido.golesVisitante) e.pts += 3;
      else if (partido.golesLocal === partido.golesVisitante) e.pts += 1;
    }
    if (e.nombre === partido.visitante) {
      e.gf += partido.golesVisitante;
      e.gc += partido.golesLocal;
      e.dg = e.gf - e.gc;
      if (partido.golesVisitante > partido.golesLocal) e.pts += 3;
      else if (partido.golesLocal === partido.golesVisitante) e.pts += 1;
    }
  });
}

function mostrarTabla() {
  ligaActual.tabla.sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);

  tablaClasificacion.innerHTML = `
    <tr>
      <th>Equipo</th><th>Pts</th><th>PJ</th><th>GF</th><th>GC</th><th>DG</th>
    </tr>
  `;
  ligaActual.tabla.forEach(e => {
    tablaClasificacion.innerHTML += `
      <tr>
        <td>${e.nombre}</td><td>${e.pts}</td><td>${e.pj}</td><td>${e.gf}</td><td>${e.gc}</td><td>${e.dg}</td>
      </tr>
    `;
  });
}

mostrarLigas();
