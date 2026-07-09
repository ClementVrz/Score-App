let points = 0;
function ajouterPoint() {
    points++;
    document.getElementById('score').innerText = points;
}
function reset() {
    points = 0;
    document.getElementById('score').innerText = points;
}
