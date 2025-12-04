/**
 * Universal API client function to make requests to the backend API.
 *
 * @param url - API endpoint URL
 * @param options - Fetch options
 * @returns - Response data parsed as JSON
 * @throws - Error if the request fails
 *
 * Note: This function is used both on client and server sides to make API requests.
 * On the server side, it leverages Next.js's fetch with revalidation.
 * On the client side, it works like a standard fetch with credentials included.
 */

export const apiClient = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const res = await fetch(url, {
    next: { revalidate: 3600 },
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include', // Include cookies for authentication
    ...options,
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Request failed with status ${res.status}`);
  }
  return res.json();
};
