import express from "express";
import authRouter from "./routes/auth.routes.js";
import { authenticateMiddleware } from "./middlewares/authenticate.middleware.js";
import perfumesRouter from "./routes/perfumes.routes.js";
import ordenesRouter from "./routes/orden.routes.js";
import usuariosRouter from "./routes/usuarios.routes.js";
import decantRouter from "./routes/decant.routes.js";
import uploadsRouter from "./routes/uploads.routes.js";
import aiRouter from "./routes/ai.routes.js";

const router = express.Router({ mergeParams: true });

//rutas de login y registro de usuarios, sin token

router.use("/auth", authRouter);
router.get("/perfumes", perfumesRouter);
router.get("/perfumes:id", perfumesRouter);


//middleware para verificar tokens
router.use(authenticateMiddleware);

//acceso endpoints protegidos
router.post("/perfumes", perfumesRouter);
router.delete("/perfumes", perfumesRouter);
router.use("/ordenes", ordenesRouter);
router.use("/usuarios", usuariosRouter);
router.use("/decant", decantRouter);
router.use("/uploads", uploadsRouter);
router.use("/ai", aiRouter);
export default router;
