import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { CohereClient } from "cohere-ai";

dotenv.config();

const cohere = new CohereClient({
    token: process.env.OPEN_API_KEY
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: "Hola ;M"
    });
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        
        // Agregar un prefijo que indique al modelo que debe responder en español
        const prefijo = "Responde siempre en español: ";
        const promptEnEspañol = prefijo + prompt;

        const response = await cohere.generate({
            prompt: promptEnEspañol, // El prompt incluye la instrucción para responder en español
            max_tokens: 3000, // Ajusta el número de tokens según sea necesario
        });

        console.log(response);
        res.status(200).send({
            bot: response.generations[0].text // La respuesta estará en español
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
