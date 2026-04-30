import app from "./v1/app.js";
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Servidor local corriendo en
http://localhost:${PORT}`);
});
