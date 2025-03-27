# eDolly - an e-commerce web application made with React and Node.js

**NOTE:** The project was initially developed in 2022 with basically no programming experience and hasn't been updated to newer standards or fixing the bad architectural choices (especially in the database). There is a separate branch (`server-to-aspnet`), where the server is basically rewritten from scratch in ASP.NET Core, following modern practices, improved DB design and API communication, but very little progress is made so far.

The project consists of 3 modules:

-   **The client**: a single-page application created using React, Google Maps for easybox delivery (not fully implemented) and Three.js for 3D models of products that support that
-   **The server**: a simple server created using Node.js and Express, using bcrypt for password hashing and passport.js for authentication. The database used is MySQL
-   **The admin**: another React application that is used for adding new products to the stock or modifying them (full CRUD support is not implemented)

Features:

-   Create and update products functionality for admins
-   Products can have images, video and even 3D objects!
-   Products have a name, description and specifications
-   Review system (very basic)

Problems:

-   The entire DB architecture suffers from poor design decisions like the lack of normalization because those concepts were unknown at the time of the implementation
-   The lack of proper error handling
