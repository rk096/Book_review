# Book Review Platform API (Backend)

This project implements a RESTful API for a book review platform with user authentication, review management, web scraping for book data, and a scheduler to periodically update book information.

## Features

1. **User Authentication and Authorization**
   - User registration and login using JWT (JSON Web Tokens) for secure authentication.
   - Only authenticated users can perform CRUD operations on their reviews.

2. **Review Management API**
   - **Create a Review:** `POST /reviews`
   - **Get All Reviews with Pagination:** `GET /reviews?page=1&size=10`
   - **Get a Single Review:** `GET /reviews/{review_id}`
   - **Update a Review:** `PUT /reviews/{review_id}`
   - **Delete a Review:** `DELETE /reviews/{review_id}`

3. **Web Scraping**
   - Scrapes book data from Open Library's trending books page daily.
   - Stores scraped data in the database and updates existing entries.

4. **Scheduler**
   - Implements a scheduler to run the web scraper daily to update book data.


## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rk096/Book_review
   cd book_review
   npm install
   
2.**Install dependencies:**
   npm install


3. **Run the application:**
  bash
  nodemon index 
