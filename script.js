let joueurs = [], totalManches = 0, mancheActuelle = 0, modeJeu = 'max';

function validerConfig() {
    let n = document.getElementById('nbJoueurs').value;
    totalManches = document.getElementById('nbManches').value;
    modeJeu = document.getElementById('modeJeu').value;
    let div = document.getElementById('configDetails');
    div.innerHTML = "<h3>Noms :</h3>";
    for(let i=0; i<n; i++) div.innerHTML += `<input type="text" class="nomJoueur" placeholder="Joueur ${i+1}"><br>`;
    div.innerHTML += `<button onclick="demarrer()">Démarrer</button>`;
}

function demarrer() {
    let noms = Array.from(document.querySelectorAll('.nomJoueur')).map(i => i.value);
    if(document.getElementById('avecEquipes').checked) {
        noms = noms.sort(() => Math.random() - 0.5);
        joueurs = [{name: "Équipe 1", members: noms.slice(0,noms.length/2), scores: []}, 
                   {name: "Équipe 2", members: noms.slice(noms.length/2), scores: []}];
    } else {
        joueurs = noms.map(name => ({name, scores: []}));
    }
    document.getElementById('setup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    let head = document.getElementById('tableHead');
    joueurs.forEach(j => head.innerHTML += `<th>${j.name}</th>`);
    ajouterLigneManche();
}

function ajouterLigneManche() {
    let tbody = document.getElementById('tableBody');
    let row = `<tr><td>M${mancheActuelle + 1}</td>`;
    joueurs.forEach((j, i) => {
        row += `<td><input type="number" class="score-m${mancheActuelle} j${i}" value="0"></td>`;
    });
    tbody.innerHTML += row + "</tr>";
}

function validerManche() {
    joueurs.forEach((j, i) => {
        let val = parseInt(document.querySelector(`.score-m${mancheActuelle}.j${i}`).value) || 0;
        j.scores.push(val);
    });
    mancheActuelle++;
    if(mancheActuelle < totalManches) ajouterLigneManche();
    else calculerPodium();
}

function calculerPodium() {
    document.getElementById('btnValider').style.display = 'none';
    let classement = [...joueurs].sort((a, b) => modeJeu === 'max' ? b.total() - a.total() : a.total() - b.total());
    let podium = document.getElementById('podium');
    podium.innerHTML = "<h3>🏆 Vainqueur : " + classement[0].name + "</h3>";
}

// Extension pour le total automatique
joueurs.prototype.total = function() { return this.scores.reduce((a,b) => a+b, 0); };
// Note: Pour que .total() fonctionne, j'ajoute cette méthode aux objets joueurs
joueurs.forEach(j => j.total = function() { return this.scores.reduce((a,b) => a+b, 0); });    joueurs.forEach((j, i) => {
        row += `<td><input type="number" class="s-${mancheActuelle}-${i}" onchange="calculerTotal()"></td>`;
    });
    tbody.innerHTML += row + "</tr>";
}

function calculerTotal() {
    joueurs.forEach((j, i) => {
        let total = 0;
        for(let m=1; m<=mancheActuelle; m++) {
            total += parseInt(document.querySelector(`.s-${m}-${i}`).value) || 0;
        }
        j.total = total;
    });
    if(mancheActuelle < totalManches) ajouterLigneManche();
    else afficherPodium();
}

function afficherPodium() {
    let podium = document.getElementById('podium');
    let classment = [...joueurs].sort((a, b) => b.total - a.total);
    podium.innerHTML = "<h3>🏆 Vainqueur : " + classment[0].name + "</h3>";
}

function recommencer() {
    mancheActuelle = 0;
    document.getElementById('tableBody').innerHTML = "";
    document.getElementById('podium').innerHTML = "";
    ajouterLigneManche();
}
