const express = require("express");
const app = express();
// const router = express.Router();
const path = require("path");

const fs = require("fs");
const swaggerTools = require("swagger-tools");

// swaggerRouter configuration
const options = {
    controllers: path.join(__dirname, "./controllers"),
    useStubs: false
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(path.join(__dirname, "./api/swagger.json"), "utf8");

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(JSON.parse(spec), function (middleware) {
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

    // Start the server
    app.listen('3000', function () {
        console.log('info', "Gettin' swaggy on port " + '3000');
    });
});
