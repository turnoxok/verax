// Placeholder: sirve para recibir y guardar el informe si querés
exports.handler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  // Ejemplo: guardar JSON en DB o S3
  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, recibido: body })
  };
};
