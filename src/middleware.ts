
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  
  let token = request?.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
}

export const config = {
  matcher: ["/profile"],
};
