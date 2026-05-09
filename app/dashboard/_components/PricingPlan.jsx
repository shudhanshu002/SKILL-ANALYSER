const PricingPlan = [
    {
        link: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_LINK || 'https://buy.stripe.com/test_9AQ4jI8fffk75igcMN',
        price: 7.99,
        priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || 'price_1PUNYmSISOkj08jR30L0UpyY',
        duration: 'Monthly'
    },
    {
        link: process.env.NEXT_PUBLIC_STRIPE_YEARLY_LINK || 'https://buy.stripe.com/test_eVabMa8fffk78us000',
        price: 49.00,
        priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID || 'price_1PUNZQSISOkj08jRFQkKuzXi',
        duration: 'Yearly'
    }
];

export default PricingPlan;