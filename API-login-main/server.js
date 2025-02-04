const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";
let userdb = JSON.parse(fs.readFileSync("./usuarios.json", "UTF-8"));

// Função para criar o token JWT
function createToken(payload, expiresIn = "12h") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verifica se o usuário com um determinado nome e senha já existe
function usuarioExiste({ usuario, senha }) {
  return (
    userdb.usuarios.findIndex(
      (user) => user.usuario === usuario && user.senha === senha
    ) !== -1
  );
}

// Verifica se o usuário (nome) já existe, independentemente da senha
function usuarioEmailExiste(usuario) {
  return userdb.usuarios.findIndex((user) => user.usuario === usuario) !== -1;
}

// Endpoint de registro (cadastro)
server.post("/public/registrar", (req, res) => {
  const { usuario, senha, confirmSenha } = req.body;

  // Validação de campos obrigatórios
  if (!usuario || !senha || !confirmSenha) {
    res
      .status(400)
      .json({ status: 400, message: "Campos obrigatórios faltando!" });
    return;
  }

  // Verifica se a senha e a confirmação são iguais
  if (senha !== confirmSenha) {
    res.status(400).json({ status: 400, message: "As senhas não coincidem!" });
    return;
  }

  // Verifica se o usuário já existe
  if (usuarioEmailExiste(usuario)) {
    res.status(401).json({ status: 401, message: "Usuário já foi utilizado!" });
    return;
  }

  fs.readFile("./usuarios.json", (err, data) => {
    if (err) {
      res.status(401).json({ status: 401, message: err });
      return;
    }

    const json = JSON.parse(data.toString());
    const last_item_id =
      json.usuarios.length > 0 ? json.usuarios[json.usuarios.length - 1].id : 0;

    // Cria o novo usuário com uma lista de favoritos vazia
    json.usuarios.push({ id: last_item_id + 1, usuario, senha, favoritos: [] });

    fs.writeFile("./usuarios.json", JSON.stringify(json), (err) => {
      if (err) {
        res.status(401).json({ status: 401, message: err });
        return;
      }
    });
    userdb = json;
  });

  const access_token = createToken({ usuario, senha });
  res.status(200).json({ access_token });
});

// Endpoint de login
server.post("/public/login", (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuarioExiste({ usuario, senha })) {
    res
      .status(401)
      .json({ status: 401, message: "Usuário ou senha incorretos!" });
    return;
  }

  const access_token = createToken({ usuario, senha });
  const user = {
    ...userdb.usuarios.find(
      (user) => user.usuario === usuario && user.senha === senha
    ),
  };
  delete user.senha; // Remove a senha do objeto retornado

  res.status(200).json({ access_token, user });
});

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
