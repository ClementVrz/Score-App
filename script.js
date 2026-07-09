let joueurs = [];

function genererChamps() {
    let n = document.getElementById('numPlayers').value;
    let html = `<h3>Noms des joueurs</h3>`;
    for(let i=0; i<n; i++) html += `<input type="text" class="nomJoueur" placeholder="Joueur ${i+1}">`;
    html += `<br><button onclick="demarrerJeu()">Démarrer</button>`;
    document.getElementById('inputNames').innerHTML = html;
}

function demarrerJeu() {
    document.querySelectorAll('.nomJoueur').forEach(i => joueurs.push({name: i.value, score: 0}));
    document.getElementById('setup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    afficherTableau();
}

function afficherTableau() {
    let tbody = document.getElementById('tableBody');
    let head = document.getElementById('tableHead');
    head.innerHTML = "<th>Joueur</th><th>Score</th>";
    tbody.innerHTML = joueurs.map((j, i) => `
        <tr>
            <td>${j.name}</td>
            <td><input type="number" class="score-input" onchange="mettreAJourScore(${i}, this.value)" value="0"></td>
        </tr>
    `).join("");
}

function mettreAJourScore(index, valeur) {
    joueurs[index].score = parseInt(valeur) || 0;
    // Animation
    let input = document.querySelectorAll('.score-input')[index];
    input.classList.add('animate-score');
    setTimeout(() => input.classList.remove('animate-score'), 300);
    
    calculerPodium();
}

function calculerPodium() {
    let podiumDiv = document.getElementById('podium');
    let classement = [...joueurs].sort((a, b) => b.score - a.score);
    podiumDiv.innerHTML = "<h3>Classement</h3>" + 
        classement.map((j, i) => `<p>${i+1}. ${j.name} : <b>${j.score} pts</b></p>`).join("");
}
