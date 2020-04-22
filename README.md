# react-node-react-template

A monorepo (using `yarn workspaces`) template for a web application using a React frontend, and a NodeJS backend.

## Features

- `typescript` for type-checking
- `eslint` for linting
- `jest` for testing
- `prettier` (via `eslint`) for formatting
- `husky` for git hooks, such as applying formatting pre commits and fetching latest yarn packages post merges
- Docker for containerization
- TravisCI for continuous integration

## Using

### Environment variables

In the root of the project, the frontend package, and the backend package, copy the `.env.example` to `.env` and fill in the variables.

### Development

To start the project in development mode, run

```
docker-compose up -d
```

in the root of the project.

#### Logs

To access the logs run

```
docker-compose logs -f frontend
```

or

```
docker-compose logs -f backend
```

in the root of the project
