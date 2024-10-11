#Live link - 

frontend - https://asmfsdclient.vercel.app/
backend - https://asmfsdserver.vercel.app/
Testing liveness of backend - https://asmfsdserver.vercel.app/helloWorld

# How to install

Step 1 : Clone the repository

```http
    git clone https://github.com/MagnusCarlsen26/ASMT_FSD_5.git
```
Step 2: Create Your MongoDB Account and Database/Cluster
Create your own MongoDB account by visiting the MongoDB website and signing up for a new account.

Create a new database or cluster by following the instructions provided in the MongoDB documentation. Remember to note down the "Connect to your application URI" for the database, as you will need it later. Also, make sure to change <password> with your own password

add your current IP address to the MongoDB database's IP whitelist to allow connections (this is needed whenever your ip changes)

Step 3 : Run Client

Run the following commands from root
```http
    cd client
    npm i
    npm start
```
This command will start the frontend server, and you'll be able to access the website on localhost:3000 in your web browser.
Step 4 : Run Server

Run the following commands from root
```http
    cd server
    npm i
    npm start
```

# API Documentation

## Endpoints

### 1. **POST analysis/feedbackByProduct**

#### Description:
Fetch all feedbacks related to a specific product.

#### Request:
- **URL:** `/analysis/feedbackByProduct`
- **Method:** `POST`
- **Content-Type:** `application/json`
  
#### Request Body Parameters:
```json
{
    "productName": "string" // Required. The name of the product to fetch feedback for.
}
```

#### Response:
- **Success (Status 200):**
  ```json
  {
      "isError": false,
      "data": {
          "success": true,
          "feedbacks": [
              {
                  "_id": "feedback_id",
                  "username": "user",
                  "productName": "product_name",
                  "rating": 5,
                  "comments": "Very good product!",
                  "cat": "timestamp"
              }
          ]
      }
  }
  ```
- **Error (Status 500):**
  ```json
  {
      "isError": true,
      "data": {
          "success": false,
          "message": "Internal server Error."
      }
  }
  ```

#### Notes:
This endpoint retrieves feedback from the database by filtering on the provided `productName`.

---

### 2. **POST analysis/averageRatingByProduct**

#### Description:
Fetch the average rating of a specific product.

#### Request:
- **URL:** `/analysis/averageRatingByProduct`
- **Method:** `POST`
- **Content-Type:** `application/json`

#### Request Body Parameters:
```json
{
    "productName": "string" // Required. The name of the product to fetch the average rating for.
}
```

#### Response:
- **Success (Status 200):**
  ```json
  {
      "isError": false,
      "data": {
          "success": true,
          "averageRating": 4.5 // or "No reviews yet."
      }
  }
  ```
- **Error (Status 500):**
  ```json
  {
      "isError": true,
      "data": {
          "success": false,
          "message": "Internal server Error."
      }
  }
  ```

#### Notes:
This endpoint calculates the average rating by aggregating ratings for the given `productName`.

---

### 3. **POST save/saveFeedback**

#### Description:
Save user feedback for a product.

#### Request:
- **URL:** `/save/saveFeedback`
- **Method:** `POST`
- **Content-Type:** `application/json`

#### Request Body Parameters:
```json
{
    "username": "string",    // Required. The username of the feedback provider.
    "productName": "string", // Required. The name of the product being reviewed.
    "rating": "number",      // Required. Rating value (e.g., 1 to 5).
    "comments": "string"     // Optional. Comments provided by the user.
}
```

#### Response:
- **Success (Status 200):**
  ```json
  {
      "isError": false,
      "data": {
          "success": true,
          "message": "Feedback saved successfully !!."
      }
  }
  ```
- **Error (Status 500):**
  ```json
  {
      "isError": true,
      "data": {
          "success": false,
          "message": "Internal server Error."
      }
  }
  ```

#### Notes:
This endpoint saves user feedback including `username`, `productName`, `rating`, and optional `comments`.

---

### 4. **POST save/getHistory**

#### Description:
Fetch the feedback history of a specific user.

#### Request:
- **URL:** `/save/getHistory`
- **Method:** `POST`
- **Content-Type:** `application/json`

#### Request Body Parameters:
```json
{
    "username": "string" // Required. The username to fetch the feedback history for.
}
```

#### Response:
- **Success (Status 200):**
  ```json
  {
      "isError": false,
      "data": {
          "success": true,
          "history": [
              {
                  "_id": "feedback_id",
                  "username": "user",
                  "productName": "product_name",
                  "rating": 5,
                  "comments": "Great product!",
                  "cat": "timestamp"
              }
          ]
      }
  }
  ```
- **Error (Status 500):**
  ```json
  {
      "isError": true,
      "data": {
          "success": false,
          "message": "Internal server Error."
      }
  }
  ```

#### Notes:
This endpoint retrieves all feedback submitted by the specified `username`.

### Architecture and Design Decisions

#### 1. **Modular Design Using Express and Mongoose**
The application follows a modular architecture, breaking the API into multiple router modules. 
#### 2. **Schema Design**
- **Feedback Model**: Captures user feedback about a product. It includes fields like `username`, `productName`, `rating`, and `comments`. 
- **User Model**: Represents the user who provides feedback. While currently minimalistic (only containing `userName`).

#### 3. **RESTful API**
The application exposes RESTful endpoints that handle operations like:
- Fetching feedback by product (`/feedbackByProduct`).
- Calculating average product ratings (`/averageRatingByProduct`).
- Saving new feedback (`/saveFeedback`).
- Retrieving user feedback history (`/getHistory`).

#### 4. **Error Handling and Response Consistency**
Consistent error handling ensures that even if an operation fails, the client receives a uniform response structure. This makes it easier for clients to handle errors:
- The `isError` flag in responses provides an easy way to check for errors.
