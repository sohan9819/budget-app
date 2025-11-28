# Budget Tracker App

A modern, full-stack budget tracking application built with Next.js 15, featuring authentication, real-time data management, and a beautiful UI.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth
- **State Management**: Jotai + React Query
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Email**: Resend
- **Forms**: React Hook Form + Zod

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ (recommended: 20+)
- **npm**, **pnpm**, or **yarn**
- **PostgreSQL** 15+ (or Docker)
- **Git**

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd budget-tracker
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using pnpm (recommended)
pnpm install

# Using yarn
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add the following environment variables:

```env
# Database
DATABASE_URL=postgresql://[username]:[password]@localhost:5432/budget_tracker

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here-min-32-characters
BETTER_AUTH_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=your-resend-api-key

# OAuth Providers (Optional)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### Generating Secrets

**BETTER_AUTH_SECRET**: Generate a secure random string (minimum 32 characters):

```bash
openssl rand -base64 32
```

**RESEND_API_KEY**:

1. Sign up at [Resend](https://resend.com)
2. Create an API key in your dashboard
3. Add it to `.env.local`

### 4. Set Up Database

#### Option A: Using Docker (Recommended)

```bash
# Start PostgreSQL container
docker-compose up -d

# Verify container is running
docker ps
```

#### Option B: Local PostgreSQL

1. Install PostgreSQL on your system
2. Create a database:

```sql
CREATE DATABASE budget_tracker;
CREATE USER username WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE budget_tracker TO username;
```

### 5. Run Database Migrations

```bash
# Push schema to database (recommended for development)
npm run db:push

# Or generate migrations and apply them
npm run db:generate
npm run db:push
```

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
budget-tracker/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes
│   └── onboarding/        # User onboarding
├── atoms/                 # Jotai state atoms
│   ├── authAtom.ts       # Authentication state
│   └── userSettingsAtom.ts # User settings state
├── components/            # React components
│   ├── forms/            # Form components
│   ├── providers/        # Context providers
│   └── ui/               # UI components (Radix UI)
├── db/                   # Database configuration
│   ├── drizzle.ts        # Drizzle client
│   └── schema.ts         # Database schema
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── queries/              # React Query queries & mutations
│   ├── auth.*.ts        # Auth-related queries
│   └── user-settings.*.ts # User settings queries
├── server/               # Server-side utilities
└── schema/               # Zod schemas
```

## 🔑 Key Features

### State Management Architecture

This project uses a powerful combination of **Jotai** and **React Query**:

- **Jotai Atoms**: Global state management with React Query integration
- **React Query**: Server state caching, synchronization, and updates
- **Server-side Prefetching**: Zero loading states on initial render

#### Example Usage

```tsx
// Using auth state
import { useAuth } from '@/hooks/use-auth';

function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  // ...
}

// Using user settings
import { useUserSettings } from '@/hooks/use-user-settings';

function MyComponent() {
  const { currency, settings } = useUserSettings();
  // ...
}
```

### Authentication

- Email/Password authentication
- Email verification
- Password reset
- OAuth (GitHub, Google)
- Session management with Better Auth

### Database Management

- **Drizzle ORM**: Type-safe database queries
- **Migrations**: Manage schema changes
- **Studio**: Visual database editor

```bash
# Open Drizzle Studio
npm run db:studio
```

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start development server

# Database
npm run db:push          # Push schema changes to database
npm run db:pull          # Pull schema from database
npm run db:generate      # Generate migration files
npm run db:studio        # Open Drizzle Studio

# Build & Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run typecheck        # Run TypeScript type checking
```

## 🔧 Configuration

### Database Configuration

Edit `drizzle.config.ts` to change database settings:

```typescript
export default defineConfig({
  schema: './db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### Auth Configuration

Edit `lib/auth.ts` to customize authentication:

- Email verification settings
- OAuth providers
- Password requirements
- Rate limiting

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
DATABASE_URL=your-production-database-url
BETTER_AUTH_SECRET=your-production-secret
BETTER_AUTH_URL=https://your-domain.com
RESEND_API_KEY=your-resend-api-key
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 🧪 Development Guidelines

### Adding New Features

1. **Queries/Mutations**: Add to `queries/` directory
2. **State Atoms**: Add to `atoms/` directory
3. **Server Functions**: Add to `server/` directory
4. **Components**: Add to `components/` directory

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for formatting
- Write descriptive commit messages

## 📚 Documentation

### State Management

- [Jotai Documentation](https://jotai.org)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Jotai + React Query Integration](https://github.com/jotaijs/jotai-tanstack-query)

### Authentication

- [Better Auth Documentation](https://www.better-auth.com/docs)

### Database

- [Drizzle ORM Documentation](https://orm.drizzle.team)

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker ps

# Check database connection
psql -h localhost -U username -d budget_tracker
```

### Port Already in Use

```bash
# Change port in package.json or use:
PORT=3001 npm run dev
```

### Environment Variables Not Loading

- Ensure `.env.local` is in the root directory
- Restart the development server after adding new variables
- Check variable names match exactly

<!-- ## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. -->

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org)
- [Better Auth](https://www.better-auth.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Jotai](https://jotai.org)
- [React Query](https://tanstack.com/query)
- [Radix UI](https://www.radix-ui.com)

---

Built with ❤️ using Next.js and modern web technologies.
