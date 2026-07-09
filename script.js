let joueurs = [];
let nbManchesMax = 0;
let nbManchesJouees = 0;

function genererChamps() {
    let n = parseInt(document.getElementById('numPlayers').value);
    let container = document.getElementById('inputNames');
    container.innerHTML = "<h3>Noms des joueurs :</h3>";
    for(let i=0; i<n; i++) {
        container.innerHTML += `<input type="text" class="nomJoueur" placeholder="Joueur ${i+1}"><br>`;
    }
    document.getElementById('options').style.display = 'block';
}

function demarrerJeu() {
    let inputs = document.querySelectorAll('.nomJoueur');
    let nbEquipes = parseInt(document.getElementById('nbEquipes').value) || 0;
    nbManchesMax = parseInt(document.getElementById('nbManches').value) || 1;
    
    let noms = Array.from(inputs).map(i => i.value);
    
    // Logique équipes
    if (nbEquipes > 1) {
        noms = noms.sort(() => Math.random() - 0.5);
        joueurs = Array.from({length: nbEquipes}, (_, i) => ({
            name: `Équipe ${i + 1} (${noms.filter((_, idx) => idx % nbEquipes === i).join(', ')})`,
            scores: []
        }));
    } else {
        joueurs = noms.map(name => ({name, scores: []}));
    }

    document.getElementById('setup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    ajouterManche();
}

function ajouterManche() {
    if (nbManchesJouees >= nbManchesMax) {
        alert("La partie est terminée !");
        return;
    }
    nbManchesJouees++;
    // ... (le reste du code ajouterManche ne change pas)
}

function calculerPodium() {
    // ... (même code que précédemment)
    // Ajout d'un message si fin
    if (nbManchesJouees === nbManchesMax) {
        podium.innerHTML += `<h3>🏆 Vainqueur : ${classement[0].name} !</h3>`;
    }
}
