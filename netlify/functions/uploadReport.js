exports.handler = async function(event) {
  const data = JSON.parse(event.body || "{}");

  if (!data.dni || !data.informe) {
    return { statusCode: 400, body: "Faltan datos" };
  }

  // Aquí guardás donde quieras (DB, Google Sheets, S3, etc.)
  console.log("Informe recibido:", data);

  return { statusCode: 200, body: "Informe guardado correctamente" };
};
