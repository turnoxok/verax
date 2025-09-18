exports.handler = async () => {
  const token = Math.random().toString(36).substring(2, 12);
  return {
    statusCode: 200,
    body: JSON.stringify({ token })
  };
};
