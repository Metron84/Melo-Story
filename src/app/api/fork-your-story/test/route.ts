import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        error: 'API key not found',
        apiKeyLoaded: false,
      }, { status: 500 });
    }

    // Test the API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    const result = await model.generateContent('Say "test" in one word.');
    const response = result.response.text();

    return NextResponse.json({
      success: true,
      apiKeyLoaded: true,
      apiKeyPreview: apiKey.substring(0, 10) + '...',
      model: 'gemini-2.5-flash',
      testResponse: response,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    return NextResponse.json({
      error: 'Test failed',
      message: errorMessage,
      stack: errorStack,
      apiKeyLoaded: !!process.env.GOOGLE_AI_API_KEY,
    }, { status: 500 });
  }
}
