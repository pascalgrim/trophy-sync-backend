# Trophy Sync Backend

This is the backend for the Trophy Sync application, built with NestJS.

## Features

- **PSN API Integration:** Connects with the [PSN-API](https://github.com/achievements-app/psn-api) to retrieve user and trophy data.
- **User Search:** Provides endpoints for searching PSN users and fetching their trophy information.
- **RESTful API:** Follows RESTful principles for easy integration with frontend applications.

## Installation

Before running the backend, make sure Node.js and npm are installed on your system.

1. Clone the repository:

```bash
git clone https://github.com/your-username/trophy-sync-backend.git
```

2. Set up environment variables by creating a .env file with the following content:

```markdown
NPSSO=YOUR NPSSO
PORT=YOUR PORT
```

To get a npsso token, you can follow the [psn-api-docs](https://github.com/achievements-app/psn-api#how-to-obtain-an-authentication-token).

3. Clone the repository:

```bash
git clone https://github.com/your-username/trophy-sync-backend.git
```

4.Start the backend:

```bash
npm run start
```
