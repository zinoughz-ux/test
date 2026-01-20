from fastapi import FastAPI 
from pydantic import BaseModel 
import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

class Demande(BaseModel):
texte: str 
tache: str 
niveau: str
PROMPT = """
Tu es examinateur officiel du TCF Canada.
Analyse ce texte selon :
1. Respect de la consigne
2. Organisation (intro, développement, conclusion) 
3. Grammaire
4. Vocabulaire
5. Cohérence

Donne :
- Une note estimée (/20)
- Le niveau atteint
- 5 erreurs importantes
- Une version améliorée
- Des conseils précis pour progresser 
"""

@app.post("/corriger")
def corriger(data: Demande):
response = openai.ChatCompletion.create(
model="gpt-4", 
messages=[
{"role": "system", "content": PROMPT}, 
{"role": "user", "content": data.texte}
]
)
return {"resultat": response.choices[0].message.content}
