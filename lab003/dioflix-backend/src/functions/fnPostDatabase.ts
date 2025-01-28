import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

export async function fnPostDatabase(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const databaseId = process.env.CosmoDBDatabaseName;
  const containerId = process.env.ContainerName;

  const client = new CosmosClient({
    endpoint: process.env.CosmoDBEndpoint,
    key: process.env.CosmoDBKey,
    connectionPolicy: { enableEndpointDiscovery: true },
  });

  try {
    const requestData = await request.json();

    if (!requestData) {
      return { status: 400, body: "Request body is empty or invalid." };
    }

    const database = client.database(databaseId);
    const container = database.container(containerId);

    const { resource } = await container.items.create(requestData);

    return {
      status: 201,
      body: `Document inserted successfully with id: ${resource?.id}`,
    };
  } catch (error) {
    context.log("Error interacting with Cosmos DB:", error);
    return { status: 500, body: "Error interacting with Cosmos DB." };
  }
}

app.http("fnPostDatabase", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: fnPostDatabase,
});
