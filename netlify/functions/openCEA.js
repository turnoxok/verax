const chromium = require('chrome-aws-lambda');

exports.handler = async (event) => {
  const dni = event.queryStringParameters?.dni;
  if (!dni) return { statusCode: 400, body: "Falta DNI" };

  let browser = null;
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto('https://www.informescea.com.ar/', { waitUntil: 'networkidle2' });

    // Login automático
    await page.type('#username', 'CONX');      // tu usuario CEA
    await page.type('#password', 'CONX2025');  // tu contraseña CEA
    await page.click('#loginButton');          // ajustar según CEA
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Consulta DNI
    await page.goto(`https://www.informescea.com.ar/consulta?dni=${dni}`, { waitUntil: 'networkidle2' });

    const html = await page.content();

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: html
    };

  } catch (err) {
    return { statusCode: 500, body: `Error: ${err.message}` };
  } finally {
    if (browser) await browser.close();
  }
};
