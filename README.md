![Cooldown Logo](https://github.com/parmeyjohn/cooldown/assets/102949080/07b717bd-a5b3-4428-97bd-96f478a6d663)
## Description
Cooldown is a full-stack mindfulness app where users can track and reflect on gaming sessions. It was created because I've yet to find an easy-to-use journaling service tailored toward this use case.


## Features
Users can create, read, search, edit, and delete journals which group entries by genre, title, or user defined fields. Within each journal users can then create entries that can be sorted, searched, edited, or deleted depending on the user's needs. When creating or editing entries users can set a title, date/time, search an external database for which game they played, write a rich-text entry reflecting on what they played, and adding tags which provide easy searching on the home page. 


## Getting Started
Link to website: https://usecooldown.com

Enter the demo account with 'username' and 'password' as the username and password.

Note: I'm currently hosting using the free tier of render.com, which can take a minute or two to spin up. I'm considering alternatives for hosting but also working on a demo video for a quicker overview.

## Tech
The app was built using the MERN stack primarily because I've been going through the fullstackopen course and wanted to apply what I've learned but also for a few other reasons. 
Here is a list of the tech I used (and why I used it):
* Frontend:
  * React: Powerful, widely used, and I wanted to improve with it
  * Tailwind CSS: Hastened my workflow and forced me to use good CSS practices
  * React Router: Provides seamless client side routing and easily let me authorize those routes. 
  * Cypress: Properly emulates and tests the frontend user flow so I no longer have to do it by hand. 
 
* Backend:
  * NodeJS: The app was originally intended to help me focus on frontend concepts and I wanted a simple and flexible backend stack to support it. Node along with the rest of the MERN stack fit that bill. Also being able to use JavaScript for the entire app was nice.
  * ExpressJS: It works well with Node and MongoDB
  * MongoDB Atlas: The flexibility of not needing to migrate schema and being able to scale easily in the future are both appealing.
  * jsonwebtoken: Helped me easily implement auth so I could focus on learning about security and best practices. I'm considering upgrading to Amazon Cognito, Firebase Auth, or Auth0 in the future for extra features like social media login but they aren't as budget friendly as jwt. 
  * Jest and Supertest: Helped me easily test backend routes without having to manually test them every single time.

## Challenges
This is one of the first full-stack apps of this scale I've built from the ground up, so there was a ton of learning during the process.

For the frontend, getting used to Tailwind and studying UX principles were a bit time consuming but I'm glad I did. Working with QuillJS (the library used to create text entries) was a hassle and I'm going to update it in the near future. I want to allow users to upload their own images to show on each journal entry but without using something like AWS S3 for storage this isn't feasible. Also testing with Cypress is very helpful but had a steep learning curve when using it for the first time. I found that most of my code wasn't optimized for how the tests select elements on the page, so I had to refactor some code. I'm going to keep that optimization in mind for my future apps. 

For the backend, working with auth and catching errors were the biggest challenge. 

For other challenges, making the logo from scratch with Figma was challenging but rewarding. 

## Future Updates 
I am currently working on features that expand the analytic value of cooldown. I want to add pages for statistics or a timeline view so users can see how much time they spend on gaming and what games they play the most consistently. I also want to add templates for journal entries so users can create an optimized empty template for whatever genre they are playing. Adding sharing features would also be cool so users can share their original templates. Finally, gaming will still be at the heart of the app but I'd like to make it more general for those which want to use it for that. 

## Feedback
For any requests feel free to post an issue and I'll respond to it. For general feedback feel free to contact me via my socials on my profile.
