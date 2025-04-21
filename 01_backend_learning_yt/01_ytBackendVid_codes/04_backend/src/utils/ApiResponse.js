class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };

/**
 * The `ApiResponse` class provides a standardized structure for API responses.
 * It includes properties for the HTTP status code, response data, a message,
 * and a success indicator based on the status code.
 */
