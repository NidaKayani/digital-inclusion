/**
 * This Next.js API route acts as a proxy for the FastAPI backend.
 * It forwards the request from the frontend to the Python server and
 * sends the response back. This helps with CORS issues and keeps
 * all API calls within the same domain.
 */

// Replace this with the actual URL where your FastAPI server is running.
// You can also manage this with an environment variable.
const FASTAPI_BASE_URL = "http://localhost:8000";

export async function POST(req: Request) {
  try {
    // Read the request body sent from the Next.js frontend
    const payload = await req.json();

    // Forward the payload to the FastAPI backend's endpoint
    // The endpoint here must match the one defined in your FastAPI main.py
    const response = await fetch(`${FASTAPI_BASE_URL}/api/lesson/plan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // If the FastAPI server returns an error, pass it back to the frontend
    if (!response.ok) {
      const errorText = await response.text();
      return new Response(errorText, { status: response.status });
    }

    // If the response is successful, return the JSON data from FastAPI
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to proxy request to FastAPI:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
