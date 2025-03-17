import express from 'express';
import cors from 'cors';
import system_design from './routes/system_design_routes.js';

const app = express();
app.use(cors({origin: "*"}));
app.use(express.json());

// app.use('/', (req, res) => {
//     return res.send("Server is starting fine")
// })

app.use('/system_design', system_design)
const PORT = process.env.PORT || 5000;
app.listen(PORT , () => {
    console.log("Server is running on port 5000");
})