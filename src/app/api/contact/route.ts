import { NextResponse } from "next/server";
import { CreateContactEnquirySchema } from "@/types";
import { getCmsAdapter } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Spam honeypot detection: botField or website must be empty
    if (body.botField || body.website) {
      // Silently accept bot submission without persisting
      return NextResponse.json(
        { success: true, id: "enq-verified-spam-filtered" },
        { status: 200 }
      );
    }

    // Validate payload against Zod schema
    const parseResult = CreateContactEnquirySchema.safeParse(body);
    if (!parseResult.success) {
      const flattenedErrors = parseResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please verify the submitted information.",
          fieldErrors: flattenedErrors,
        },
        { status: 400 }
      );
    }

    // Delegate to CMS adapter
    const adapter = getCmsAdapter();
    const result = await adapter.submitContactEnquiry(parseResult.data);

    return NextResponse.json(
      {
        success: true,
        id: result.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API /api/contact] Error processing contact enquiry:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
