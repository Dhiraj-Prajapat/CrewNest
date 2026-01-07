const authConfig = {
  providers: [
    {
      domain: process.env.CONVEX_SITE_URL || process.env.AUTH_SITE_URL,
      applicationID: "convex",
    },
  ],
};

export default authConfig;