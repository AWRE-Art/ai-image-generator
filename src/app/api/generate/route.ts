// import { NextResponse } from "next/server";
import { requestAIImage } from '@neuralkit/ai-art-helper';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const imgData = await requestAIImage();
    return new Response(JSON.stringify(imgData));
  } catch (error) {
    // Log the error or handle it as needed
    console.error('Failed to fetch image:', error);

    // Return a response with a specific error code, e.g., 503 Service Unavailable
    return new Response('Unable to connect to the image service', { status: 503 });
  }
}
