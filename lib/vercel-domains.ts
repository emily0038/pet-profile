const VERCEL_API_BASE = 'https://api.vercel.com';

interface VercelDomainResponse {
  name: string;
  verified: boolean;
  verification?: Array<{
    type: string;
    domain: string;
    value: string;
    reason: string;
  }>;
}

interface VercelErrorResponse {
  error?: {
    message: string;
    code?: string;
  };
}

/**
 * Add a custom domain to the Vercel project
 */
export async function addDomainToVercel(domain: string): Promise<VercelDomainResponse> {
  if (!process.env.VERCEL_API_TOKEN) {
    throw new Error('VERCEL_API_TOKEN is not configured');
  }

  if (!process.env.VERCEL_PROJECT_NAME) {
    throw new Error('VERCEL_PROJECT_NAME is not configured');
  }

  const response = await fetch(
    `${VERCEL_API_BASE}/v9/projects/${process.env.VERCEL_PROJECT_NAME}/domains`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: domain }),
    }
  );

  if (!response.ok) {
    const error: VercelErrorResponse = await response.json();
    throw new Error(error.error?.message || 'Failed to add domain to Vercel');
  }

  return response.json();
}

/**
 * Check the status of a custom domain in Vercel
 */
export async function checkDomainStatus(domain: string): Promise<VercelDomainResponse> {
  if (!process.env.VERCEL_API_TOKEN) {
    throw new Error('VERCEL_API_TOKEN is not configured');
  }

  if (!process.env.VERCEL_PROJECT_NAME) {
    throw new Error('VERCEL_PROJECT_NAME is not configured');
  }

  const response = await fetch(
    `${VERCEL_API_BASE}/v9/projects/${process.env.VERCEL_PROJECT_NAME}/domains/${domain}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    const error: VercelErrorResponse = await response.json();
    throw new Error(error.error?.message || 'Failed to check domain status');
  }

  return response.json();
}

/**
 * Remove a custom domain from the Vercel project
 */
export async function removeDomainFromVercel(domain: string): Promise<void> {
  if (!process.env.VERCEL_API_TOKEN) {
    throw new Error('VERCEL_API_TOKEN is not configured');
  }

  if (!process.env.VERCEL_PROJECT_NAME) {
    throw new Error('VERCEL_PROJECT_NAME is not configured');
  }

  const response = await fetch(
    `${VERCEL_API_BASE}/v9/projects/${process.env.VERCEL_PROJECT_NAME}/domains/${domain}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    const error: VercelErrorResponse = await response.json();
    throw new Error(error.error?.message || 'Failed to remove domain from Vercel');
  }
}
