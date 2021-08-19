//Modules
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const JWTsecret = "fqaosas0qnq211k1mf";

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


function auth(req,res,next){
    //Salva o token recebido para acessar a rota (ex: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmLm1hcmluaG8xNjIwMDFAZ21haWwuY29tIiwiaWF0IjoxNjI5MDQzMzEzLCJleHAiOjE2MjkxMjk3MTN9.xr3wzsvS3W9WFjwT3C34Y3Z-hbv41anyXtIPqQ2M1ZI)
    const authToken = req.headers['authorization'];
    if(authToken != undefined){
        //Separa o texto entre o bearer e o token em si
        const bearer = authToken.split(' ');
        var token = bearer[1];
        //Descriptografa o token
        jwt.verify(token,JWTsecret,(err,data)=>{
            if(err){
                res.status(401);
                res.json({err: 'Token invalido'});
            }else{
                //Salva o token e as informaçoes do usuario em variaveis
                req.token = token;
                req.loggedUser = {id: data.id, email:data.email};
                next();
            }
        });
    }else{
        res.status(401);
        res.json({err: "Token invalido"});
    }
}

//Database
var DB = {
    games: [
        {
            id: 1,
            title: "Call of duty",
            year: 2000,
            price: 100
        },
        {
            id: 2,
            title: "Crossfire",
            year: 2001,
            price: 0
        },
        {
            id: 3,
            title: "Minecraft",
            year: 2012,
            price: 150
        },
        {
            id: 4,
            title: "pubg",
            year: 2016,
            price: 70
        },
    ],
    users: [
        {
            id: 1,
            name: "Felipe Marinho",
            email: "f.marinho162001@gmail.com",
            password: "felipemarinho2001"
        },
        {
            id: 2,
            name: "Beluz gonçalvez",
            email: "beluz@gmail.com",
            password: "beluznetao"
        }
    ]
}


//Routs
app.get("/games", (req,res) => {
    res.statusCode = 200;
    //Exibe as info do usuario salvo durante a autenticação do token
    res.json({games: DB.games});
});
app.get("/game/:id" , auth ,(req,res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);

    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(game => game.id == id);

        if(game == undefined){
            res.sendStatus(404);
        }else{
            res.json(game);
        }
    }
});
app.post("/game" , auth , (req,res) => {
    var {title,price,year} = req.body;
    DB.games.push({
        id: 44,
        title,
        price, 
        year
    });
    res.sendStatus(200);
});
app.delete("/game/:id" , auth ,(req,res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);

    }else{
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(game => game.id == id);
        console.log(index);
        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200);
        }
    }
});
app.put("/game/:id" , auth ,(req,res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);

    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find(game => game.id == id);
        
        if(game != undefined){
            var {title,price,year} = req.body;
            
            if(title !=undefined){
                game.title= title;
            }if(price != undefined){
                game.price = price;
            }if(year != undefined){
                game.year = year;
            }

            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
      
    }
});

app.post("/auth",(req,res)=>{
    var {email,password} = req.body;

    if(email != undefined){
        //Procura usuario pelo email
       var user = DB.users.find(user => user.email == email);
       //verifica se ele existe
        if(user != undefined){
            //verifica a senha
            if(user.password == password){
                //cria o token para um usuario
                jwt.sign({
                    id: user.id, 
                    email: user.email
                }, JWTsecret, {expiresIn:'24h'},(err, token) =>{
                    if(err){
                        res.status(400);
                        res.json({err:"Falha interna"})
                    }else{
                        res.status = 200;
                        res.json({token: token})
                    }
                });
            }else{
                res.status(401);
                res.json({err:"Credenciais inválidas"});
            }
        }else{
            res.status(404);
            res.json({err:"Email não existe"});
        }
    }else{
        res.status(400);
        res.json({err:"Email invalido"});
    }
});

//Server
app.listen(8080,()=>{
    console.log("API rodando");
});