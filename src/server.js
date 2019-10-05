require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

mongoose.connect(
	"mongodb+srv://omnistack:omnistack@cluster0-vptcl.mongodb.net/semana09?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

const connectedUsers = {};

io.on("connection", socket => {
	const { user_id } = socket.handshake.query;

	connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
	req.io = io;
	req.connectedUsers = connectedUsers;

	return next();
});

// GET = Metodo que busca algo,
// POST = Metodo que cria algo,
// PUT = Metodo que edita algo,
// DELETE

// req.query = Acessar query params || retornar valores = para filtros
// req.params = Acessar route params || retornar valores = para alterar ou deletar
// req.body = Acessar corpo da requisição = criação ou edição

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes); // importado do meu arquivo de rotas

app.post("/users", (req, res) => {
	return res.json(req.body);
});

server.listen(3333);
