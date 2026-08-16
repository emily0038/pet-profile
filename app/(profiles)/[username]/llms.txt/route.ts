import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { generateLlmsTxt } from '@/lib/llmsTxt';
import { isSubdomainsEnabled } from '@/utils/url';

interface RouteParams {
  params: Promise<{
    username: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { username: domain } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('domain', domain)
    .single();

  if (!profile || !profile.template_id) {
    return new NextResponse('Not found', { status: 404 });
  }

  // Custom content takes priority; otherwise generate from profile data
  if (profile.llms_txt_content?.trim()) {
    return new NextResponse(profile.llms_txt_content, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const { data: services } = await supabase
    .from('services')
    .select(`*, menu_items:service_menu_items(*)`)
    .eq('profile_id', profile.id)
    .order('created_at', { ascending: true });

  const { data: serviceAreas } = await supabase
    .from('service_areas')
    .select('*')
    .eq('profile_id', profile.id)
    .order('"order"', { ascending: true });

  // On subdomains/custom domains the host alone identifies the profile
  // (middleware already rewrote the request based on it). In local
  // path-based dev, the host is generic (localhost:3000 for every
  // profile), so the domain segment has to be appended explicitly.
  const origin = `${request.nextUrl.protocol}//${request.headers.get('host') || ''}`;
  const siteUrl = isSubdomainsEnabled() ? origin : `${origin}/${domain}`;

  const content = generateLlmsTxt(profile, services || [], serviceAreas || [], siteUrl);

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
