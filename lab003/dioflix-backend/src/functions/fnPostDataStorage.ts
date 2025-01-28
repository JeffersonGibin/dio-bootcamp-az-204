import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
const uuidv4 = require("uuid").v4;

async function uploadImageToBlob(
  accountName: string,
  containerName: string,
  imageBuffer: Buffer,
  extension: string
): Promise<void> {
  const credential = new DefaultAzureCredential();
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    credential
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);

  const exists = await containerClient.exists();
  if (!exists) {
    console.log(`Container "${containerName}" not exists creating...`);
    await containerClient.create();
  }

  const randomId = uuidv4();
  const fileName = `${randomId}.${extension}`;
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  await blockBlobClient.upload(imageBuffer, imageBuffer.length);
}

const getContainerName = (ext: string): string => {
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
    return "images";
  } else if (["mp4", "mkv", "mov", "avi", "wmv", "flv"].includes(ext)) {
    return "videos";
  } else {
    return "unknown";
  }
};

export async function fnPostDataStorage(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const accountName = process.env.AccountName;
    if (
      request.headers.get("content-type")?.includes("multipart/form-data") ===
      false
    ) {
      return { status: 400, body: "Content-Type must be multipart/form-data" };
    }

    const formData = await request.formData();
    const fieldFile = <Blob>formData.get("file");

    if (!fieldFile) {
      return {
        status: 400,
        jsonBody: { message: "The filename not provided" },
      };
    }

    const fileType = fieldFile.type ?? "";
    const ext = fileType.split("/")[1] ?? "";
    const fileBuffer = Buffer.from(await fieldFile.arrayBuffer());
    const containerName = getContainerName(ext);

    if (containerName === "unknown") {
      return {
        status: 400,
        jsonBody: { message: "The file type not supported" },
      };
    }

    await uploadImageToBlob(
      accountName,
      containerName,
      fileBuffer,
      ext
    );

    return {
      status: 200,
      jsonBody: { message: "The midia was uploaded successfully" },
    };
  } catch (error) {
    return { status: 500, jsonBody: { message: "Failed to save midia" } };
  }
}

app.http("fnPostDataStorage", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: fnPostDataStorage,
});
