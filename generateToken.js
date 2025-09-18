// netlify/functions/generateToken.js
exports.handler = async () => {
  const token = Math.random().toString(36).substring(2, 10); // token aleatorio simple
  return {
    statusCode: 200,
    body: JSON.stringify({ token })
  };
};
