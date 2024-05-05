# Yavar_Hackathon
Task Management System - Yavar Hackathon


# Frontend : React with MaterialUI 
# Backend  : Flask , Postgres provided by Supabase (Cloud Database)

Created a Task Management Application , where users can initially signup , login , and add their tasks to be performed 
# Functionalities :
Users can create deadlines for their task , and if the deadline crossed they would get a notification through mail of incomplete tasks 

Users can toggle their status if the task finished , edit for any changes and also delete the task

Users can search for their task through a search field which was provided

Users can view their stats through a keen barchart which provides the incomplete , overdue , completed tasks for their knowing

They can view their Profile and atlast they can logout of their account

# Login Page of the Application : 

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/2c140fa0-37f7-4925-9ea8-f0bce07cd41b)

# SignUp Page of the Application : 

The Email , Password check are ensured.

1. For email - a regex pattern to be followed
2. For password - it should be a strong password ( minimum 8 characters of atleast 1 Uppercase, 1 Lowercase , 1 special character and 1 Number )
3. And the entered username and email is checked to be unique


![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/1ad50e22-302e-47c6-8893-4447f65017d0)


![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/6d9a7b7c-3e20-4ab3-bc16-e319df2cb723)

# MainPage of the Application :

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/a1b96fb7-bda3-4871-baef-176676115ff2)

# Add a Task :

Here the date conflicts are handled , the end date must be greater than or equal to start date and all fields must be entered.

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/b8e12d8f-59f5-4f1c-8eee-d14353e12d01)

# Toggle the Status of the Task :

If the task gets completed , it should be checked and a snackbar will be displayed.

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/9574a2c3-e0b8-4196-a20d-116167ac1961)

# Stats of the Tasks of User :

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/d873ccb3-5182-4f72-b1ec-6faec7447cfd)

# Edit a Task :

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/914f5d1b-efc9-41b9-9f71-cb71d1edcaa2)

# Search a Task by its name :

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/5438b196-8541-4485-a63a-d20ad0f9fd0a)

# Delete a Task :

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/67f47cee-f8ee-4515-9e0c-c9c8acec15b9)

# Profile :

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/110fe06a-1a57-4c87-9acc-24ecf2811fb9)

# Logout :

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/0fd635dd-014a-45b9-9fde-8dc48494dc83)

# Email Sent for each user if the end date of a task overdue:

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/fbf501d3-9ff0-4197-87e1-94586ff6a884)

# Users Table : 


![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/ce5322cb-53bd-4965-b44f-a3bc5a8287f3)

# Tasks Table : 


![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/1872663e-3a52-4ee1-8706-95e23533e309)

# Backend API's

# For SignUp

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/61a4c64f-7ce0-42ee-8e21-97a3be30aa0b)

# For Login 

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/f18eb4aa-e556-483b-9cbd-fedb67abed23)

The Authentication is based on JWT which helps us from not storing the token in db .

# For Profile

The Token must be placed in Authorization Header for all operations after login.

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/c8c2237b-0f88-4e68-91d8-f862b9239c85)

# For getting all the task

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/8f3bb72f-7799-4439-bfe4-142243e12302)

# For adding a task

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/4fe18972-7fd3-4566-a700-e7a6e343a902)

# For Editing a task

The Task_ID should be passed in the path .

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/c5fe4b3e-8f38-4602-a304-459f1a335785)

# For Deleting a task

![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/6dbac4b7-cead-4bc6-a451-c765e611f8c1)

# For Stats


![image](https://github.com/Satheeshkumar0807/Yavar_Hackathon/assets/111192171/15c60a7d-3359-4eaa-9001-e373c9019e70)













