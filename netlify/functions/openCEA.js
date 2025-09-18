// netlify/functions/openCEA.js
import chromium from "chrome-aws-lambda";

export const handler = async (event) => {
  try {
    const { token, dni } = event.queryStringParameters || {};

    // Validación simple de token
    if (!token || token !== "pfqwngx8") {
      return {
        statusCode: 401,
        body: "Token inválido",
      };
    }

    if (!dni) {
      return {
        statusCode: 400,
        body: "Falta el parámetro DNI",
      };
    }

    // Iniciamos navegador sin cabeza
    const browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Abrimos CEA login
    await page.goto("https://www.informescea.com.ar/login", { waitUntil: "networkidle2" });

    // Autocompletamos usuario y contraseña
    await page.type("#username", "CONX");      // tu usuario
    await page.type("#password", "CONX2025");  // tu contraseña
    await page.click("#loginButton");          // botón login
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    // Ingresamos el DNI a consultar
    await page.goto(`https://www.informescea.com.ar/consulta?dni=${dni}`, { waitUntil: "networkidle2" });

    // Tomamos el HTML de la página de resultados
    const html = await page.content();

    await browser.close();

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: html,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "Error interno al generar el informe",
    };
  }
};
