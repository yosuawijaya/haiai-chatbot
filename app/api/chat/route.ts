import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json()

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey || apiKey === 'your_api_key_here') {
      return NextResponse.json(
        { error: 'API key not configured. Get your free key at https://openrouter.ai/keys' },
        { status: 500 }
      )
    }

    const messages = [
      {
        role: 'system',
        content: 'You are a helpful, friendly AI assistant. Respond in a conversational and helpful manner. Use emojis occasionally to be more engaging.'
      },
      ...history.map((msg: { content: string; isUser: boolean }) => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ]

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'HaiAI'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('OpenRouter API error:', error)
      return NextResponse.json(
        { error: error.error?.message || 'Failed to get response' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.'

    return NextResponse.json({ response: aiResponse })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
