// register root file untuk menggunakan sourcemap
import 'source-map-support/register'

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
// import mongodb from 'mongodb'
import mongoose from 'mongoose'
// import { Customer, CustomerType } from './mongodb'
import { Customer, CustomerType } from './mongoose'

async function initApp() {
  const app = express()

  //init db mongodb
  // const connection = await mongodb.connect(`${process.env.MONGODB_URI}`, { useUnifiedTopology: true })
  // const db = connection.db(`${process.env.MONGODB_NAME}`)
  // const CustomerModel = new Customer(db)

  //init db mongose
  await mongoose.connect(`${process.env.MONGODB_URI}`, { useUnifiedTopology: true })
  const CustomerModel = new Customer()

  app.use(bodyParser.json())

  // CRUD CUSTOMERS
  app.post('/customer', async function (req, res, next) {
    try {
      await CustomerModel.create(req.body)
    } catch (error) {
      return next(error)
    }
    res.send({ success: true })
  })

  app.get('/customer', async function (req, res, next) {
    let customers: CustomerType[]
    try {
      customers = await CustomerModel.getAll()
    } catch (error) {
      return next(error)
    }
    return res.send(customers)
  })

  app.get('/customer/:id', async function (req, res, next) {
    let customer: CustomerType | null
    try {
      customer = await CustomerModel.getByID(req.params.id)
    } catch (error) {
      return next(error)
    }
    return res.send(customer)

  })

  app.put('/customer/:id', async function (req, res, next) {
    try {
      await CustomerModel.update(req.params.id, req.body)
    } catch (error) {
      return next(error)
    }

    res.send({ success: true })
  })

  app.delete('/customer/:id', async function (req, res, next) {
    try {
      await CustomerModel.delete(req.params.id)
    } catch (error) {
      return next(error)
    }

    res.send({ success: true })
  })

  app.delete('/customer/', async function (req, res, next) {
    try {
      await CustomerModel.deleteAll()
    } catch (error) {
      return next(error)
    }

    res.send({ success: true })
  })

  app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(500).send({
      success: false,
      message: err.message
    })
  })

  app.listen(process.env.PORT || 8000, () => {
    console.log(`App listen on port ${process.env.PORT || 8000}`)
  })
}

initApp()