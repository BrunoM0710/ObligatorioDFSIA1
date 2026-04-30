import mongoose from "mongoose";
import perfume from "../models/perfume.model.js";
import {
  altaPerfumeService,
  obtenerPerfumesService,
  eliminarPerfumeService,
  obtenerPerfumesPorProyeccionService,
  obtenerPerfumesPorConcentracionService,
  encontrarPorMarcaYNombreService,
} from "../services/perfumes.services.js";
import { obtenerImagenPerfume } from "../services/unsplash.service.js";
import { upload } from "../middlewares/multer.middleware.js";
import { runMulterSingle } from "../utils/multer.util.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.util.js";
import cloudinary from "../config/cloudinary.js";
export const altaPerfume = async (req, res, next) => {
  try {
    // 👇 procesa imagen si viene
    await runMulterSingle(upload, "imagen", req, res);

    let imagenUrl = null;

    if (req.file) {
      const result = await uploadBufferToCloudinary(
        cloudinary,
        req.file.buffer,
        {
          resource_type: "auto",
          folder: "perfumes",
        },
      );

      imagenUrl = result.secure_url;
    }

    const nuevoPerfume = await altaPerfumeService({
      ...req.body,
      imagen: imagenUrl, 
    });

    return res.status(201).json(nuevoPerfume);
  } catch (error) {
    next(error);
  }
};

export const bajaPerfume = async (req, res, next) => {
  const { id } = req.params;

  try {
    const perfumeEliminado = await eliminarPerfumeService(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const obtenerPerfumes = async (req, res, next) => {
  const { page, limit } = req.query;

  try {
    const respuesta = await obtenerPerfumesService(page, limit);
    res.status(200).json(respuesta);
  } catch (error) {
    next(error);
  }
};

export const obtenerPerfumesPorProyeccion = async (req, res, next) => {
  try {
    const { proyeccion } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const respuesta = await obtenerPerfumesPorProyeccionService(
      proyeccion,
      page,
      limit,
    );

    res.status(200).json(respuesta);
  } catch (error) {
    next(error);
  }
};

export const obtenerPerfumesPorConcentracion = async (req, res, next) => {
  try {
    const { concentracion } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const respuesta = await obtenerPerfumesPorConcentracionService(
      concentracion,
      page,
      limit,
    );

    res.status(200).json(respuesta);
  } catch (error) {
    next(error);
  }
};
