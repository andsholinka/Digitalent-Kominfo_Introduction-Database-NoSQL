import mongoose from 'mongoose'

export type AccountType = {
    customer_id: string
    account_number: string
    balance: string
    account_type: string
}

export type AccountDocument = mongoose.Document & AccountType

//schema definition
const AccountSchema = new mongoose.Schema({
    customer_id: { type: String, required: true },
    account_number: { type: String, required: true },
    balance: { type: String, required: true },
    account_type: { type: String, required: true }
})

export class Account {
    private model: mongoose.Model<AccountDocument>

    constructor() {
        this.model = mongoose.model('account', AccountSchema)
    }

    async create(data: AccountType) {
        try {
            const result = await this.model.create(data)
            console.log(`Insert result %j`, result)
        } catch (error) {
            throw error
        }
    }

    async getAll() {
        let accounts: AccountType[]
        try {
            accounts = await this.model.find({})
        } catch (error) {
            throw error
        }

        return accounts
    }

    async getByID(accountID: string) {
        let account: AccountType | null
        try {
            account = await this.model.findById(accountID)
        } catch (error) {
            throw error
        }

        return account
    }

    async update(accountID: string, data: Partial<AccountType>) {
        try {
            await this.model.findByIdAndUpdate(accountID, { $set: data })
        } catch (error) {
            throw error
        }
    }

    async delete(accountID: string) {
        try {
            await this.model.findByIdAndDelete(accountID)
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