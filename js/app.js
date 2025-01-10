document.getElementById('participantesCombinar').addEventListener('submit', function(event) {
    event.preventDefault();

	const participantesInput = document.getElementById('participantes').value;
    const participantes = participantesInput.split('\n').filter(participante => participante.trim() !== '');

    if (participantes.length < 2) {
        alert('Debes ingresar al menos 2 equipos.');
        return;
    }

    const combinacionesParticipantes = generarCombinaciones(participantes);
    displayResults(combinacionesParticipantes);
});

function generarCombinaciones(participantes) {
    const combinaciones = [];
    for (let i = 0; i < participantes.length; i++) {
        for (let j = i + 1; j < participantes.length; j++) {
            combinaciones.push([participantes[i], participantes[j]]);
        }
    }
    return combinaciones;
}

function displayResults(combinacionesParticipantes) {
    const textareaEquipos = document.getElementById('equipos');
	let texto = "";

    if (combinacionesParticipantes.length === 0) {
        textareaEquipos.innerText = 'No hay combinaciones posibles.';
        return;
    }

    combinacionesParticipantes.forEach(combinacionParticipante => {
        texto += combinacionParticipante.join(' - ') + '\r\n';
    });

	textareaEquipos.value = texto;
}

// equiposRoundRobin
document.getElementById('equiposRoundRobin').addEventListener('submit', function(event) {
    event.preventDefault();

	const equiposInput = document.getElementById('equipos').value;
    const equipos = equiposInput.split('\n').filter(equipo => equipo.trim() !== '');

    if (equipos.length < 2) {
        alert('Debes ingresar al menos 2 equipos.');
        return;
    }

    const equiposRR = roundRobin(equipos);
    displayResults2(equiposRR);
});

function roundRobin(equipos) {
    const numEquipos = equipos.length;
    const rounds = [];
    const half = Math.floor(numEquipos / 2);

    for (let i = 0; i < numEquipos - 1; i++) {
        const round = [];
        for (let j = 0; j < half; j++) {
            const team1 = equipos[j];
            const team2 = equipos[numEquipos - 1 - j];
            round.push([team1, team2]);
        }
        rounds.push(round);
        equipos.splice(1, 0, equipos.pop()); // Rotar equipos
    }

    return rounds;
}

function displayResults2(rounds) {
    const resultsDiv = document.getElementById('results');
    const validacionIndividual = document.getElementById('validacionIndividual');
    resultsDiv.innerHTML = '';

    rounds.forEach((round, index) => {
        const roundHeader = document.createElement('h3');
        roundHeader.textContent = `Ronda ${index + 1}:`;
        resultsDiv.appendChild(roundHeader);

        const roundList = document.createElement('ul');
        round.forEach(match => {
            const matchItem = document.createElement('li');
            if (validacionIndividual.checked) {

                const contieneElementos = match[1].split(" - ").some(elemento => match[0].split(" - ").includes(elemento));
                if (!contieneElementos) {
                    matchItem.textContent = `${match[0]} vs ${match[1]}`;
                    roundList.appendChild(matchItem);
                }
            } else {
                matchItem.textContent = `${match[0]} vs ${match[1]}`;
                roundList.appendChild(matchItem);
            }

        });
        resultsDiv.appendChild(roundList);
    });
}