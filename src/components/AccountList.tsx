import React, { useState, useEffect } from 'react';
import { getAccounts, getBalance } from '../api/api.ts';
import { Account, AccountsData, AccountWithBalance } from '../types';
import AccountDetails from './AccountDetails.tsx';
import Dropdown from './Dropdown.tsx';
import Notification from './Notification.tsx';
import { BsExclamationCircle } from "react-icons/bs";
import './AccountList.css';

interface AccountListProps {
}

/* Fetches accounts from API and populates table, as well as provides user option to choose bank.*/
const AccountList: React.FC<AccountListProps> = ({}) => {
    const [accounts, setAccounts] = useState<AccountWithBalance[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAccount, setSelectedAccount] = useState<AccountWithBalance | null>(null);
    const [hasNegativeBalance, setHasNegativeBalance] = useState(Boolean)
    const [selectedBank, setSelectedBank] = useState(String)

    useEffect(() => {
        const fetchAccountsAndBalances = async () => {
            try {
                const accountData: AccountsData = await getAccounts();
                const accountWithBalancesData: AccountWithBalance[] = await Promise.all(
                    accountData.items.map(async (account: Account) => {
                        const balances = await getBalance(account.id);
                        if (balances[0].amount.value <= 0) {
                            setHasNegativeBalance(true)
                        }
                        return { ...account, balances };
                    })
                );
                setAccounts(accountWithBalancesData);
            } catch (error) {
                setError('Error fetching accounts or balances');
            } finally {
                setLoading(false);
            }
        };
        fetchAccountsAndBalances();
    }, []);

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

export default AccountList;

