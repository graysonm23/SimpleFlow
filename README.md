# SimpleFlow
Welcome to SimpleFlow
## Travis CI Results

[![Build Status](https://travis-ci.com/graysonm23/SimpleFlow.svg?branch=master)](https://travis-ci.com/graysonm23/SimpleFlow)

## Deployment Link 
[Heroku App](https://simpleflow-aarg.herokuapp.com/)

## Mission
SimpleFlow was created so the end user is able to proficiently. Using SimpleFlow task manager, Users will be able to keep track of items that are starting, in the process, or completed.

## Creation
With a team of four developers, our goal was so the end user will be able to keep track of his/her tasks with ease. Login information is stored in a MySQL(relational database). Upon Signup emails are sent using Mailgun emailing service. If he/she forgets the password they have the option to reset their password and store it. All passwords are encrypted in the database using BCrypt and password reset links are using 'crypto' a random string generator that's built into Node.js. Tasks are stored in a MySQL. Upon login database is queried to get the users tasks and store it within one of the three columns that we have given for them. Started, In Process, or Completed. When users move the task from one column to the next they are stored in the MySQL database for that specific column. Upon reload the users data is saved. 
