export async function POST(request: Request) {
  try {
    const requestConfig = {
      method: 'POST',
      // body: JSON.stringify(await request.json()),
      body: request.body,
      duplex: 'half',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/prompt`,
      requestConfig,
    );

    return response;
  } catch (error: any) {
    console.error(
      'Error parsing request body or fetching data:',
      error.message,
    );
    return new Response('Error processing request', { status: 500 });
  }
}
