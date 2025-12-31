import { getUserSettings } from '@/feature/user-settings/mutations';

export async function GET() {
  const response = await getUserSettings();
  return Response.json(response);
}
