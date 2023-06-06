# Welcome!

- [Hosted Application](https://bds-coding-exercise.onrender.com)

### Problem

Develop a full stack application that walks a user through a sample clinical assessment; 
a multiple-choice questionnaire that is grouped in multiple sections.  Present a summary
of answers at the end as well as Level-2 Assessments user is qualified for 
based on the answers selected.


### Solution

Remix.run framework with typescript and basic stack option
Prisma ORM with sqlite database
Tailwind CSS 
Jest Test Runner 
REST architecture 

##### Frontend
  1. We present a UI to select a screener
  2. User navigates to selected screener 
  3. User is guided through questions section by section one question at a time with progress bar showing overall progress 
  4. When last answer is selected answers are submitted to server and recommended level 2 ssessments returned by server is displayed in a summary along with selected answers

##### Backend
  1. Contains 1 end point (/api/answers) to post answers and get back level 2 assessments
  2. Pre-seeded database with question domain mapping as well as sample screeners
  3. One test to ensure api endpoint works

#### Rationale

 Typescript better than Javascript
 
 Prisma type-safe ORM that works well with typescript even though it does not currently provide support for json
 columns in Sqlite which introduced added overhead in the code to serialize and deserialize json objects
 
 Remix.run next gen react based full stack framework with seemless browser and server runtime and many other features that make it stand out; it comes with built-in official stacks that are production ready and suitable for a variety of situations from proof of concepts to large and fast production grade applications
 
 SQLite database zero-configuration and dead simple to use

#### Production Deployment

I would upgrade to one of Remix.run official stacks which are production grade, containerized and ship on fly.io 

    How would ensure the application is highly available and performs well?
      Availability
        - Multi region deployment both app and database 
        - Health check monitoring
       - Failover 
       - Load balancing
       - database backups
      Performance (upgrade to production grade database Fly Postgres)
       -  Auto scaling both server and database
       - Load balancing 
    How would you secure it?
      - use Helmet to secure express apps
      - authentication
      - authorization 
      - strong passwords
      - multi factor authentication
      - SSL/TLS

    What would you add to make it easier to troubleshoot problems while it is running live?
      - logging/monitoring 
       Fly.io hosts a prometheus server (an open-source systems monitoring and alerting toolkit) and automatically tracks several metrics about the application; combine that with a visualization software like Grafana to make it easier to analyze and understand the metrics 
      
      Another possibility would be to add Sentry instead since I am not familiar with Fly.io alerts and metrics; Sentry provides Error and 
      Performance monitoring along with Session Replay
  
 ### TradeOffs      
 
 Remix.run framework is new to me, so there was a lot of additional learning to be done to complete the exercise as a result the implementation may not be on the same level as with someone who more experience with Remix.run,
 with the upside of all the benefits Remix.run offers like production stack, easy to deploy, a lot of batteries included
 
### Miscellaneous

- [Other code](https://drive.google.com/file/d/174UXhqfDkDw9W1SIfhaQtHlyuLp_-ktf/view?usp=sharing.)
- 
- [Resume](https://docs.google.com/document/d/16QrG0ipLVH9eo8Tjvl0sX5OCFIr5dYqh/edit?usp=sharing&ouid=116542929816862573061&rtpof=true&sd=true)