const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const DB = {
    games: [
        {
            id: 8,
            title: "Call Of Duty",
            year: 2019,
            price: 60
        },

        {
            id: 65,
            title: "Sea of Thieves",
            year: 2018,
            price: 40
        },

        {
            id: 4,
            title: "Minecraft",
            year: 2012,
            price: 20
        },
    ]
}

app.get("/games", (req, res) => {
    res.statusCode = 200; 
    res.json(DB.games);
});

app.get("/game/:id", (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400); 
    } else {
        const id = parseInt(req.params.id); 

        const game = DB.games.find(game => game.id == id);

        if(game != undefined) {
            res.statusCode = 200;
            res.json(game);
        } else {
            res.sendStatus(404);
        }
    }
});

app.post("/game", (req, res) => {
    const {title, price, year} = req.body; 

    DB.games.push({
        id: 80,
        title,
        price,
        year
    });
    res.sendStatus(200);
});

app.delete("/game/:id", (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400); 
    } else {
        const id = parseInt(req.params.id); 
        const index = DB.games.findIndex(game => game.id == id); 

        if(index == -1) {
            //elemento não existe
            res.statusCode(404);
        } else {
            DB.games.splice(index, 1); 
            res.sendStatus(200); 
        }
    }
});

app.put("/game/:id", (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400); 
    } else {
        const id = parseInt(req.params.id); 
        const game = DB.games.find(game => game.id == id);

        if(game != undefined) {
            const {title, price, year} = req.body; //pegando os dados do corpo da requisição para a edição
            if(title != undefined) {
                game.title = title;
            }

            if(price != undefined) {
                game.price = price;
            }

            if(year != undefined) {
                game.year = year;
            }

            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
});

app.listen(8080, () => {
    console.log("API rodando");
});