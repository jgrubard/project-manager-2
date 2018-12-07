# groop - Web Application

### [Deployed Page](https://groop-jg.herokuapp.com)

### About groop

groop is a project management web application where users can create projects, include teammates on these projects, and create/organize tasks. Users see real time project modifications using Socket.io.

Technologies: Express, Sequelize, PostgreSQL, React, Redux, Socket.io, JWT

### Installing the app and running locally
If you would like to run the application locally, clone the Github repo [https://github.com/jgrubard/project-manager-2](https://github.com/jgrubard/project-manager-2) to your machine.

Run `npm install` to grab all of the dependencies.

You will also need to create a new database in postrges called `project_manager_db` that the app will write data to.

Once installed, you will need to create a `.env` file in your main directory, and set an environment variable for your authentication. Something like `JWT_KEY=12345` should suffice, or you can create something more secure if you prefer.

You can also add passwords to `.env` for any pre-seeded users you may want to have. You'll have to make changes in `/server/db/seed.js` to get your users up and running, and run `npm run seed` in order to seed/re-seed your database.

#### Back End: Node.js

An Express server is used to create an API that communicates with a relational PostgreSQL database that stores Sequelize models.

#### Front End: React & Redux

React is used to render all of the views, and Redux is used for state management. React-Redux is used to easily grab data from the redux store in whichever component it's needed.