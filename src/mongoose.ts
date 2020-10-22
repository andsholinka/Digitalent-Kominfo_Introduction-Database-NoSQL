import mongoose from 'mongoose'

export type CustomerType = {
  first_name: string
  last_name: string
  age: number
  customer_type: string
  street: string
  city: string
  state: string
  zip_code: string
  phone_number: string
}

export type CustomerDocument = mongoose.Document & CustomerType

//schema definition
const CustomerSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, default: ' ', required: true },
  age: { type: Number, required: true },
  customer_type: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip_code: { type: String, required: true },
  phone_number: { type: String, required: true }
})

export class Customer {
  private model: mongoose.Model<CustomerDocument>

  constructor() {
    this.model = mongoose.model('customer', CustomerSchema)
  }

  async create(data: CustomerType) {
    try {
      const result = await this.model.create(data)
      console.log(`Insert result %j`, result)
    } catch (error) {
      throw error
    }
  }

  async getAll() {
    let customers: CustomerType[]
    try {
      customers = await this.model.find({})
    } catch (error) {
      throw error
    }

    return customers
  }

  async deleteAll() {
    try {
      await this.model.deleteMany({})
    } catch (error) {
      throw error
    }
  }

  async getByID(customerID: string) {
    let customer: CustomerType | null
    try {
      customer = await this.model.findById(customerID)
    } catch (error) {
      throw error
    }

    return customer
  }

  async update(customerID: string, data: Partial<CustomerType>) {
    try {
      await this.model.findByIdAndUpdate(customerID, { $set: data })
    } catch (error) {
      throw error
    }
  }

  async delete(customerID: string) {
    try {
      await this.model.findByIdAndDelete(customerID)
    } catch (error) {
      throw error
    }
  }

}