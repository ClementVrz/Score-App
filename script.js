let joueurs = [];

function genererChamps() {
    let n = document.getElementById('numPlayers').value;
    let container = document.getElementById('inputNames');
    container.innerHTML = "";
    for(let i=0; i<n; i++) {
        container.innerHTML += `<input type="text" class="nomJoueur" placeholder="Nom joueur ${i+1}"><br>`;
    }
    container.innerHTML += `<button onclick="demarrerJeu()">Démarrer</button>`;
}

function demarrerJeu() {
    document.querySelectorAll('.nomJoueur').forEach(input => joueurs.push({name: input.value, scores: []}));
    document.getElementById('setup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    afficherTableau();
}

function afficherTableau() {
    let head = document.getElementById('tableHead');
    head.innerHTML = "<th>Manche</th>" + joueurs.map(j => `<th>${j.name}</th>`).join("");
}

function ajouterManche() {
    let tbody = document.getElementById('tableBody');
    let row = `<tr><td>${tbody.rows.length + 1}</td>`;
    joueurs.forEach((j, i) => {
        row += `<td><input type="number" class="score-input-${i}" value="0"></td>`;
    });
    tbody.innerHTML += row + "</tr>";
}
