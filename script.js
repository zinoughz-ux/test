// ⏱️ TIMER 60 MINUTES
let time = 60 * 60;

setInterval(() => {
    if (time <= 0) {
        finish();
        return;
    }
    time--;
    const min = Math.floor(time / 60);
    const sec = time % 60;
    document.getElementById("timer").textContent =
        `⏱️ Temps restant : ${min}:${sec.toString().padStart(2, "0")}`;
}, 1000);

// 🧮 COMPTEUR DE MOTS
function countWords(text) {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

["task1", "task2", "task3"].forEach((id, index) => {
    document.getElementById(id).addEventListener("input", e => {
        document.getElementById(`count${index + 1}`).textContent =
            countWords(e.target.value);
    });
});

// 📊 ÉVALUATION BASIQUE
function finish() {
    document.getElementById("result").classList.remove("hidden");

    const w1 = countWords(task1.value);
    const w2 = countWords(task2.value);
    const w3 = countWords(task3.value);

    let score = 0;
    if (w1 >= 60 && w1 <= 120) score++;
    if (w2 >= 120 && w2 <= 150) score++;
    if (w3 >= 120 && w3 <= 180) score++;

    document.getElementById("feedback").textContent =
        `Tâches conformes : ${score}/3`;

    document.getElementById("level").textContent =
        `Niveau estimé : ${getLevel(score)}`;
}

function getLevel(score) {
    if (score === 1) return "A2";
    if (score === 2) return "B1 / B2";
    if (score === 3) return "B2 / C1";
    return "Insuffisant";
}

// 🧠 CORRECTION FRONTEND (grammaire / répétitions / longueur)
function correctFrontend() {
    document.getElementById("ia-result").classList.remove("hidden");
    const feedback = [];

    ["task1", "task2", "task3"].forEach((id, index) => {
        const text = document.getElementById(id).value;
        const words = countWords(text);

        let taskFeedback = `Tâche ${index + 1} :\n`;
        // Vérifier longueur
        if (index === 0 && (words < 60 || words > 120)) taskFeedback += "- Longueur hors norme (60–120 mots)\n";
        if (index === 1 && (words < 120 || words > 150)) taskFeedback += "- Longueur hors norme (120–150 mots)\n";
        if (index === 2 && (words < 120 || words > 180)) taskFeedback += "- Longueur hors norme (120–180 mots)\n";

        // Vérifier répétitions simples
        const wordsArray = text.toLowerCase().split(/\s+/);
        const wordCounts = {};
        wordsArray.forEach(w => { wordCounts[w] = (wordCounts[w] || 0) + 1; });
        const repeated = Object.entries(wordCounts).filter(([w,c]) => c > 4);
        if (repeated.length > 0) taskFeedback += `- Répétitions fréquentes : ${repeated.map(r=>r[0]).join(", ")}\n`;

        // Vérifier ponctuation basique
        if (!text.match(/[.?!]/)) taskFeedback += "- Attention : phrase sans ponctuation\n";

        feedback.push(taskFeedback);
    });

    document.getElementById("ia-feedback").textContent = feedback.join("\n");
}
