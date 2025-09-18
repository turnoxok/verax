exports.handler = async (event) => {
  const data = JSON.parse(event.body || '{}');
  if (!data.dni || !data.report) return { statusCode: 400, body: 'Faltan datos' };

  // Aquí podrías guardar en DB o enviar por mail
  console.log('DNI:', data.dni);
  console.log('Reporte:', data.report);

  return { statusCode: 200, body: 'Reporte recibido' };
};
