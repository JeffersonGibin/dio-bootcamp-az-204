import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";

export async function fnGetMovieDetail(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const databaseId = process.env.CosmoDBDatabaseName;
    const containerId = process.env.ContainerName;

    const client = new CosmosClient({
      endpoint: process.env.CosmoDBEndpoint,
      key: process.env.CosmoDBKey,
    });

    const id = request.params.id;
    if (!id) {
      return {
        status: 400,
        jsonBody: { message: "Parameter 'id' is required." },
      };
    }

    const database = client.database(databaseId);
    const container = database.container(containerId);

    const query = {
      query:
        "SELECT c.id, c.title, c.description, c.video, c.thumb FROM c WHERE c.id = @id",
      parameters: [{ name: "@id", value: id }],
    };

    const { resources: results } = await container.items
      .query(query)
      .fetchAll();

    if (results.length === 0) {
      return {
        status: 404,
        jsonBody: { message: `No document found with id: ${id}` },
      };
    }

    return { status: 200, jsonBody: results[0] };
  } catch (error) {
    return {
      status: 500,
      jsonBody: { message: "An error occurred while fetching movie details." },
    };
  }
}
app.http("fnGetMovieDetail", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: fnGetMovieDetail,
});
