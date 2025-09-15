import fetch from "node-fetch";

// Handler principal
export async function handler(event) {
  // Permitir OPTIONS para CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  // Solo POST permitido
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ respuesta: "Método no permitido" }),
    };
  }

  const { messages, notifyWhatsApp } = JSON.parse(event.body || "{}");

  if (!messages || !Array.isArray(messages)) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ respuesta: "No se recibieron mensajes válidos." }),
    };
  }

  const apiKey = process.env.OPENAI_API_KEY;

  try {
    // 1️⃣ Llamada a OpenAI
    const respuestaIA = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.7,
      }),
    });

    const data = await respuestaIA.json();
    const texto = data.choices?.[0]?.message?.content?.trim() || "No pude responderte esta vez.";

    // 2️⃣ Opcional: avisar por WhatsApp usando CallMeBot
    if (notifyWhatsApp) {
      const phone = process.env.WHATSAPP_PHONE;
      const apikey = process.env.WHATSAPP_APIKEY;
      const mensaje = encodeURIComponent("🔔 Alguien está hablando con Ianna.");
      try {
        await fetch(`https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${mensaje}&apikey=${apikey}`);
        console.log("Aviso enviado por WhatsApp");
      } catch (err) {
        console.error("Error enviando WhatsApp", err);
      }
    }

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ respuesta: texto }),
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ respuesta: "Error interno: no pude contactar con Padre IANN." }),
    };
  }
}
