# Central Bank of Learnable

## Node Clean Architecture

A basic banking API service built using clean architecture with the following features:

### Users can :

- Login
- Deposit money
- Withdraw money
- Transfer funds to other users
- See a list of their transactions
- See their wallet
- See their profile

### Admin can :

- Get all users
- Get single user
- Add users
- Delete users
- Reverse transactions(transfer)
- Disable a user’s account (update user)
- Get all users transactions
- Get single user transaction


## Usage

Create a `.env` file in the root directory.
Copy the content of env.sample into the just created .env file, and add the appropriate values.

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Database Seeder

To seed the database with only "admin" users from the "src/\_data" folder, run

```
# Import all data
node src/seeder -i

# Destroy all data
node src/seeder -d

```

## documentation

[View Postman Documentation](https://documenter.getpostman.com/view/6355780/UVR7Mp3h)

## Author

[Joshua Afekuro](https://github.com/afej)
