class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }

    async createTransaction(req, res) {
        try {
            const transactionData = req.body;
            const transaction = await this.transactionService.createTransaction(transactionData);
            res.status(201).json(transaction);
        } catch (error) {
            res.status(500).json({ message: 'Error creating transaction', error: error.message });
        }
    }

    async getTransaction(req, res) {
        try {
            const transactionId = req.params.id;
            const transaction = await this.transactionService.getTransaction(transactionId);
            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
            res.status(200).json(transaction);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving transaction', error: error.message });
        }
    }

    async getAllTransactions(req, res) {
        try {
            const userId = req.user.id; // Assuming user ID is available in req.user
            const transactions = await this.transactionService.getAllTransactions(userId);
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving transactions', error: error.message });
        }
    }

    async updateTransaction(req, res) {
        try {
            const transactionId = req.params.id;
            const updatedData = req.body;
            const updatedTransaction = await this.transactionService.updateTransaction(transactionId, updatedData);
            if (!updatedTransaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
            res.status(200).json(updatedTransaction);
        } catch (error) {
            res.status(500).json({ message: 'Error updating transaction', error: error.message });
        }
    }

    async deleteTransaction(req, res) {
        try {
            const transactionId = req.params.id;
            const deletedTransaction = await this.transactionService.deleteTransaction(transactionId);
            if (!deletedTransaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting transaction', error: error.message });
        }
    }
}

export default TransactionController;