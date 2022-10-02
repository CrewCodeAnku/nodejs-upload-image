class Response {
  showDatabaseErrorResponse = (message, error) => {
    var resData = {
      success: false,
      status_code: 500,
      error_code: 5005,
      error_description: "Database error!",
      message: message,
      data: {},
      error: error,
    };
    return resData;
  };

  showSuccessResponse = (message, data) => {
    var resData = {
      success: true,
      status_code: 200,
      message: message,
      data: data,
    };
    return resData;
  };

  showFailedResponse = (message, data) => {
    var resData = {
      success: false,
      status_code: 422,
      error_code: 5002,
      message: message,
      data: data,
    };
    return resData;
  };

  showValidationErrorResponse = (message) => {
    var resData = {
      success: false,
      status_code: 422,
      error_code: 5002,
      error_description: "Validation Error!",
      message: message,
      data: {},
      error: {},
    };
    return resData;
  };

  showInternalServerErrorResponse = (message) => {
    var resData = {
      success: false,
      status_code: 500,
      error_code: 5003,
      error_description: "Internal Coding error or Params Undefined!",
      message: message,
      data: {},
      error: {},
    };
    return resData;
  };
}

const response = new Response();

export default response;
