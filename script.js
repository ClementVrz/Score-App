let joueurs = [];
let totalManches = 0;
let mancheActuelle = 0;

function validerConfig() {
    let n = document.getElementById('nbJoueurs').value;
    totalManches = document.getElementById('nbManches').value;
    let div = document.getElementById('configDetails');
    div.innerHTML = "<h3>Noms :</h3>";
    for(let i=0; i<n; i++) div.innerHTML += `<input type="text" class="nomJoueur" placeholder="Joueur ${i+1}"><br>`;
    div.innerHTML += `<label><input type="checkbox" id="avecEquipes"> Équipes aléatoires</label><br>`;
    div.innerHTML += `<button onclick="demarrer()">Démarrer</button>`;
}

function demarrer() {
    let noms = Array.from(document.querySelectorAll('.nomJoueur')).map(i => i.value);
    if(document.getElementById('avecEquipes').checked) {
        noms = noms.sort(() => Math.random() - 0.5);
        joueurs = [{name: "Équipe 1 ("+noms.slice(0,noms.length/2).join(',')+")", scores: []}, 
                   {name: "Équipe 2 ("+noms.slice(noms.length/2).join(',')+")", scores: []}];
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
    if(mancheActuelle >= totalManches) return afficherPodium();
    mancheActuelle++;
    let tbody = document.getElementById('tableBody');
    let row = `<tr><td>M${mancheActuelle}</td>`;
    joueurs.forEach((j, i) => {
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
