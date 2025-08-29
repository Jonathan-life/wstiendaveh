require('dotenv').config();

const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const handleError = (res, error) => {
  console.error('Error de acceso a la base de datos:', error);
  res.status(500).json({ error: 'Error interno del servidor' });
};
 

//verbos
//get
//req = require (requerimientp ,comsulta , solicitud)
//res = reponse ( respuesta , resultado)
app.get('/vehiculos', async (req, res) => {
  try{
    const [rows] = await pool.query('SELECT * FROM vehiculos');
    res.status(200).json(rows);
  }catch(error){
    handleError(res, error);
  }
});

//posts

app.post('/vehiculos', async (req, res) => {
  const { marca, modelo, color, precio, placa } = req.body;

  if (!marca || !modelo || !color || !precio || !placa) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO vehiculos (marca, modelo, color, precio, placa) VALUES (?, ?, ?, ?, ?)',
      [marca, modelo, color, precio, placa]
    );

    const id = result.insertId; // campo correcto

    res.status(200).json({ id });
  } catch (error) {
    if (error){
      if(error.code === 'ER_DUP_EMTRY'){
        return res.status(409).json({error: 'la placa ya existe'})
      }
    }
    handleError(res, error);
  }
});

//put 
app.put('/vehiculos/:id', async (req, res) => {
  const {id} = req.params;
  const { marca, modelo, color, precio, placa } = req.body;

  if (!marca || !modelo || !color || !precio || !placa) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const [result] = await pool.query(
      "UPDATE vehiculos SET marca = ?, color = ?, precio = ?, placa = ? WHERE id = ?",
      [marca, modelo, color, precio, placa, id]
    );

    if (result.affectedRows === 0){
      return res.status(404).json({message: 'vehiculos no existe'})
    }

    res.status(200).json({message: 'vehiculo actualizado correctamente'})

    const id = result.insertId; // campo correcto

    res.status(200).json({ id });
  } catch (error) {
    if (error){
      if(error.code === 'ER_DUP_EMTRY'){
        return res.status(409).json({error: 'la placa ya existe'})
      }
    }
    handleError(res, error);
  }
});

app.delete('/vehiculos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM vehiculos WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Vehículo no encontrado' });
    }

    res.status(200).json({ message: 'Vehículo eliminado correctamente' });
  } catch (error) {
    handleError(res, error);
  }
});



app.listen(port, () => {
  console.log(`servidor iniciado en http://localhost:3000`)
});