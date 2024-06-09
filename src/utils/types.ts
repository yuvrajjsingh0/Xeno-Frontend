type Audience = {
    id?: number;
    title: string;
    numUsers: number;
    createdAt: number;
    isCompleted?: boolean; 
    rules?: any;
    users?: any[];
}

type Customer = {
    id?: number,
    name: string,
    email: string,
    createdAt?: string,
    updatedAt?: string
}

type CampaignLog = {
    id?: number;
    customer_id: number;
    audience_id: number;
    status: string;
    Customer: Customer
}

enum CAMPAIGN_STATUS {
    SENT = 'sent',
    FAILED = 'failed'
}