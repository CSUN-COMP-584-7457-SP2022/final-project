# The Diabetic Compass

# Getting started

1. Install Docker onto your machine
2. Windows Users
   - Make sure your EOL is set to LF!
   - https://stackoverflow.com/questions/50005806/can-i-set-the-vs-code-default-eol-based-on-file-type
   - This is important because the `rambler/apply-all.sh` script will be copied improperly and migrations cannot be applied to the database!
3. Run `docker-compose up -d` to create these services in the background:
   - database service; connect via `postgres://admin:password@localhost:5432/tdc-dev`
   - adminer service; open on http://localhost:8080 and login with:
     - System: `PostgreSQL`
     - Server: `db`
     - Username: `admin`
     - Password: `password`
     - Database: `tdc-dev`
   - rambler service; applies any migrations found in `rambler/migrations`
   - ml service; use machine learning to predict whether or not you are at risk / have diabetes
4. Run `npm install` in `web` to install dependencies for `web` and run `npm run dev` to spin up web app locally on http://localhost:4200
5. Run `npm install` in `api` to install dependencies for `api` and run `npm run dev` to spin up api server locally on http://localhost:3000
   - Run `npm run scripts/load-test-data` in order to load the test user account into the database.
6. Run `npm install` in `ml` to install dependencies for `ml` using `pip3` and run `npm run dev` to spin up the ml server locally on http://localhost:5000
   - **Must have python3 (python v3.x) and pip3 in order to properly run locally**
   - **Note**: You may need to stop the docker container running if you used `docker-compose up -d` to free up port 5000.
