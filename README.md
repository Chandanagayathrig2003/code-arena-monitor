
# Student Progress Management System

A comprehensive web application for tracking and managing student progress in competitive programming, specifically designed for Codeforces data tracking.

## Features

- **Student Management**: Add, edit, delete, and view student profiles
- **Progress Tracking**: Monitor student performance with detailed analytics
- **Contest History**: Track contest participation and rating changes
- **Problem Solving Analytics**: Visualize problem-solving patterns and statistics
- **Automated Data Sync**: Scheduled Codeforces data synchronization
- **Inactivity Detection**: Automatic email reminders for inactive students
- **Responsive Design**: Mobile and tablet-friendly interface
- **Dark/Light Mode**: Toggle between themes

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Build Tool**: Vite
- **UI Components**: Radix UI, Shadcn/UI
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB database

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd student-progress-management
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add:
```
MONGODB_URI=your_mongodb_connection_string
CODEFORCES_API_URL=https://codeforces.com/api
EMAIL_SERVICE_CONFIG=your_email_service_config
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

## Key Components

- **Dashboard**: Overview of student statistics and system status
- **StudentsTable**: Main table view with CRUD operations
- **StudentProfile**: Detailed view of individual student progress
- **Settings**: System configuration and preferences

## API Integration

The system integrates with the Codeforces API to fetch:
- User contest history
- Problem submission data
- Rating changes and statistics

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Development Notes

- The application uses TypeScript for type safety
- Tailwind CSS is used for styling with custom design system
- React Query is used for data fetching and state management
- The codebase follows React best practices and component composition patterns
