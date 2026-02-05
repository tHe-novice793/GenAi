import express from "express";
import cors from "cors";
import { loadEnv } from "./env";
import { askStructured } from "./ask-core";


loadEnv();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: ["http://192.168.1.7:3000"],
    methods: ["POST", "GET", "OPTIONS", "DELETE"],
    allowedHeaders:['Content-Type', 'Authorization'],
    credentials: false
  }),
);

app.use(express.json())

app.post('/ask', async(req, res) => {
    try {
        const {query} = req.body ?? {};
        if(!query || !String(query).trim()){
            return res.status(400).json({
                error: "Field 'Query' is required."
            })
        }

        const output = await askStructured(query);

        return res.status(200).json(output)
        
    } catch (error: any) {
        return res.status(500).json({
            error: 'Failed to answer'
        })
    }
})

app.listen(PORT, ()=> {
    console.log(`API is listening to port ${PORT}`)
})