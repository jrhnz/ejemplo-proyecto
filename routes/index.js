var express = require('express');
var router = express.Router();
const Habit = require('../models/habit');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/habits', async (req, res) => { 
  try {
    const habits = await Habit.find();
    res.json(habits);  
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving habits' });
  }
});

router.post('/habits', async (req, res) => {
  try {
    const { title, description } = req.body;
    const habit = new Habit({ title, description });
    await habit.save(); 
    res.json(habit); 
  } catch (err) {
    res.status(400).json({ message: 'Error creating habit' });
  }
});

router.delete('/habits/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Habit deleted' }); // Change status code to 200
  } catch (err) {
    res.status(500).json({ message: 'Habit not found' }); // Change status code to 500
  }
});

module.exports = router;
