import './App.css';
import AccountDetails from './components/AccountDetails.tsx';
import AccountList from './components/AccountList.tsx';
import React, { useState } from 'react';
import AccountTransactions from './components/AccountTransactions.tsx';

function App() {
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [component, setComponent] = useState("Balance")

    return (
        <div className='app'>
            <h1>Atlar</h1>
            <div className='component-buttons'>
                <button onClick={() => setComponent("Balance")}>Balances</button>
                <button onClick={() => setComponent("Transactions")}>Transactions</button>
            </div>
            {component === "Balance" && <AccountList />}
            {component === "Transactions" && <AccountTransactions />}
        </div>
    );
}

export default App;
