import app from "./app.js";
import 'dotenv/config'

// Puerto
const PORT = process.env.PORT || 3000
// @ts-ignore
app.listen(PORT, ()=>{ console.log( `Escuchando el puerto  ${PORT}`)})
