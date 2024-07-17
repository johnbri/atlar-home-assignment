import React, { useRef, useEffect, useState } from 'react';
import { AccountWithBalance } from '../types';
import AccountTransactions from './AccountTransactions.tsx';
import './AccountDetails.css';

interface AccountDetailsProps {
    account: AccountWithBalance;
    handleAccountClick: () => void;
    selectedAccount: boolean;
    index: number;
    selectedBank: string;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ account, index, selectedAccount, selectedBank, handleAccountClick }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        if (selectedAccount) {
            setContentHeight(200);
        } else {
            setContentHeight(0);
        }
    }, [selectedAccount]);

    return (
        <>
            <tr key={index} onClick={handleAccountClick} className={`account ${selectedAccount ? 'selected' : ''}`}>
                {selectedBank && <td>{selectedBank}</td>}
                <td>{account.market}</td>
                <td>{account.balances[0].amount.currency}</td>
                <td>{account.name}</td>
                <td className='balance'>
                    <p>
                        {account.balances[0].amount.value > 0 ? (
                            <span className='value'>{account.balances[0].amount.stringValue} </span>
                        ) : (
                            <span className='neg-value'>{account.balances[0].amount.stringValue} </span>
                        )}
                        <span className='balance-currency'>
                            {account.balances[0].amount.currency}
                        </span>
                    </p>
                </td>
            </tr>
            {/* <AccountTransactions contentHeight={contentHeight} contentRef={contentRef} account={account} selectedAccount={selectedAccount}></AccountTransactions> */}
            {/* <tr>
                <td colSpan={5}>
                    <div
                        className="account-details-container"
                        style={{ height: `${contentHeight}px` }}
                    >
                        <div ref={contentRef} className="account-details-content">
                            <p>Additional details for {account.id}</p>
                        </div>
                    </div>
                </td>
            </tr> */}
        </>
    );
};

export default AccountDetails;
