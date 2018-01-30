# Simple Gerrit UI for notifications

## Preconditions
 
You should have:
- node.js installed
- Chrome or other browser that supports ES6 and Notification API
- Gerrit, duh

## How to run

Clone the project and rename `configuration.example.js` to `configuration.js` and replace all properties according to your needs. Build the project with `npm install` and then run:

`npm start`

It will start an instance of express.js server on port 3000. You should be able to open browser on `http://localhost:3000/ui` to display UI. First you will be required to enable notifications in order to receive some.

## Contribution