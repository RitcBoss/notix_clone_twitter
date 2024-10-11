
# Project Clone TwitterX

## Description
This project was created to practice programming skills and apply new technologies in web application development. It replicates some features of Twitter. You can follow the original tutorial by [Code with Antonio](https://www.youtube.com/@codewithantonio) to see how the app was built.

## Project Features
In this application, you will be able to use the following features:
- **Register & Login System**: Users can create new accounts and log in.
- **Post messages**: Users can create and publish posts.
- **Like posts**: Users can like posts made by other users.
- **Comment on posts**: Users can comment on individual posts.
- **Follow users**: Users can follow others to see their posts in the feed.

## Installation and Setup Instructions

Follow the steps below to get this project running on your local machine:

### 1. Clone the project from GitHub
First, download the project source code from GitHub:
```bash
git clone https://github.com/RitcBoss/notix_clone_twitterX-main.git
cd notix_clone_twitterX-main
```

### 2. Install Dependencies
After cloning the project, install all the necessary dependencies:
```bash
npm install
```

### 3. Configure the Environment File
This project uses **MongoDB** as the main database to store user information, posts, comments, and follow data. You need to add your MongoDB credentials in the environment file for the app to connect to the database:
1. Rename the file `.env.example` to `.env`.
2. Open the `.env` file and replace the `MONGO_URL` field with your MongoDB connection string. Example:
   ```
   MONGO_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority"
   ```

   **Explanation**:
   - `<username>`: Your MongoDB username
   - `<password>`: Your MongoDB password
   - `<dbname>`: The name of your MongoDB database

   For example:
   ```
   MONGO_URL="mongodb+srv://myusername:mypassword@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority"
   ```

3. **Setting up MongoDB Atlas (if you're using the cloud service)**:
   - If you're using **MongoDB Atlas**, log in at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a new cluster (or use an existing one).
   - Create a user with a username and password (you'll use these in the `<username>` and `<password>` fields).
   - Either create a new database or use an existing one (you'll use this name in the `<dbname>` field).
   - Set your network access settings in Atlas to allow your IP address to connect to the cluster.

4. **Check the connection**:
   - After adding the MongoDB credentials, save the `.env` file and run the project:
     ```bash
     npm start
     ```
   - If the `MONGO_URL` is correct, the application will connect to MongoDB without any errors.

### 4. Start the Project
Once the environment and dependencies are set up, you can start the server and test the project:
```bash
npm start
```

### 5. Access the Web Application
After the server starts, you can access the application by opening a browser and navigating to:
```
http://localhost:3000
```

## Database Configuration

This project uses **MongoDB** to manage user data, posts, comments, and following relationships. You can use MongoDB Atlas (cloud service) or a self-hosted MongoDB server.

### Database Setup Instructions:

1. **Rename `.env.example` to `.env`**:
   - Once you clone the project, locate the `.env.example` file and rename it to `.env`.

2. **Add MongoDB Connection Information**:
   - Open the `.env` file and update the `MONGO_URL` with your MongoDB connection string:
     ```
     MONGO_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority"
     ```

3. **MongoDB Atlas Setup**:
   - Log into MongoDB Atlas and create a cluster (or use an existing one).
   - Create a new user for your database.
   - Whitelist your IP address to allow connection to your cluster.
   - Use the connection string provided by Atlas in the `.env` file.

4. **Testing the Connection**:
   - After configuration, run the app using `npm start` to ensure the database connection works properly.
