import type { NextApiRequest, NextApiResponse } from 'next'

const API_KEY = process.env.PERPLEXITY_API_KEY
console.log('API Key:', API_KEY ? 'Set' : 'Not set');
const API_URL = 'https://api.perplexity.ai/chat/completions'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { searchInput, page = 1, pageSize = 10 } = req.body;

      if (!API_KEY) {
        throw new Error('API key is not set');
      }

      const prompt = `Suggest diverse careers for someone with a major in ${searchInput}. For each career, provide:

        1. A job title.
        2. A detailed explanation (about 75-100 words) on why this major is excellent preparation for this career. Highlight specific skills and knowledge gained from the major that are particularly valuable in this role.
        3. The following additional information:
           - Salary Range (e.g., "$50,000 - $100,000")
           - Job Growth (must be one of: "Low (0-5%)", "Medium (6-15%)", or "High (16%+)")
           - Job Scarcity (must be one of: "Low", "Medium", or "High")
           - Required Education (e.g., "Bachelor's", "Master's", "Doctorate", "Certificate")
           - Job Competition (must be one of: "Low", "Medium", or "High")

        Format your response as a JSON array with objects, each containing the following fields: 'title', 'description', 'salaryRange', 'growth', 'scarcity', 'education', and 'competition'.
        
        IMPORTANT: Provide ONLY the JSON array. Do not include any other text before or after the JSON.`;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-sonar-small-128k-online",
          messages: [
            {
              role: "system",
              content: "You are a career advisor AI specializing in connecting academic majors to diverse career opportunities. Always respond with valid JSON containing career items."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 12096,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Raw AI response:", data.choices[0].message.content);

      // Try to extract JSON from the response
      const jsonMatch = data.choices[0].message.content.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("Could not find JSON array in the response");
      }

      let careers = JSON.parse(jsonMatch[0]);

      if (!Array.isArray(careers)) {
        throw new Error("Invalid careers data: not an array");
      }

      // Add id to each career
      const careersWithIds = careers.map((career, index) => ({
        ...career,
        id: index + 1
      }));

      // Implement pagination
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedCareers = careersWithIds.slice(startIndex, endIndex);

      res.status(200).json({
        careers: paginatedCareers,
        total: careersWithIds.length,
        page,
        pageSize
      });
    } catch (error) {
      console.error('Detailed error in API route:', error);
      res.status(500).json({ error: 'Failed to fetch career data', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}