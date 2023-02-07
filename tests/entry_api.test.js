const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Entry = require('../models/entry')

const initialEntries = [
    
    {
        "entryTitle": "Entry 1",
        "mediaTitle": "VALORANT",
        "date": "1/1/1",
        "text": "I played VALORANT today and I hated it",
        "tags": ["bad", "horrible", "plat"]
    },
    {
        "entryTitle": "Entry 2",
        "mediaTitle": "Mario",
        "date": "1/2/1",
        "text": "I played Mario today and I loved it",
        "tags": ["great", "nintendo", "fun"]
    }
    
]

beforeEach(async () => {
  await Entry.deleteMany({})
  let entryObject = new Entry(initialEntries[0])
  await entryObject.save()
  entryObject = new Entry(initialEntries[1])
  await entryObject.save()
})


test('correct number of entries from GET request', async () => {
    const response = await api.get('/api/entries')

    expect(200)
    expect(response.body).toHaveLength(2)
})

test('id property is defined', async () => {
    const entries = await api.get('/api/entries')

    expect(200)
    expect(entries.body[0].id).toBeDefined()
})

test('length is correct after POST', async () => {
    const newEntry = new Entry({
        "entryTitle": "Entry 3",
        "mediaTitle": "Overwatch",
        "date": "1/4/1",
        "text": "I played OW today and I loved it",
        "tags": ["great", "blizzard", "fun"]
    })

    await api.post('/api/entries').send(newEntry).expect(201)

    const entries = await api.get('/api/entries')
    expect(entries.body).toHaveLength(initialEntries.length + 1)
})


//add additional tests for deletion and authentication

afterAll( () => {
    mongoose.connection.close()
})