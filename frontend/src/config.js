const config = {
  STRIPE_KEY:
    "pk_test_51Lm5z3DkAe0Egm4Y7ToLE3E6jtpi2B6r29mVLje2FqMrmNoDhGFkiYscUZQoXfa4qlr9Lk5jZfBD88nlFb8V6dNz00IoGaIXrb",
  MAX_ATTACHMENT_SIZE: 5000000,
  // Backend config
  // Here we are loading the environment that are set from our serverless backend.
  s3: {
    REGION: process.env.REACT_APP_REGION,
    BUCKET: process.env.REACT_APP_BUCKET,
  },
  apiGateway: {
    REGION: process.env.REACT_APP_REGION,
    URL: process.env.REACT_APP_API_URL,
  },
  cognito: {
    REGION: process.env.REACT_APP_REGION,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
};

export default config;
