# React + Vite Daily Diary Project

This project is a React + Vite Daily Diary Project. It is a simple project that allows you to create a daily diary and save it to local storage.

The project is deployed on render.com.
It uses:

- react-router for the routing
- local storage for the saving of the diaries
- tailwindcss for the styling,
- daisyui for the UI,
- nanoid for the unique id of the diary,
- react-toastify for the toast notifications

## deploying on render.com

for not defined routes , render.com should use the index.html for the redirection in the setting, otherwise It will provide It own not Found page

In the setting of the project on render.com.

- A new rule should be added to the rules of the project.
- source should be /\*
- Destination should be index.html
- redirect should ne choosen
