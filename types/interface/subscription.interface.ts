export interface SubscriptionProduct {
    id: string;
    name: string;
    description: string;
    metadata: {
      plan: string;
      price: string;
    };
    default_price: string;
  }
  