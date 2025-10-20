import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.MAILCHIMP_API_KEY!;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID!;
    const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX!;

    const response = await fetch(`https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`, {
      method: "POST",
      headers: {
        Authorization: `apikey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    });

    const data = await response.json();

    if (response.status >= 400) {
      return NextResponse.json({ error: data.detail || "Subscription failed" }, { status: 400 });
    }

    return NextResponse.json({ message: "Subscribed successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Mailchimp error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
