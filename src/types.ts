// src/types.ts
export interface AccountsData {
    items: Account[];
    limit: number;
    nextToken: string;
    token: string;
}

export interface Account {
    affiliationId: string;
    created: string;
    currency: string;
    entityId: string;
    etag: string;
    fictive: boolean;
    id: string;
    identifiers: [
        {
        invalid: boolean;
        market: string;
        number: string;
        type: string;
    },
    {
        invalid: boolean;
        market: string;
        number: string;
        type: string;
    }
    ]
    market: string;
    name: string;
    organizationId: string;
    routing: {
        number:string;
        type: string;
        }
    thirdPartyId: string;
    updated: string;
    version: number;
}

export interface BalanceData {
    items: Balance[];
    limit: number;
    nextToken: string;
    token: string;
}

export interface Balance {
    accountId: string;
    amount: { 
        currency: string;
        stringValue: string;
        value: number;};
    id: number;
    localDate: string;
    organizationId: string;
    reportedType: string;
    timestamp: string;
    type: string;
    version: number;
}

export interface AccountWithBalance extends Account {
    balances: Balance[];
}

export interface TransactionsData {
    items: Transaction[];
    limit: number;
    nextToken: string;
    token: string;
}
  
 export interface Transaction {
    accountId: string;
    amount: {
      currency: string;
      value: number;
      stringValue: string;
    };
    attachedTransactables: {
      id: string;
      type: string;
    }[];
    bankTransactionCode: {
      description: string;
      domain: string;
      family: string;
      subfamily: string;
    };
    created: string;
    currencyExchange?: {
      exchangeRate: string;
      sourceCurrency: string;
      targetCurrency: string;
      unitCurrency: string;
    };
    date: string;
    description: string;
    id: string;
    instructedAmount: {
      currency: string;
      value: number;
      stringValue: string;
    };
    organizationId: string;
    reconciliationStatus: string;
    reference: string;
    returnReason?: {
      code: string;
      description: string;
      originalBankTransactionCode: {
        domain: string;
      };
    };
    returned: boolean;
    updated: string;
    valueDate: string;
    version: number;
  }
  