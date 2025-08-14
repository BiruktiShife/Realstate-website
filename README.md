This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Real Estate Management System

A comprehensive real estate management system built with Next.js, Prisma, and Pinata for decentralized image storage.

### Features

- **Company Management**: Add and manage real estate companies
- **Property Listings**: Create detailed property listings with images
- **Image Storage**: Decentralized image storage using Pinata IPFS
- **Responsive Design**: Mobile-friendly interface with shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM

## Getting Started

### Prerequisites

1. Node.js 18+ installed
2. A Pinata account for IPFS image storage
3. PostgreSQL database (or SQLite for development)

### Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your Pinata API credentials:

```env
PINATA_API_KEY=your_pinata_api_key_here
PINATA_SECRET_API_KEY=your_pinata_secret_api_key_here
```

3. Set up the database:

```bash
npm run db:migrate
npm run db:seed
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Pinata Integration

This project uses Pinata for decentralized image storage on IPFS. Images uploaded through the forms are automatically stored on IPFS and the URLs are saved to the database.

To get Pinata API keys:

1. Sign up at [Pinata](https://app.pinata.cloud/)
2. Go to Developers > API Keys
3. Create a new API key with upload permissions
4. Add the keys to your `.env` file

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
