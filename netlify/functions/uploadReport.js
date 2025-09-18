exports.handler = async (event) => {
  const { token, reportData } = JSON.parse(event.body);

  // Aquí guardás reportData en tu base (puede ser Airtable, Fauna, Netlify KV, etc)
  console.log("Token:", token, "Datos del informe:", reportData);

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};
