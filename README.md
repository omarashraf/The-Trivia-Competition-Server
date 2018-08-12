# The Trivia Competition

- A competition wher players should answer questions as much as they can. However, one wrong answer means they are out.

- Built using `node`, `angular` and `mongo`.



## How to run?

- Pull the latest version from the `master` branch.
- Run -locally- the `mongo` server.
- `cd` to the root folder and run the following (for running th backend):

    ```
    npm start
    ```

- `cd` to the `frontend` folder within the root one, and to run the frontend:

    ```
    npm start
    ```

- The backend is running on port `3000`, `mongo` is running on port `27017`, and the frontend is running on port `4200`.

## Logging

Universal logging library [express-winston](https://www.npmjs.com/package/express-winston) is used for logging. It has support for multiple transports.  A transport is essentially a storage device for your logs. Each instance of a winston logger can have multiple transports configured at different levels. For example, one may want error logs to be stored in a persistent remote location (like a database), but all logs output to the console or a local file. We just log to the console for simplicity, you can configure more transports as per your requirement.
