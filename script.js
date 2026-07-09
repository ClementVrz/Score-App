let joueurs = [];
let nbManches = 0;

function demarrerJeu() {
    let inputs = document.querySelectorAll('.nomJoueur');
    inputs.forEach(i => joueurs.push({name: i.value, scores: []}));
    document.getElementById('setup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    ajouterManche(); // Ajoute la première manche d'office
}

function ajouterManche() {
    nbManches++;
    let head = document.getElementById('tableHead');
    head.innerHTML += `<th>M${nbManches}</th>`;
    
    let tbody = document.getElementById('tableBody');
    tbody.innerHTML = ""; // Réinitialise l'affichage
    
    joueurs.forEach((j, i) => {
        j.scores.push(0); // Ajoute une manche vide pour ce joueur
        let row = `<tr><td>${j.name}</td>`;
        j.scores.forEach((s, mIndex) => {
            row += `<td><input type="number" class="score-input" onchange="majScore(${i}, ${mIndex}, this.value)" value="${s}"></td>`;
        });
        row += `</tr>`;
        tbody.innerHTML += row;
    });
}

function majScore(joueurIndex, mancheIndex, valeur) {
    joueurs[joueurIndex].scores[mancheIndex] = parseInt(valeur) || 0;
    calculerPodium();
}

function calculerPodium() {
    let podiumDiv = document.getElementById('podium');
    // On calcule le total pour chaque joueur
    let classement = joueurs.map(j => ({
        name: j.name, 
        total: j.scores.reduce((a, b) => a + b, 0)
    })).sort((a, b) => b.total - a.total);

    podiumDiv.innerHTML = "<h3>Classement</h3>" + 
        classement.map((j, i) => `<p>${i+1}. ${j.name} : <b>${j.total} pts</b></p>`).join("");
}    calculerPodium();
}

function calculerPodium() {
    let podiumDiv = document.getElementById('podium');
    let classement = [...joueurs].sort((a, b) => b.score - a.score);
    podiumDiv.innerHTML = "<h3>Classement</h3>" + 
        classement.map((j, i) => `<p>${i+1}. ${j.name} : <b>${j.score} pts</b></p>`).join("");
}
