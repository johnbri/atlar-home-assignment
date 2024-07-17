// import React, { useEffect, useState } from 'react';
// import { AccountWithBalance, Transaction, TransactionsData } from '../types';
// import './AccountDetails.css';
// import {getTransactions} from '../api/api.ts'

// interface AccountTransactionsProps {
//     contentHeight: number;
//     contentRef: any;
//     account: AccountWithBalance;
//     selectedAccount: boolean
// }

// const AccountTransactions: React.FC<AccountTransactionsProps> = ({ contentHeight, contentRef, account, selectedAccount}) => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [transactions, setTransactions] = useState<Transaction[]>([])

//     useEffect(() => {
//         const fetchAccountsAndBalances = async () => {
//             try {
//                 const transactionsData: TransactionsData =  await getTransactions();

//                 setTransactions(transactionsData.items);
            
//             } catch (error) {
//                 setError('Error fetching accounts or balances');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (selectedAccount) {
//             fetchAccountsAndBalances();
//         }
      

//     }, [selectedAccount])
//     console.log(transactions)
//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;

//     return (
//         <>
//         {selectedAccount &&
//             <tr>
//                 <td colSpan={5}>
//                     <div ref={contentRef} className="account-details-content">
//                     <div
//                         className="account-details-container"
//                         style={{ height: `${contentHeight}px` }}
//                     >
//                             <p>Additional details for {transactions[0].accountId}</p>
//                         </div>
//                     </div>
//                 </td>
//             </tr>
//         }
//         </>
//     );
// };

// export default AccountTransactions;

import React, { useState, useEffect } from 'react';
import AccountDetails from './AccountDetails.tsx';
import Dropdown from './Dropdown.tsx';
import Notification from './Notification.tsx';
import { BsExclamationCircle } from "react-icons/bs";
import './AccountList.css';
import { AccountWithBalance, Transaction, TransactionsData } from '../types';
import './AccountDetails.css';
import {getTransactions} from '../api/api.ts'


interface AccountTransactionsProps {
}

const AccountTransactions: React.FC<AccountTransactionsProps> = ({}) => {
    const [accounts, setAccounts] = useState<AccountWithBalance[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAccount, setSelectedAccount] = useState<AccountWithBalance | null>(null);
    const [hasNegativeBalance, setHasNegativeBalance] = useState(Boolean)
    const [selectedBank, setSelectedBank] = useState(String)

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

        fetchAccountsAndBalances();
    }, [])

    console.log(transactions)
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleAccountClick = (account: AccountWithBalance) => setSelectedAccount(account);
    const handleBankSelection =  (option: string) => setSelectedBank(option)

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
        <div className="account-list-header">
            <Dropdown options={['Handelsbanken', 'Swedbank', 'Danske Bank']} onSelect={(option) => handleBankSelection(option)}></Dropdown>
            <h2>Accounts</h2>
        </div>
        <table className='account-list-table'>
            <thead>
                <tr>
                {selectedBank && <th>Bank</th>}
                <th>Market</th>
                <th>Currency</th>
                <th>Account</th>
                <th>Balance{hasNegativeBalance && <div className='balance-message'>
                                <BsExclamationCircle/>
                                <Notification message="negBalance"></Notification>
                                </div>
                            }</th>
                </tr>
            </thead>
            <tbody>
                {accounts.map((account, index) => (
                    <AccountDetails account={account} index={index} selectedBank={selectedBank} selectedAccount={selectedAccount?.id == account.id ? true : false} handleAccountClick={() => handleAccountClick(account)}/>
                ))}
            </tbody>
            <tbody>
                {accounts.map((account, index) => (
                    <AccountDetails account={account} index={index} selectedBank={selectedBank} selectedAccount={selectedAccount?.id == account.id ? true : false} handleAccountClick={() => handleAccountClick(account)}/>
                ))}
            </tbody>
        </table>
        </>
    );
};

export default AccountTransactions;

