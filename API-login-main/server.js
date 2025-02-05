const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./database.json");
let userdb = JSON.parse(fs.readFileSync("./usuarios.json", "UTF-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";

function createToken(payload, expiresIn = "12h") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

function usuarioExiste(username, senha) {
  return (
    userdb.usuarios.findIndex(
      (user) => user.username === username && user.senha === senha
    ) !== -1
  );
}

server.post("/public/registrar", (req, res) => {
  const { username, senha } = req.body;
  if (usuarioExiste(username, senha)) {
    const status = 500;
    const message = "Usuario já existente!";
    res.status(status).json({ status, message });
    return;
  } else {
    fs.readFile("./usuarios.json", (err, data) => {
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({ status, message });
        return;
      }

      const json = JSON.parse(data.toString());

      const last_item_id =
        json.usuarios.length > 0
          ? json.usuarios[json.usuarios.length - 1].id
          : 0;

      json.usuarios.push({
        id: last_item_id + 1,
        username,
        senha,
        favoritos: [],
      });
      fs.writeFile("./usuarios.json", JSON.stringify(json), (err) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      });
      userdb = json;
    });
  }
  const access_token = createToken({ username, senha });
  res.status(200).json({ access_token });
});

server.post("/public/login", (req, res) => {
  const { username, senha } = req.body;
  if (!usuarioExiste(username, senha)) {
    const status = 401;
    const message = "Usuario ou senha incorretos!";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ username, senha });
  let user = {
    ...userdb.usuarios.find(
      (user) => user.username === username && user.senha === senha
    ),
  };
  delete user.senha;
  res.status(200).json({ access_token, user });
});

server.use(router);

server.listen(8000, () => {
  console.log("API disponível em http://localhost:8000");
});
