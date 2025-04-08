# Government Trust Management Backend

This is the backend part of the Government Trust Management project. It is built using Node.js and Express, and it connects to a MySQL database to manage trust-related activities.

## Project Structure

- **src/**: Contains the source code for the backend application.
  - **app.js**: Entry point of the application, sets up the Express server and middleware.
  - **controllers/**: Contains the logic for handling requests.
    - **userController.js**: Manages user-related operations.
  - **routes/**: Defines the API routes.
    - **userRoutes.js**: Sets up routes for user-related endpoints.
  - **models/**: Contains the data models.
    - **userModel.js**: Defines the user schema and database interactions.
  - **config/**: Configuration files.
    - **db.js**: Database connection setup.

- **package.json**: Lists the dependencies and scripts for the backend project.

- **.env**: Contains environment variables for the application.

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd gov-trust-management/backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up the database:
   - Create a MySQL database and configure the connection details in the `.env` file.

### Running the Application

To start the server, run:
```
node src/app.js
```

The server will be running on the specified port in the `.env` file.

### API Documentation

Refer to the `userRoutes.js` file for available API endpoints and their usage.

### Contributing

Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

### License

This project is licensed under the MIT License.