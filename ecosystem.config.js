module.exports = {
    apps: [
      {
        name: "ecommerce-frontend",
        script: "pnpm",
        args: "run start",
        env: {
          PORT: 3002
        }
      }
    ]
  };
