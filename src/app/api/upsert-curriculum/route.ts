import { retiredMaintenanceResponse } from "@/lib/retired-maintenance";

// Use scripts/upsert-curriculum.ts from a trusted operator environment instead.
export async function GET() {
  return retiredMaintenanceResponse();
}

export async function POST() {
  return retiredMaintenanceResponse();
}
