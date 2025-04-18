var express = require('express');
var router = express.Router();
const Habit = require('../models/habit');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


// const authenticateToken = (req, res, next) => {
//   const token = req.header('Authorization');
  
//   if (!token) {
//     return res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });
//   }

//   try {
//     const tokenWithoutBearer = token.replace("Bearer ", "");
//     const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
//     req.user = verified; // Aquí guardamos los datos del usuario en la request
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(403).json({ error: "Token inválido o expirado" });
//   }
// };


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/habits',async (req, res) => { 
  try {
    //let userId = req.user._id &&  req.user.userId ? req.user.userId: res.status(500).json({message:"Error retriving message"}); // Obtener el ID del usuario desde el token
    
    //const habits = await Habit.find('userId', new mongoose.Types.ObjectId(userId)); // Filtrar hábitos por el ID del usuario
    const habits = await Habit.find(); // Filtrar hábitos por el ID del usuario

    res.json(habits);  
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving habits' });
  }
});

router.post('/habits', async (req, res) => {
  try {
    const { title, description } = req.body;
    

    //let userId = req.user._id &&  req.user.userId ? req.user.userId: res.status(500).json({message:"Error adding message"}); // Obtener el ID del usuario desde el token
    //userId= new mongoose.Types.ObjectId(userId); // Filtrar hábitos por el ID del usuario


    //const habit = new Habit({ title, descriptionn, userId });
    const habit = new Habit({ title, description });
    await habit.save(); 
    res.json(habit); 
  } catch (err) {
    res.status(400).json({ message: 'Error creating habit' });
  }
});

router.delete('/habits/:id' ,async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Habit deleted' }); // Change status code to 200
  } catch (err) {
    res.status(500).json({ message: 'Habit not found' }); // Change status code to 500
  }
});


router.patch('/habits/markasdone/:id',async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    habit.lastDone = new Date();
    if (timeDifferenceInHours(habit.lastDone, habit.lastUpdate) < 24) {
      habit.days = timeDifferenceInDays(habit.lastDone, habit.startedAt);
      habit.lastUpdate = new Date();
      await habit.save();
      return res.status(200).json({ message: 'Habit marked as done' });
    }else{
      habit.days = 1;
      habit.lastUpdate = new Date();
      habit.startedAt = new Date();
      await habit.save();
      return res.status(200).json({ message: 'Habit marked as done' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Habit not found' });
  }
});

const timeDifferenceInHours = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 )); 
  return diffDays;
}

const timeDifferenceInDays = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays;
}

module.exports = router;
