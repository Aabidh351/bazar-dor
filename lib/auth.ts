
import "server-only";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { mongoClient, mongoDb } from "@/lib/mongodb";

const secret = process.env.BETTER_AUTH_SECRET;
const baseURL = process.env.BETTER_AUTH_URL;

if (!secret || secret.length < 32) {
  throw new Error(
    "BETTER_AUTH_SECRET must be configured with a secure secret of at least 32 characters",
  );
}

if (!baseURL) {
  throw new Error("BETTER_AUTH_URL is not configured");
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

function requireOAuthCredentials(
  provider: string,
  clientId: string | undefined,
  clientSecret: string | undefined,
) {
  if (!clientId || !clientSecret) {
    throw new Error(
      `Missing ${provider} OAuth credentials. Configure the provider environment variables.`,
    );
  }

  return { clientId, clientSecret };
}

export const auth = betterAuth({
  appName: "BazarDor",

  baseURL,
  secret,

  database: mongodbAdapter(mongoDb, {
    client: mongoClient,
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  socialProviders: {
    google: requireOAuthCredentials(
      "Google",
      googleClientId,
      googleClientSecret,
    ),
    github: requireOAuthCredentials(
      "GitHub",
      githubClientId,
      githubClientSecret,
    ),
  },

  trustedOrigins: [baseURL],
});
