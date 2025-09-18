exports.handler = async function(event) {
  // Genera un token aleatorio
  const token = Math.random().toString(36).substring(2, 10);
  
  // Opcional: podrías guardar token en DB o en memoria para expiración
  return {
    statusCode: 200,
    body: JSON.stringify({ token })
  };
}
