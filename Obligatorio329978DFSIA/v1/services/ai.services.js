import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  apiUrl: process.env.GROQ_API_URL,
});

export const ObtenerRespuestaDeIaService = async (prompt) => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "openai/gpt-oss-120b",
    temperature: 1,
    max_completion_tokens: 2048,
    top_p: 1,
    reasoning_effort: "medium",
    stop: null,
  });
  return chatCompletion.choices[0].message.content;
};
export const generarDescripcionPerfumeService = async (perfume) => {
  const prompt = `
Eres un experto en perfumería y redacción comercial
para una tienda de lujo llamada Maison Sillage.

Genera una descripción atractiva, elegante y profesional
para el siguiente perfume:

Nombre: ${perfume.nombre}
Marca: ${perfume.marca}
Familia olfativa: ${perfume.familiaOlfativa}
Concentración: ${perfume.concentracion || "No especificada"}
Duración: ${perfume.duracion || "No especificada"}
Proyección: ${perfume.proyeccion || "No especificada"}

Reglas:
- Escribe en español.
- Utiliza entre 50 y 80 palabras.
- No inventes notas olfativas ni características técnicas.
- No incluyas precios ni información de stock.
- Evita afirmaciones no respaldadas por los datos.
- Devuelve únicamente la descripción.
`;

  const respuesta = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  const descripcion = respuesta.choices[0]?.message?.content?.trim();

  if (!descripcion) {
    throw new Error("Groq no generó una descripción válida");
  }

  return descripcion;
};
