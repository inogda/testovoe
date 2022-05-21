import express from 'express';
import fileupload from "express-fileupload";
import cors from "cors";
import data from './data.js';

const app = express();



// получение данных working по пути /rest/working
app.get('/rest/working', (req, res) => {
    res.send(data.working.workingItem);
});

app.get('/', (req, res) => {
    res.send('Server is ready');
});


// ниже загрузка файла с фронтенда по пути /upload-file
app.use(
    fileupload({
        createParentPath: true,
    }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/rest/upload-file.php", async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: "failed",
                message: "No file uploaded",
            });
        } else {
            let file = req.files.file;

            console.log(req.files);

            file.mv("./frontend/public/img/photo/" + file.name);

            res.send({
                status: "success",
                message: "File is uploaded",
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size,
                },
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});



