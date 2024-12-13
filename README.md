# Clip-Concise
Clip Concise is a YouTube video summarizer project created during college. The application combines multiple technologies to provide a seamless and interactive user experience.

Features
Accepts YouTube video links to generate concise summaries.
Summarization powered by YouTube APIs for transcript extraction and Gemini AI for summary generation.
User authentication and account creation functionality, with details stored in a PostgreSQL database.
Personalized summary history for each user.
Technologies Used
Frontend:

JSP for dynamic web pages.
HTML, CSS, and JavaScript for structure, styling, and client-side validation.
AJAX for seamless server communication.
Backend:

Java (including Process API) for server-side logic and invoking Python scripts.
JDBC for database connections to PostgreSQL.
Python for transcript processing using YouTube APIs and Gemini AI.
Database:

PostgreSQL to store user details and summary history.
APIs:

YouTube API for extracting video transcripts.
Gemini AI for generating meaningful summaries.


How It Works
Users input a YouTube video link via JSP-based forms.
The link is passed to a Python script through Java's Process API.
The Python script retrieves the video transcript using YouTube APIs.
The transcript is summarized using Gemini AI.
The generated summary is displayed on the web page.
User details and summary history are stored in the PostgreSQL database.

Note

This project was our first attempt at building something innovative during college. While it combines multiple technologies and achieves its intended functionality, it is not entirely robust or independent. Some parts of the process could be further optimized and improved. However, it reflects our effort to try something new and learn from the experience.
