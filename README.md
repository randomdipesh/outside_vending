# Vending Machine (Outside Tech)

# API
Done with 
    Expressjs
    MongoDB (Mongoose)

Tested routes on postman.

# Front End

Done with Reactjs
Used basic css for styling.


# What's done?

1. Backend API is built
2. Frontend is built.
3. API is integrated on Frontend

# Explanationsa

1. A json file for default data is created

2. A setup  or reset route is created which setups the data on database if not done already and resets the data to default if data is already there. (/api/setup/setup_reset)

3. When the machine is out of stock totally, purchase won't be proceeded.

4. If the machine has say 4 items left, but user requested for 5, machine will provide 4 items to user.

5. When the machine is out of change, purchase won't be proceeded. (Workaround solution will be giving coupons to user, explained on comments on that part of code)

6. User will be provided a purchase token with the purchase, which they can use to refund the purchase.

7. Testing of API routes is done manually on postman as I don't have  experience on writing tests.

8. Deployed on heroku for testing. (MongoDB cloud is used for database on deployment)