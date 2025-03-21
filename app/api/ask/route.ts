import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { query } = await req.json();
        
        // Simulated AI response (Replace with real logic)
        const aiResponse = `AI Response: ${query}`;

        return NextResponse.json({ answer: aiResponse });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
