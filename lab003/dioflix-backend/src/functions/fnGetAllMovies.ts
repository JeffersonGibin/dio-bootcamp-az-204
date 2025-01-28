import {
    app,
    HttpRequest,
    HttpResponseInit,
    InvocationContext,
  } from "@azure/functions";
  import { CosmosClient } from "@azure/cosmos";

export async function fnGetAllMovies(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
try {
    const databaseId = process.env.CosmoDBDatabaseName;
    const containerId = process.env.ContainerName;

    const client = new CosmosClient({
      endpoint: process.env.CosmoDBEndpoint,
      key: process.env.CosmoDBKey,
    });

    const database = client.database(databaseId);
    const container = database.container(containerId);

    const query = {
      query:
        "SELECT c.id, c.title, c.thumb FROM c",
    };

    const { resources: results } = await container.items
      .query(query)
      .fetchAll();

    if (results.length === 0) {
      return {
        status: 404,
        jsonBody: { message: `No document found results` },
      };
    }

    return { status: 200, jsonBody: {
        data: results
    } };
  } catch (error) {
    return {
      status: 500,
      jsonBody: { message: "An error occurred while fetching movie details." },
    };
  }
};

app.http('fnGetAllMovies', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: fnGetAllMovies
});
