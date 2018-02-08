# Simple Gerrit UI for notifications

## Preconditions
 
You should have:
- node.js installed (version 8+ or the one that supports ES6+)
- Chrome or other browser that supports ES6 and Notification API
- Gerrit, with Jenkins integration (maybe message annotation would work with other CIs, though)

## How to run

Clone the project and rename `configuration.example.js` to `configuration.js` and replace all properties according to your needs. Build the project with `npm install` and then run:

`npm start`

It will start an instance of express.js server on port 3000. You should be able to open browser on `http://localhost:3000/ui` to display UI. First you will be required to enable notifications in order to receive some.

## Dev mode

If you don't have Gerrit instance available, you can start in development mode. You need to run to separate development scripts that would serve the frontend and backend parts separately. 

`npm start:dev`

and

`npm bundle:watch`

This would start the webpack watcher that will build the changes as you save files. You need to refresh the page manually, though :).

## Contribution

Feel free to fork and reuse it anyhow you like. If you find it useful you can create an issue and I might be able to implement it.
