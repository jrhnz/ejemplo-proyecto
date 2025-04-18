
const app = require('./app'); // Importa el archivo app.js




require('./config/database'); // Importa y ejecuta el archivo de configuración de la base de datos
// ...existing code...
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// ...existing code...
