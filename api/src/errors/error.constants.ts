export const errors = {
  JWT_ERROR: {
    errorCode: 403,
    name: "JWT Error!",
    message: "Error in validating admin JWT!",
  },
  MONGODB_CONNECT_ERROR: {
    errorCode: 500,
    name: "MongoDB Connect Error!",
    message: "Error connecting to MongoDB instance!",
  },
  USER_DNE: {
    errorCode: 401,
    name: "ValidationError!",
    message: "Email or Password Wrong!",
  },
  USER_DUPLICATE: {
    errorCode: 401,
    name: "ValidationError!",
    message: "Username already exists! Please pick a new one!",
  },
};
