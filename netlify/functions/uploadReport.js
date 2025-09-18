const fs = require("fs");
const path = require("path");

const TOKENS_FILE = path.join(__dirname, "../../tokens.json");

function loadTokens() {
  if (!fs.existsSync(TOKENS_FILE)) return {};
  return JSON.parse(fs.readFileSync(TOKENS_FILE, "utf8"));
}

function saveTokens(tokens) {
  fs.writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 2));
}

exports.handler = async (event) => {
  const { token } = event.queryStringParameters || {};
  if (!token) {
    return { statusCode: 400, body: "Falta el token" };
  }

  let tokens = loadTokens();

  if (!tokens[token]) {
    return { statusCode: 403, body: "Token inválido" };
  }
  if (tokens[token].used) {
    return { statusCode: 403, body: "Token ya utilizado" };
  }

  // Marcar token como usado
  tokens[token].used = true;
  saveTokens(tokens);

  // 🔥 Acá mostrarías tu frontend embebido para que el usuario suba su informe CEA
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: `
      <html>
        <head><title>Subir Informe</title></head>
        <body>
          <h2>Subí tu informe comercial (PDF/Imagen)</h2>
          <form action="/.netlify/functions/processUpload?token=${token}" method="POST" enctype="multipart/form-data">
            <input type="file" name="informe" accept=".pdf,.jpg,.png" required />
            <button type="submit">Enviar</button>
          </form>
        </body>
      </html>
    `
  };
};
