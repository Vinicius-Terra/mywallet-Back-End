import express from 'express';
import router from './routes/index.js';
import cors from 'cors';

//Starting the server 
const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Server is litening on port ${process.env.PORT}.`);
});