const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const TOKENS_FILE = path.join(__dirname, "../../tokens.json");

// Helper para guardar tokens
function saveToken(token) {
  let tokens = {};
  if (fs.existsSync(TOKENS_FILE)) {
    tokens = JSON.parse(fs.readFileSync(TOKENS_FILE, "utf8"));
  }
  tokens[token] = { used: false, createdAt: Date.now() };
  fs.writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 2));
}

exports.handler = async (event) => {
  // ⚠️ En producción esto debería estar vinculado a un webhook de pago exitoso
  // Ejemplo simple: solo genera token si le pegan a esta ruta
  const token = uuidv4();
  saveToken(token);

  return {
    statusCode: 200,
    body: JSON.stringify({
      link: `https://miverax.netlify.app/.netlify/functions/uploadReport?token=${token}`
    })
  };
};
