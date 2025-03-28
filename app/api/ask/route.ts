import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export async function POST(req) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }


    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: query }]
        }]
      }),
    });

    const data = await response.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Error processing API request:', error);
    return NextResponse.json({ error: 'internal_server_error' }, { status: 500 });
  }
}
