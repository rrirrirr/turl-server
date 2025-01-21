# Turl Server - Tournament Management Backend

## Overview
Turl Server is the backend service for the Turl tournament management system. Built with NestJS, it provides a RESTful API that handles tournament creation, team management, game scheduling, and user authentication. This service is designed to work in conjunction with the [Turl frontend application](https://github.com/rrirrirr/turl).

## Tech Stack
- **Framework**: NestJS 9
- **Database**: SQLite with MikroORM
- **Authentication**: Passport.js with JWT
- **Authorization**: CASL

## Prerequisites
- Node.js (LTS version recommended)
- npm
- SQLite3

## Installation

1. Clone the repository
```bash
git clone https://github.com/rrirrirr/turl-server.git
cd turl-server
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
# Create a .env file in the root directory
cp .env.example .env
# Edit the .env file with your configuration
```

## Running the Application

```bash
# Development mode
npm run start

# Watch mode (recommended for development)
npm run start:dev

# Production mode
npm run start:prod
```

The server will be available at `http://localhost:3001` by default.

## API Documentation
The REST API provides endpoints for:
- Tournament management
- Team registration and management
- Game scheduling
- User authentication
- Results tracking

## Development Scripts
```bash
# Format code
npm run format

# Lint code
npm run lint

# Build the application
npm run build

# Run tests
npm run test          # Unit tests
npm run test:watch    # Watch mode
npm run test:cov      # Test coverage
npm run test:e2e      # End-to-end tests
npm run test:debug    # Debug tests
```

## Database
The application uses SQLite with MikroORM for data persistence. The database configuration can be found in the MikroORM configuration file.

## Testing
The project includes a comprehensive test suite:
- Unit tests for services and controllers
- End-to-end tests for API endpoints
- Jest as the testing framework

## Related Projects
- [Turl Frontend](https://github.com/rrirrirr/turl) - Next.js frontend application
