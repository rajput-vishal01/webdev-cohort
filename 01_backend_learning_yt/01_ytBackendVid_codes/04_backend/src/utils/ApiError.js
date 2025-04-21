class ApiError extends Error {
  constructor(
      statusCode,
      message= "Something went wrong",
      errors = [],
      stack = ""
  ){
      super(message)
      this.statusCode = statusCode
      this.data = null
      this.message = message
      this.success = false;
      this.errors = errors

      if (stack) {
          this.stack = stack
      } else{
          Error.captureStackTrace(this, this.constructor)
      }

  }
}

export {ApiError}


/**
 * The `ApiError` class extends the built-in `Error` class to create structured errors for API responses.
 * It includes a `statusCode`, `message`, `errors` array, `data` for extra information, and the error `stack`.
 * 
 * This class is used to provide consistent error handling throughout the API.
 * 
 * Note: This custom error handler does not directly interact with Express response methods (e.g., `res.status()`).
 * It must be thrown or passed to Express middleware to generate the HTTP response.
 */
