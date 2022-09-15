const express = require('express')
const app = express()
const db = require('cyclic-dynamodb')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
// var options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
//   index: ['index.html'],
//   maxAge: '1m',
//   redirect: false
// }
// app.use(express.static('public', options))
// #############################################################################


// Create or Update an item
app.post('/:col/:key', async (req, res) => {
  console.log(req.body)

  const col = req.params.col
  const key = req.params.key
  console.log(`from collection: ${col} delete key: ${key} with params ${JSON.stringify(req.params)}`)
  const item = await db.collection(col).set(key, req.body)
  console.log(JSON.stringify(item, null, 2))
  res.json(item).end()
})

// Delete an item
app.delete('/:col/:key', async (req, res) => {
  const col = req.params.col
  const key = req.params.key
  console.log(`from collection: ${col} delete key: ${key} with params ${JSON.stringify(req.params)}`)
  const item = await db.collection(col).delete(key)
  console.log(JSON.stringify(item, null, 2))
  res.json(item).end()
})

// Get a single item
app.get('/:col/:key', async (req, res) => {
  const col = req.params.col
  const key = req.params.key
  console.log(`from collection: ${col} get key: ${key} with params ${JSON.stringify(req.params)}`)
  const item = await db.collection(col).get(key)
  console.log(JSON.stringify(item, null, 2))
  res.json(item).end()
})

// Get a full listing
app.get('/:col', async (req, res) => {
  const col = req.params.col
  console.log(`list collection: ${col} with params: ${JSON.stringify(req.params)}`)
  const items = await db.collection(col).list()
  console.log(JSON.stringify(items, null, 2))
  res.json(items).end()
})

app.get('/', (req,res) => {
  res.send("Entrou na rota correta!")
})

app.post('/', async (req,res) => {
  let nomeSetor = req.body.nomeSetor
  console.log(nomeSetor)
  console.log(req.body)
  
  const chave = Math.random().toString()
  const col = "ocorrencias"
  const item = await db.collection(col).set(chave, req.body)
  console.log(JSON.stringify(item, null, 2))
  res.json(item).end()
})

app.delete('/:chave', async (req,res) => {  
  const chave = req.params.chave
  const col = "ocorrencias"
  const item = await db.collection("ocorrencias").delete(chave, req.body)
  console.log(JSON.stringify(item, null, 2))
  res.json(item).end()
})

app.get('/p', (req,res) => {
  res.send("Entrou na segunda rota")
})

app.get('/o', (req,res) => {
  const items = await db.collection("ocorrencias").list()
  console.log(JSON.stringify(items, null, 2))
  res.json(items).end()
})

// Catch all handler for all other request.
app.use('*', (req, res) => {
  res.json({ msg: 'no route handler found' }).end()
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
