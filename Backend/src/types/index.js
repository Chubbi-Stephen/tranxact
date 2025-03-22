export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Transaction {
    id: string;
    userId: string;
    amount: number;
    type: 'credit' | 'debit';
    createdAt: Date;
}

export interface AIModel {
    id: string;
    userId: string;
    data: any; // Define the structure of AI-related data as needed
    createdAt: Date;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface TransactionResponse {
    transaction: Transaction;
}

export interface AIResponse {
    result: any; // Define the structure of AI response as needed
}