export default async function handler(req, res) {
    if (req.method !== 'POST') {
      // Only allow POST requests
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  
    const { query } = req.body;
  
    // Validate the incoming request
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
  
    try {
      // Here, you would integrate your AI API (like a free OpenAI/Gemini endpoint)
      // For demonstration, we return a dummy response.
      const answer = `You asked: "${query}". This is a dummy response from the API endpoint.`;
  
      return res.status(200).json({ answer });
    } catch (error) {
      console.error('Error processing API request:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  