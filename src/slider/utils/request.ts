export async function request(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const response = await window.fetch(input, init);
  if (!response.ok) {
    throw new Error('NetWorkError');
  }
  return response;
}
