const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const logger = require('../utils/logger')

describe('one user in db at start', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const user = new User({ username: 'root', password: 'root' })
  
      await user.save()
    })
    
    jest.setTimeout(10000)

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await User.find({})
  
      const newUser = {
        username: 'gregg',
        name: 'Greg G',
        password: 'gregpwd',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await User.find({})
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('password too short throws an error', async () => {
    
        const newUser = {
          username: 'bobb',
          name: 'Bob B',
          password: 'se',
        }

        await api.post('/api/users').send(newUser).expect(400)
        
    })

    test('username too short throws an error', async () => {
        const newUser = {
          username: 'rr',
          name: 'Rob R',
          password: 'robpwd',
        }

        await api.post('/api/users').send(newUser).expect(400)
        
        })
    
        test('username not unique throws an error', async () => {    
        const newUser = {
          username: 'joej',
          name: 'Joe J',
          password: 'joepwd',
        }

        await api.post('/api/users').send(newUser).expect(201)
        await api.post('/api/users').send(newUser).expect(400)
        })
  })

  afterAll( () => {
    mongoose.connection.close()
})