import mongoose from 'mongoose'
import moment from 'moment-timezone'

const dateIndonesia = moment.tz(Date.now(), "Asia/Jakarta");
console.log(dateIndonesia)

export type TransactionType = {
    account_id: string
    amount: string
    date: Date
    description: string
}

export type TransactionDocument = mongoose.Document & TransactionType

//schema definition
const TransactionSchema = new mongoose.Schema({
    account_id: { type: String, required: true },
    amount: { type: String, required: true },
    date: { type: Date, default: dateIndonesia, required: true },
    description: { type: String, required: true }
})

export class Transaction {
    private model: mongoose.Model<TransactionDocument>

    constructor() {
        this.model = mongoose.model('transaction', TransactionSchema)
    }

    async create(data: TransactionType) {
        try {
            const result = await this.model.create(data)
            console.log(`Insert result %j`, result)
        } catch (error) {
            throw error
        }
    }

    async getAll() {
        let transactions: TransactionType[]
        try {
            transactions = await this.model.find({})
        } catch (error) {
            throw error
        }
        return transactions
    }

    async getByID(transactionID: string) {
        let transaction: TransactionType | null
        try {
            transaction = await this.model.findById(transactionID)
        } catch (error) {
            throw error
        }

        return transaction
    }

    async update(transactionID: string, data: Partial<TransactionType>) {
        try {
            await this.model.findByIdAndUpdate(transactionID, { $set: data })
        } catch (error) {
            throw error
        }
    }

    async delete(transactionID: string) {
        try {
            await this.model.findByIdAndDelete(transactionID)
        } catch (error) {
            throw error
        }
    }

    async deleteAll() {
        try {
            await this.model.deleteMany({})
        } catch (error) {
            throw error
        }
    }
}