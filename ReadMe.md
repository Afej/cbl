# Central Bank of Learnable

A basic banking API service with the following features:

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
- Get all users transaction

## Usage

Add ".env" file to "/src/config/" and update the values/settings to your own, check "/src/config/sample_env.txt" for sample

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

## Author

[Joshua Afekuro](https://github.com/afej)
