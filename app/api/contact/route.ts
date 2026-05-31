import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.service || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, service, message' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // --- TODO: Connect to PostgreSQL via Prisma ---
    // Example:
    // await prisma.contactSubmission.create({
    //   data: {
    //     name: body.name,
    //     email: body.email,
    //     phone: body.phone ?? null,
    //     company: body.company ?? null,
    //     service: body.service,
    //     message: body.message,
    //   },
    // });

    // --- TODO: Send email notification ---
    // Example with Nodemailer or Resend:
    // await sendEmail({
    //   to: 'hello@truesolution.dev',
    //   subject: `New inquiry from ${body.name}`,
    //   body: `Service: ${body.service}\nMessage: ${body.message}`,
    // });

    // Log submission (development stub)
    console.log('[TrueSolution Contact Form] New submission:', {
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      service: body.service,
      message: body.message,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. We will get back to you within 24 hours.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact API] Error processing submission:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'TrueSolution Contact API — POST to this endpoint with your form data.' },
    { status: 200 }
  );
}
