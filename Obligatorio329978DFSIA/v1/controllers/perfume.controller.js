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

export const altaPerfume = async (req, res, next) => {
  try {
    const { nombre, marca } = req.body;
    const imagen = await obtenerImagenPerfume(nombre, marca);
    if (encontrarPorMarcaYNombreService(nombre, marca)) {
      return res.status(409).json({ message: "Perfume ya existe" });
    }
    const nuevoPerfume = await altaPerfumeService({ ...req.body, imagen });
    return res.status(201).json(nuevoPerfume);
  } catch (error) {
    next(error);
  }
};
export const bajaPerfume = async (req, res, next) => {
  const { id } = req.params;

  try {
    const perfumeEliminado = await eliminarPerfumeService(id);
    res.status(204).json({ message: "Perfume eliminado correctamente" });
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
