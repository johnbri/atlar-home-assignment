import React, { useEffect, useState } from 'react';
import { AccountWithBalance, Transaction, TransactionsData } from '../types';
import './AccountDetails.css';
import {getTransactions} from '../api/api.ts'

interface AccountTransactionsProps {
    contentHeight: number;
    contentRef: any;
    account: AccountWithBalance;
    selectedAccount: boolean
}

/* NOT FUNCTIONING AT THE MOMENT - Should show transaction data for all accounts */
const AccountTransactions: React.FC<AccountTransactionsProps> = ({ contentHeight, contentRef, account, selectedAccount}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        const fetchAccountsAndBalances = async () => {
            try {
                const transactionsData: TransactionsData =  await getTransactions();

                setTransactions(transactionsData.items);
            
            } catch (error) {
                setError('Error fetching accounts or balances');
            } finally {
                setLoading(false);
            }
        };

        if (selectedAccount) {
            fetchAccountsAndBalances();
        }
      

    }, [selectedAccount])
    console.log(transactions)
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
        {selectedAccount &&
            <tr>
                <td colSpan={5}>
                    <div ref={contentRef} className="account-details-content">
                    <div
                        className="account-details-container"
                        style={{ height: `${contentHeight}px` }}
                    >
                            <p>Additional details for {transactions[0].accountId}</p>
                        </div>
                    </div>
                </td>
            </tr>
        }
        </>
    );
};

export default AccountTransactions;
