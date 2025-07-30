// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      serviceType,
      launchTimeline,
      message,
      templateId,
      templateTitle,
      templatePrice,
      templateUrl,
      templateFeatured,
    } = await request.json();

    // Validate required fields
    if (
      !name ||
      !email ||
      !phone ||
      !serviceType ||
      !launchTimeline ||
      !message
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Project description should be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Validate phone number (basic validation)
    if (phone.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number' },
        { status: 400 }
      );
    }

    // Get service type display text
    const serviceTypeText =
      serviceType === 'template-only'
        ? 'Template Files Only'
        : 'Complete Setup Service (Additional fee applies)';

    // Timeline mapping
    const timelineMapping: Record<string, string> = {
      '3-6-days': '3-6 days',
      '1-2-weeks': '1-2 weeks',
      '2-3-weeks': '2-3 weeks',
    };

    const timelineText = timelineMapping[launchTimeline] || launchTimeline;

    // Send emails in parallel
    await Promise.all([
      // Email to admin
      resend.emails.send({
        from: 'Deploy Faster <onboarding@resend.dev>',
        to: [process.env.ADMIN_EMAIL || 'primereserved@gmail.com'],
        subject: `🚀 New Template Request${templateTitle ? ` - ${templateTitle}` : ''}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">
                🚀 New Template Request
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
                Deploy Faster Marketplace
              </p>
            </div>
            
            <div style="padding: 30px;">
              ${
                templateTitle
                  ? `
                <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 20px; border-radius: 12px; margin-bottom: 25px; text-align: center;">
                  <h2 style="color: white; margin: 0; font-size: 18px; font-weight: 600;">
                    ${templateTitle}
                    ${templateFeatured ? ' ⭐' : ''}
                  </h2>
                  ${templatePrice ? `<p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">${templatePrice}</p>` : ''}
                  ${templateId ? `<p style="color: rgba(255,255,255,0.7); margin: 5px 0 0 0; font-size: 12px;">ID: ${templateId}</p>` : ''}
                  ${templateFeatured ? `<p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0; font-size: 12px; font-weight: 500;">✨ Featured Template</p>` : ''}
                  ${templateUrl ? `<p style="margin: 10px 0 0 0;"><a href="${templateUrl}" style="color: rgba(255,255,255,0.9); text-decoration: none; font-size: 12px; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px;">🔗 View Template</a></p>` : ''}
                </div>
              `
                  : ''
              }

              <div style="background-color: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
                <h3 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">
                  👤 Client Information
                </h3>
                <div style="display: grid; gap: 12px;">
                  <p style="margin: 0; color: #475569;"><strong style="color: #1e293b;">Name:</strong> ${name}</p>
                  <p style="margin: 0; color: #475569;"><strong style="color: #1e293b;">Email:</strong> <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
                  <p style="margin: 0; color: #475569;"><strong style="color: #1e293b;">Phone:</strong> <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none;">${phone}</a></p>
                </div>
              </div>

              <div style="background-color: #f0f9ff; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #3b82f6;">
                <h3 style="color: #1e40af; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">
                  ⚙️ Service Requirements
                </h3>
                <div style="display: grid; gap: 12px;">
                  <p style="margin: 0; color: #1e40af;"><strong>Service Type:</strong> ${serviceTypeText}</p>
                  <p style="margin: 0; color: #1e40af;"><strong>Launch Timeline:</strong> ${timelineText}</p>
                </div>
              </div>

              <div style="background-color: #ffffff; padding: 25px; border: 2px solid #e2e8f0; border-radius: 12px; margin-bottom: 25px;">
                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">
                  💬 Project Details
                </h3>
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #64748b;">
                  <p style="line-height: 1.6; color: #475569; margin: 0; font-style: italic;">
                    "${message.replace(/\n/g, '<br>')}"
                  </p>
                </div>
              </div>

              <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 20px; border-radius: 12px; text-align: center;">
                <p style="margin: 0; color: #92400e; font-weight: 600; font-size: 16px;">
                  ⚡ Priority Action Required
                </p>
                <p style="margin: 8px 0 0 0; color: #b45309; font-size: 14px;">
                  Respond within 2 hours for optimal client experience
                </p>
              </div>
            </div>

            <div style="background-color: #1e293b; padding: 20px; text-align: center;">
              <p style="color: #94a3b8; margin: 0; font-size: 12px;">
                Deploy Faster Marketplace | PrimeReserved Team
              </p>
            </div>
          </div>
        `,
      }),

      // Auto-reply to client
      resend.emails.send({
        from: 'Deploy Faster <onboarding@resend.dev>',
        to: [email],
        subject: `✅ Template Request Received - Deploy Faster`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">
                ✅ Request Received!
              </h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
                We'll get back to you ASAP
              </p>
            </div>
            
            <div style="padding: 30px;">
              <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi <strong>${name}</strong>,
              </p>
              
              <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                Thank you for your interest in our template marketplace! We've received your request and our team will contact you ASAP with payment details and next steps.
              </p>

              ${
                templateTitle
                  ? `
                <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 20px; border-radius: 12px; margin-bottom: 25px; text-align: center;">
                  <h2 style="color: white; margin: 0; font-size: 18px; font-weight: 600;">
                    📋 Your Template Request
                  </h2>
                  <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px; font-weight: 500;">
                    ${templateTitle} ${templateFeatured ? '⭐' : ''} ${templatePrice ? `- ${templatePrice}` : ''}
                  </p>
                  ${templateFeatured ? `<p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0; font-size: 12px; font-weight: 500;">✨ Featured Template</p>` : ''}
                  ${templateUrl ? `<p style="margin: 10px 0 0 0;"><a href="${templateUrl}" style="color: rgba(255,255,255,0.9); text-decoration: none; font-size: 12px; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px;">🔗 View Template</a></p>` : ''}
                </div>
              `
                  : ''
              }

              <div style="background-color: #f0f9ff; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #3b82f6;">
                <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
                  📋 Your Request Summary
                </h3>
                <div style="display: grid; gap: 10px;">
                  <p style="margin: 0; color: #1e40af;"><strong>Service:</strong> ${serviceTypeText}</p>
                  <p style="margin: 0; color: #1e40af;"><strong>Timeline:</strong> ${timelineText}</p>
                  <p style="margin: 0; color: #1e40af;"><strong>Contact:</strong> ${phone}</p>
                </div>
              </div>

              <div style="background-color: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">
                  💬 Your Project Details
                </h3>
                <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <p style="color: #475569; margin: 0; line-height: 1.6; font-style: italic;">
                    "${message}"
                  </p>
                </div>
              </div>

              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 25px;">
                <h3 style="color: white; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">
                  ⚡ What Happens Next?
                </h3>
                <div style="text-align: left; color: rgba(255,255,255,0.9); font-size: 14px; line-height: 1.6;">
                  <p style="margin: 0 0 8px 0;">✅ We review your requirements</p>
                  <p style="margin: 0 0 8px 0;">📞 Schedule a brief discovery call to align on details</p>
                  <p style="margin: 0 0 8px 0;">💰 Send payment link and final pricing</p>
                  <p style="margin: 0 0 8px 0;">📝 Request content/assets (if full setup service)</p>
                  <p style="margin: 0 0 8px 0;">🚀 Begin work immediately after payment</p>
                  <p style="margin: 0;">📧 Keep you updated throughout the process</p>
                </div>
              </div>

              <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 25px 0;">
                While you wait, feel free to explore more templates at <a href="https://deployfaster.primereserved.com" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Deploy Faster</a> or check out our other services at <a href="https://primereserved.com" style="color: #3b82f6; text-decoration: none; font-weight: 500;">PrimeReserved</a>.
              </p>
            </div>

            <div style="background-color: #1e293b; padding: 25px; text-align: center;">
              <h3 style="color: white; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">
                Deploy Faster Team
              </h3>
              <p style="color: #94a3b8; margin: 0 0 15px 0; font-size: 14px; line-height: 1.5;">
                Professional website templates for rapid deployment<br>
                Built by <strong style="color: #e2e8f0;">PrimeReserved</strong> - The Web Development Industry
              </p>
              <div style="border-top: 1px solid #374151; padding-top: 15px;">
                <p style="color: #6b7280; margin: 0; font-size: 12px;">
                  🌐 <a href="https://deployfaster.primereserved.com" style="color: #94a3b8; text-decoration: none;">deployfaster.primereserved.com</a> | 
                  💼 <a href="https://primereserved.com" style="color: #94a3b8; text-decoration: none;">primereserved.com</a>
                </p>
              </div>
            </div>
          </div>
        `,
      }),
    ]);

    return NextResponse.json(
      { message: 'Request submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing request:', error);

    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}
