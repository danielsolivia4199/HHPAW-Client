# Hip Hop, Pizza, and Wangs Point of Sale System

Hip Hop, Pizza, and Wangs is a community loved restaurant that's stepping into the digital age. This repository is for a POS system that is designed to streamlie their operations and integrate modern technology into their company. 

## Project Description

This POS system is a comprehensive solution for managing orders, tracking revenue, and enhancing customer service efficiency at Hip Hop, Pizza, and Wangs. The objective is to provide a user-friendly platform allowing employees to take orders and record revenue to suit the resturants unique needs.
___
## Features
User Authentication: Secure login for cashiers using Firebase.
Home Screen Display: Welcome screen with options to view and create orders, and view revenue.
Order Management: View all orders, see details, add or delete orders.
Item Management: Add or delete items from orders.
Revenue Tracking: Close orders with payment details and tips, view total revenue.

# Installation 

Clone This Repository

## Starting the Project
1. Create a Firebase project and set up authentication. Use [these videos](https://vimeo.com/showcase/codetracker-firebase) as a refresher if needed.
1. Create a `.env` file at the root of the project
1. Copy/Paste the contents of the `.env.sample` file to your newly created `.env` file.
1. Copy over all of your Firebase values into the `.env` file.
1. Open the `package.json` file and change the `name` property to the name of your application, and `author` to  your name.
1. From your command line, be in the root directory and run `npm install` OR `npm i` for short.
1. Next, run `npm run prepare`. This command sets up husky to track eslint errors on commit that will make your deploy fail on Netlify.
1. To start your application, run `npm run dev`. THIS IS THE COMMAND YOU WILL USE TO RUN YOUR DEVELOPMENT SERVER FROM NOW ON.
1. Open [http://localhost:3000](http://localhost:3000) with your browser.

### If you see this, you are set to go!
<img width="450" alt="Screen Shot 2022-07-06 at 1 07 27 PM" src="https://user-images.githubusercontent.com/29741570/177615077-9b6a75bc-0260-4d29-bb88-bd95a3140687.png">


You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

**NOTES:** 
- If you see the following error, you did not follow all the setup steps correctly and failed to add your Firebase creds. Go back and do that NOW.

<img width="1043" alt="Screen Shot 2022-07-06 at 11 18 45 AM" src="https://user-images.githubusercontent.com/29741570/177612501-c2628f18-4bbd-4de9-aae6-27ffba1172d6.png">
        
## Learn More about Next.js
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Loom Video
https://www.loom.com/share/e9276a4dc7014ecc8381920aabcf3080?sid=63795564-463d-478b-b24b-eb3862b41dcb

## Author
Olivia Daniels
GitHub: https://github.com/danielsolivia4199
LinkedIn: https://www.linkedin.com/in/olivia-daniels-962b47275/
