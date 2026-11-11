# GradBridge – Alumni Networking and Referral Portal

GradBridge is a full-stack web application designed to bridge the gap between college students and alumni. It provides a common platform where students can connect with alumni, explore career opportunities, seek professional guidance, and request referrals.

Alumni can maintain their professional profiles, share career information, and respond to students' networking and referral requests.

## Project Overview

The main objective of GradBridge is to strengthen relationships between students and alumni by providing an organized digital networking platform.

The application allows students to discover alumni based on their company, industry, technical skills, and graduation year. It also enables alumni to manage their professional profiles and handle incoming requests.

GradBridge supports multiple cloud providers, including Microsoft Azure and Supabase, offering flexibility in database management and profile picture storage.

## Key Features

### 1. User Authentication
- Student and Alumni registration.
- Secure login and logout functionality.
- Password hashing using bcrypt.
- JWT-based authentication using secure cookies.
- Role-based access control for Student, Alumni, and Admin users.

### 2. Alumni Profile Management
- Create and update professional profiles.
- Add graduation year, current job title, and company.
- Add industry, technical skills, and biography.
- Upload and manage profile pictures.
- Share career goals and professional information.

### 3. Alumni Directory
- Browse registered alumni.
- Search alumni by name.
- Filter alumni based on company and technical skills.
- Explore professional backgrounds and career information.
- Find alumni based on graduation year.

### 4. Referral Request Management
- Students can send referral or networking requests to alumni.
- Alumni can view incoming requests.
- Alumni can respond to requests.
- Track request statuses.

### 5. Admin Management
- Role-based administrative access.
- Admin dashboard.
- Administrative management of platform information and users.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| ORM | Prisma |
| Authentication | JWT-based cookie authentication |
| Password Security | bcrypt |
| Primary Database Provider | Supabase PostgreSQL |
| Alternative Database Provider | Microsoft Azure SQL Database |
| Primary Cloud Storage | Supabase Storage |
| Alternative Cloud Storage | Azure Blob Storage |
| Deployment | Vercel |
| Version Control | Git and GitHub |

## Cloud Integration

GradBridge implements a provider-based cloud architecture that supports both Microsoft Azure and Supabase.

### 1. Microsoft Azure Integration

**Azure SQL Database**
- Stores structured application data, including user accounts, roles, alumni profiles, company information, industries, and referral requests.
- Uses Prisma ORM to communicate with the SQL Server database.
- Maintains relationships and data integrity through relational database constraints.

**Azure Blob Storage**
- Provides cloud-based storage for alumni profile pictures.
- Stores image files separately from relational database records.
- The database stores the corresponding image reference.

### 2. Supabase Integration

**Supabase PostgreSQL**
- Provides relational database functionality for application data.
- Stores user information, authentication-related records, alumni profiles, and referral requests.
- Connects through Prisma ORM using PostgreSQL database connections.

**Supabase Storage**
- Stores and manages alumni profile pictures.
- Provides cloud object storage integrated with the Supabase project.
- Keeps profile images separate from structured database records.

### 3. Provider Selection

The application uses environment variables to select the database and storage providers.

| Configuration | Azure | Supabase |
|---|---|---|
| Database Provider | `sqlserver` | `postgresql` |
| Storage Provider | `azure` | `supabase` |
| Database | Azure SQL Database | Supabase PostgreSQL |
| File Storage | Azure Blob Storage | Supabase Storage |

This approach allows the application to switch between supported cloud providers without changing its core application features.

## System Architecture

GradBridge follows a three-tier architecture.

**Presentation Layer:** Next.js and React provide the user interface.

**Application Layer:** Next.js API routes handle authentication, business logic, alumni profiles, directory searches, and referral requests.

**Data Layer:** Prisma ORM communicates with the selected relational database provider, while the selected cloud storage provider stores profile pictures.

### Architecture Flow

```text
       Students / Alumni / Admin
                  |
                  v
          Next.js Frontend
          (React + TypeScript)
                  |
                  v
         Next.js API Routes
          (Backend Logic)
                  |
                  v
              Prisma ORM
                  |
          +-------+-------+
          |               |
          v               v
   Database Provider   Storage Provider
          |               |
     +----+----+      +---+----------+
     |         |      |              |
     v         v      v              v
 Azure SQL  Supabase Azure Blob   Supabase
 Database   PostgreSQL Storage    Storage
     |         |      |              |
     +----+----+      +------+-------+
          |                  |
     User, Profile,      Profile Images
     Request Records
```

*The diagram represents the supported provider alternatives. The application selects the configured database and storage provider through environment variables; it does not require both providers to run simultaneously.*

## Database Design

GradBridge uses a relational database structure.

The main database entities include:

- **User:** Stores user details, login credentials, and roles.
- **Profile:** Stores professional and academic profile information.
- **Company:** Stores company-related information.
- **Industry:** Stores industry-related information.
- **Request:** Stores student-to-alumni referral and networking requests.

The database uses primary keys, foreign keys, and relational constraints to maintain data integrity.

The database schema follows normalization principles to reduce redundancy and improve data consistency.

Prisma ORM manages database operations and supports the application's database provider configurations.

## Security Features

- Passwords are hashed using bcrypt before being stored.
- Role-based access control for different user roles.
- Protected API routes.
- JWT-based authentication using cookies.
- Environment variables for sensitive configuration.
- Database access through Prisma ORM.
- Input validation and sanitization.
- Secure cloud service credentials.
- HTTPS through the deployed application platform.

## Project Setup and Installation

Follow these steps to run GradBridge locally.

### Prerequisites

Install the following:

- Node.js
- npm
- Git
- Visual Studio Code (recommended)
- Access to either Azure SQL Database or Supabase PostgreSQL.
- Access to either Azure Blob Storage or Supabase Storage.

### 1. Clone the Repository

```bash
git clone https://github.com/srivastavaaditya3662-ai/gradbridge.git
```

### 2. Navigate to the Project Folder

```bash
cd gradbridge
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory.

**Option A: Supabase Configuration**

```env
DATABASE_PROVIDER="postgresql"
SUPABASE_DATABASE_URL="YOUR_SUPABASE_TRANSACTION_POOLER_URL"
SUPABASE_DIRECT_URL="YOUR_SUPABASE_SESSION_POOLER_URL"

STORAGE_PROVIDER="supabase"
SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
SUPABASE_STORAGE_BUCKET="profile-pictures"

JWT_SECRET="YOUR_SECRET_KEY"
```

**Option B: Azure Configuration**

```env
DATABASE_PROVIDER="sqlserver"
DATABASE_URL="YOUR_AZURE_SQL_CONNECTION_STRING"

STORAGE_PROVIDER="azure"
AZURE_STORAGE_CONNECTION_STRING="YOUR_AZURE_STORAGE_CONNECTION_STRING"
AZURE_STORAGE_CONTAINER="YOUR_CONTAINER_NAME"

JWT_SECRET="YOUR_SECRET_KEY"
```

Replace the placeholder values with the actual credentials for your selected providers. Use the exact environment variable names expected by the application's Azure and Supabase implementations.

**Important:** Never commit your `.env` file or expose database credentials, service-role keys, storage connection strings, or secret keys publicly.

### 5. Validate the Prisma Schema

For Supabase PostgreSQL:

```bash
npx prisma validate --schema=prisma/schema.postgres.prisma
```

For Azure SQL Database:

```bash
npx prisma validate --schema=prisma/schema.prisma
```

### 6. Generate Prisma Client

For Supabase PostgreSQL:

```bash
npx prisma generate --schema=prisma/schema.postgres.prisma
```

For Azure SQL Database:

```bash
npx prisma generate --schema=prisma/schema.prisma
```

### 7. Set Up Database Tables

For Supabase PostgreSQL:

```bash
npx prisma db push --schema=prisma/schema.postgres.prisma
```

For Azure SQL Database:

```bash
npx prisma db push --schema=prisma/schema.prisma
```

These commands synchronize the selected Prisma schema with the configured database.

### 8. Start the Development Server

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

## Deployment

GradBridge is deployed using Vercel.

Deployment process:

1. Push the project code to GitHub.
2. Import the GitHub repository into Vercel.
3. Configure the required environment variables in Vercel.
4. Select the production branch.
5. Deploy the Next.js application.
6. Test the deployed application.

The application supports Azure and Supabase cloud services through provider-based environment configuration.

## Project Status

**Current Status: Completed and Deployed**

Completed milestones:

- Frontend and backend integration.
- Student and Alumni authentication.
- Role-based access control.
- Alumni profile management.
- Searchable alumni directory.
- Referral and networking request management.
- Admin dashboard.
- Azure SQL Database provider implementation.
- Azure Blob Storage provider implementation.
- Supabase PostgreSQL integration.
- Supabase Storage integration.
- Vercel deployment.
- Testing of major application functionalities.

The application supports both Azure and Supabase integrations, with the active providers selected through environment variables.

## Future Enhancements

- Real-time notifications for referral requests.
- Advanced alumni recommendation system.
- Alumni mentorship scheduling.
- Enhanced analytics dashboard.
- Improved mobile responsiveness.
- Advanced search and filtering options.

## Author

**Aditya Srivastava**

B.Tech – Computer Science and Engineering  
Artificial Intelligence and Machine Learning

## Repository

[GradBridge – GitHub Repository](https://github.com/srivastavaaditya3662-ai/gradbridge)

## License

This project is developed for academic purposes.