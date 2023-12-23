require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jsxEngine = require('jsx-view-engine')
const Vegetable = require('./models/vegetables')
const PORT = process.env.PORT || 3000
const app = express()

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
  console.log('We are connected to mongodb')
})

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

// Index Route

app.get('/vegetables', async (req,res) => {
  try {
    const foundVegetables = await Vegetable.find({})
    res.render('vegetables/Index', {
      vegetables: foundVegetables
    })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

// New Route

app.get('/vegetables/new', (req, res) => {
  res.render('vegetables/New')
})

// Create Route

app.post('/vegetables', async (req, res) => {
  if (req.body.readyToEat === 'on') {
    req.body.readyToEat = true
  } else {
    req.body.readyToEat = false
  }
  try {
    const createdVegetable = await Vegetable.create(req.body)
    res.send(createdVegetable)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

// Show Route

app.get('/vegetables/:id', async (req, res) => {
  try {
    const foundVegetable = await Vegetable.findOne({_id: req.params.id})
    res.render('vegetables/Show', {
      vegetable: foundVegetable
    })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})


app.listen(PORT, () => {
  console.log(`${PORT} is working`)
})