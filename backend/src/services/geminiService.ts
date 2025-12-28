import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config/env';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || '');
export const generateScheduleRecommendations = async (scheduleData: any) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); // Updated to 1.5 flash as requested or standard

    const prompt = `
      You are a productivity expert. Analyze the following weekly schedule activities and providing 3 specific recommendations to optimize the schedule for better balance, productivity, and well-being.
      
      Schedule Data: ${JSON.stringify(scheduleData)}

      Return the response in this strictly valid JSON format, without markdown code blocks:
      {
        "recommendations": [
          {
            "title": "Short title",
            "description": "Detailed explanation",
            "impact": "High/Medium/Low"
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Cleanup markdown if present
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    return JSON.parse(cleanText);
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate recommendations');
  }
};
