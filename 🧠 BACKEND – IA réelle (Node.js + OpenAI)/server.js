import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/correct", async (req, res) => {
    const { task1, task2, task3 } = req.body;

    const prompt = `
Tu es examinateur officiel du TCF Canada – Expression écrite.

Analyse les 3 tâches suivantes :

TÂCHE 1 :
${task1}

TÂCHE 2 :
${task2}

TÂCHE 3 :
${task3}

Donne :
1. Corrections grammaticales
2. Commentaires de cohérence
3. Lexique
4. Structure
5. Respect des consignes
6. Niveau CECR estimé (A2 à C1)
7. Estimation du score TCF Canada
8. Conseils pour améliorer
`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2
        });

        res.json({
            feedback: completion.choices[0].message.content
        });
    } catch (err) {
        res.status(500).json({ error: "Erreur IA" });
    }
});

app.listen(3000, () =>
    console.log("🧠 Serveur IA actif sur http://localhost:3000")
);
