// import { NextResponse } from "next/server";
import { requestAIImage } from "@neuralkit/ai-art-helper";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // const body = req.body;
  // environmentSetup;
  // batchRequests(config, 5);

  // const directoryPath = join(process.cwd(), "my_directory");
  // const filePath = join("/tmp", "server_test.txt");
  // console.log(filePath);
  // fs.writeFileSync(filePath, "????");

  // console.log(filePath);
  const imgData = await requestAIImage();

  return new Response(JSON.stringify(imgData));
}
