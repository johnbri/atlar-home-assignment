// src/api/api.ts
import { Account, Transaction, TransactionsData, AccountsData, Balance } from '../types';

const API_URL = 'https://api.atlar.com/financial-data/v2';

// Basic Auth credentials
const username = 'AvahI5yjCWUV43vu67Ka';
const password = 'oRpiDBaluISG0aSGhu8a_5_WQ3x0oNb9Ggr51G--TgJ7wSQb5k9LxkpLE3BMWAhf20ei';
const authHeader = 'Basic ' + btoa(`${username}:${password}`);

export const getAccounts = async (): Promise<AccountsData> => {
    try {
        const response = await fetch(`${API_URL}/accounts?limit=13`, {
            headers: {
                'Authorization': authHeader
                
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: AccountsData = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching accounts:', error);
        throw error;
    }
};

export const getAccountDetails = async (accountId: string): Promise<Account> => {
    try {
        const response = await fetch(`${API_URL}/accounts/${accountId}`, {
            headers: {
                'Authorization': authHeader
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Account = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching account details:', error);
        throw error;
    }
};

export const getTransactions = async (): Promise<TransactionsData> => {
    try {
        const response = await fetch(`${API_URL}/transactions?limit=10`, {
            headers: {
                'Authorization': authHeader
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: TransactionsData = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};

export const getBalance = async (accountId: string): Promise<Balance[]> => {
    try {
        const response = await fetch(`${API_URL}/accounts/${accountId}/balances?limit=10`, {
            headers: {
                'Authorization': authHeader
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
};

