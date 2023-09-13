import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: prismic.ClientConfig["routes"] = [
  {
    type: "homepage",
    path: "/service",
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};


// import { createClient } from "../prismicio";

// export function getPrismicClient(req?: unknown) {
//   const prismic = Prismic.client(
//     process.env.PRISMIC_ENDPOINT,
//     {
//       req,
//       accessToken: process.env.PRISMIC_ACCESS_TOKEN,
//     }
//   );
//   return prismic;
// }