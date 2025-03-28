import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set in .env.local
});

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Call the OpenAI API using GPT-3.5-turbo
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: query }],
    });

    const answer = completion.choices[0].message?.content;
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Error processing API request:', error);
    return NextResponse.json({ error: 'insufficient_quota' }, { status: 500 });
  }
}
