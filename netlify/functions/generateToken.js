exports.handler = async () => {
  const token = Math.random().toString(36).substr(2, 10);
  return {
    statusCode: 200,
    body: JSON.stringify({ token })
  };
};
