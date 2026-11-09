import { ObtenerRespuestaDeIaService } from "../services/ai.services.js";

export const ObtenerRespuestaDeIa = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const respuesta = await ObtenerRespuestaDeIaService(prompt);

    res.status(200).json({
      respuesta,
    });
  } catch (error) {
    next(error);
  }
};
