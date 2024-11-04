import { NextResponse } from "next/server";
import {OpenAI} from 'openai'

const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_PROFILE_API,
  });

export async function POST(request: Request) {
    const data = await request.json();

    console.log("API OPENAI")

    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: data.promp}],
        model: 'gpt-4o-mini-2024-07-18',
        temperature: 1,
      })

    const quoto = chatCompletion.choices[0]?.message?.content

    /* const response = quoto?.trim();

    const dataJson = JSON.parse(response!); */

    const parse = quoto?.replaceAll('```', '')
    const parse_ = parse?.replace('json', '')
    return NextResponse.json(parse_);

}