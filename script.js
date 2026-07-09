let joueurs = [];
let modeEquipes = false;

function genererChamps() {
    let n = document.getElementById('numPlayers').value;
    let html = `<h3>Noms des joueurs</h3>`;
    for(let i=0; i<n; i++) html += `<input type="text" class="nomJoueur" placeholder="Joueur ${i+1}">`;
    html += `<label><input type="checkbox" id="checkEquipes"> Créer des équipes aléatoires</label>`;
    html += `<br><button onclick="demarrerJeu()">Démarrer</button>`;
    document.getElementById('inputNames').innerHTML = html;
}

function demarrerJeu() {
    let inputs = document.querySelectorAll('.nomJoueur');
    modeEquipes = document.getElementById('checkEquipes').checked;
    inputs.forEach(i => joueurs.push({name: i.value, score: 0}));
    
    if(modeEquipes) {
        joueurs.sort(() => Math.random() - 0.5);
        // Logique simplifiée : créer 2 équipes
    }
    
    document.getElementById('setup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    afficherTableau();
}

function ajouterManche() {
    // Ajoute un score, puis recalcule le podium
    calculerPodium();
}

function calculerPodium() {
    let podiumDiv = document.getElementById('podium');
    let classement = [...joueurs].sort((a, b) => b.score - a.score);
    podiumDiv.innerHTML = "<h3>Classement</h3>" + 
        classement.map((j, i) => `<p>${i+1}. ${j.name} : ${j.score} pts</p>`).join("");
}
