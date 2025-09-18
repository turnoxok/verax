// netlify/functions/generateToken.js
exports.handler = async function(event, context) {
  // Genera un token simple de prueba (no seguro, solo para test)
  const token = Math.random().toString(36).substring(2, 12);

  return {
    statusCode: 200,
    body: JSON.stringify({ token })
  };
};
