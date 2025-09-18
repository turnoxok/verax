import fetch from "node-fetch"; // asegurate de usar "type":"module" en package.json

export const handler = async (event) => {
  const { token } = event.queryStringParameters;

  if (!token) {
    return { statusCode: 400, body: "Token faltante" };
  }

  // Aquí validarías el token con tu "DB" o memoria si querés expiración
  // Por simplicidad, aceptamos cualquier token generado recientemente

  const usuarioCEA = "CONX";
  const claveCEA = "CONX2025";

  // Redirigimos al usuario con un autologin (ejemplo con POST form embebido)
  const html = `
    <html>
    <body>
      <form id="f" action="https://www.informescea.com.ar/login" method="POST">
        <input type="hidden" name="usuario" value="${usuarioCEA}" />
        <input type="hidden" name="clave" value="${claveCEA}" />
      </form>
      <script>document.getElementById('f').submit();</script>
    </body>
    </html>
  `;

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: html
  };
};
