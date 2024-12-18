# Lively Feed Link

## [Live ✨](https://lively-feed-link-467f5f2fb821.herokuapp.com/)

## Install lively-feed-ink locally

- Clone this repo.
- Run `npm install`.
- Configure your environment variables by adding:
  - `VITE_APP_BASE_URL`: The base URL for fetching data from the server.
- Start the app by running `npm run dev`.

---

## Approach

### **Fetching Data**

- Used the Hacker News API endpoints to retrieve the list of top stories (`/topstories.json`) and details of individual stories (`/item/{storyId}.json`).
- Since the `/topstories.json` endpoint only returns an array of numbers (story IDs) and not complete article details (like author, title, and score), I implemented a solution to handle this limitation:
  - `getStoryIds`: Fetches the list of story IDs.
  - `getArticle`: Fetches details for a single article by ID.
  - `getArticles`: Combines results from `getStoryIds` and `getArticle` to fetch all article details.
  - Used `Promise.all` to handle multiple asynchronous requests efficiently and aggregate story details.

### **React Query**

- Leveraged React Query to handle API calls, caching, and loading states efficiently.

### **Pagination**

- Implemented pagination to display 10 articles per page with dynamic navigation using "Previous" and "Next" buttons.
- Used React state to manage the current page and updated the API fetch query dynamically.

### **Responsive Design**

- Built the user interface using TailwindCSS to ensure responsiveness across devices.

### **Error Handling and Loading States**

- Included error handling to display appropriate messages if API calls fail.
- Used skeleton components for a smooth loading experience while data is being fetched.

## Author:

- [Abdallah Al-Tanna](https://github.com/abdallahaltanna)
