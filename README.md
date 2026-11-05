# GradBridge – Alumni Networking and Referral Portal

GradBridge is a full-stack web application designed to bridge the gap between college students and alumni. It provides a common platform where students can connect with alumni, explore career opportunities, seek professional guidance, and request referrals.

Alumni can maintain their professional profiles, share their career information, and respond to students' networking and referral requests.

## Project Overview

The main objective of GradBridge is to strengthen the relationship between students and alumni by providing an organized digital networking platform.

The application allows students to discover alumni based on their company, industry, skills, and graduation year. It also enables alumni to manage their professional profiles and handle incoming requests.

## Key Features

### 1. User Authentication
- Student and Alumni registration.
- Secure login and logout functionality.
- Password hashing for secure credential storage.
- Role-based access control.

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

### 4. Referral Request Management
- Students can send referral or networking requests to alumni.
- Alumni can view incoming requests.
- Alumni can respond to requests.
- Track request statuses.

### 5. Admin Management
- Role-based administrative access.
- Administrative management of platform information and users.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Database | Microsoft Azure SQL Database |
| ORM | Prisma |
| Authentication | Session-based authentication with JWT |
| Password Security | bcrypt |
| Cloud Storage | Azure Blob Storage |
| Deployment | Vercel |
| Version Control | Git and GitHub |

## System Architecture

GradBridge follows a three-tier architecture.

1. **Presentation Layer:** Next.js and React provide the user interface.
2. **Application Layer:** Next.js API routes handle authentication, business logic, alumni profiles, and referral requests.
3. **Data Layer:** Prisma communicates with Azure SQL Database, while Azure Blob Storage stores profile pictures.

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
      Azure SQL       Azure Blob
      Database         Storage
          |               |
          v               v
    User and Profile   Profile Images
       Records
```

## Database Design

GradBridge uses a relational database structure.

The main database entities include:

- **User:** Stores user details, login credentials, and roles.
- **Profile:** Stores professional and academic profile information.
- **Company:** Stores company-related information.
- **Industry:** Stores industry-related information.
- **Request:** Stores student-to-alumni referral and networking requests.

The database uses primary keys, foreign keys, and relational constraints to maintain data integrity.

The database schema is designed with normalization principles to reduce redundancy and improve data consistency.

## Security Features

- Passwords are hashed before being stored.
- Role-based access control for different user roles.
- Protected API routes.
- Secure session handling.
- Environment variables for sensitive configuration.
- Database access through Prisma ORM.
- Input validation and sanitization.

## Project Setup and Installation

Follow these steps to run GradBridge locally.

### Prerequisites

Install the following:

- Node.js
- npm
- Git
- Visual Studio Code (recommended)
- Access to an Azure SQL Database
- Access to Azure Blob Storage

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

Create a `.env` file in the root directory and configure the required environment variables.

```env
DATABASE_URL="YOUR_AZURE_SQL_CONNECTION_STRING"

AZURE_STORAGE_CONNECTION_STRING="YOUR_AZURE_STORAGE_CONNECTION_STRING"

AZURE_STORAGE_CONTAINER="YOUR_CONTAINER_NAME"

JWT_SECRET="YOUR_SECRET_KEY"
```

Replace the placeholder values with your actual configuration.

**Important:** Never commit your `.env` file or expose database credentials and secret keys publicly.

### 5. Validate the Prisma Schema

```bash
npx prisma validate
```

### 6. Generate Prisma Client

```bash
npx prisma generate
```

### 7. Set Up Database Tables

```bash
npx prisma db push
```

This synchronizes the Prisma schema with the configured Azure SQL Database.

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

The application uses Azure SQL Database and Azure Blob Storage as external cloud services.

## Project Status

**Current Status:** Development Completed – Integration and Testing

Completed milestones:

- Frontend and backend integration.
- Student and Alumni authentication.
- Alumni profile management.
- Searchable alumni directory.
- Referral request management.
- Azure SQL Database integration.
- Azure Blob Storage integration.
- Vercel deployment.
- Testing of major application functionalities.

Further UI improvements and final testing may be carried out as part of ongoing project refinement.

## Future Enhancements

- Real-time notifications for referral requests.
- Advanced alumni recommendation system.
- Alumni mentorship scheduling.
- Enhanced analytics dashboard.
- Improved mobile responsiveness.
- Advanced search and filtering options.

## Author

Aditya Srivastava

B.Tech – Computer Science and Engineering  
Artificial Intelligence and Machine Learning-1

## Repository

[GradBridge – GitHub Repository](https://github.com/srivastavaaditya3662-ai/gradbridge)

## License

This project is developed for academic purposes.