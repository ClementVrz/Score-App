let joueurs = [];
let nbManches = 0;

function genererChamps() {
    let n = parseInt(document.getElementById('numPlayers').value);
    let container = document.getElementById('inputNames');
    container.innerHTML = "<h3>Noms :</h3>";
    for(let i=0; i<n; i++) {
        container.innerHTML += `<input type="text" class="nomJoueur" placeholder="Joueur ${i+1}"><br>`;
    }
    container.innerHTML += `<button onclick="demarrerJeu()">Démarrer la partie</button>`;
}

function demarrerJeu() {
    let inputs = document.querySelectorAll('.nomJoueur');
    joueurs = []; // Reset
    inputs.forEach(i => joueurs.push({name: i.value, scores: []}));
    document.getElementById('setup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    nbManches = 0;
    ajouterManche();
}

function ajouterManche() {
    nbManches++;
    let head = document.getElementById('tableHead');
    head.innerHTML += `<th>M${nbManches}</th>`;
    
    let tbody = document.getElementById('tableBody');
    tbody.innerHTML = ""; 
    
    joueurs.forEach((j, i) => {
        j.scores.push(0); 
        let row = `<tr><td>${j.name}</td>`;
        j.scores.forEach((s, mIndex) => {
            row += `<td><input type="number" onchange="majScore(${i}, ${mIndex}, this.value)" value="${s}"></td>`;
        });
        row += `</tr>`;
        tbody.innerHTML += row;
    });
}

function majScore(jIdx, mIdx, val) {
    joueurs[jIdx].scores[mIdx] = parseInt(val) || 0;
    calculerPodium();
}

function calculerPodium() {
    let podium = document.getElementById('podium');
    let classement = joueurs.map(j => ({
        name: j.name, 
        total: j.scores.reduce((a, b) => a + b, 0)
    })).sort((a, b) => b.total - a.total);
    
    podium.innerHTML = "<h3>Classement</h3>" + 
        classement.map((j, i) => `<p>${i+1}. ${j.name} : <b>${j.total} pts</b></p>`).join("");
}
