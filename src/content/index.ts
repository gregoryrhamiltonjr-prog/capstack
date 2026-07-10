import { CRE_TRACKS } from "./cre";
import { HF_TRACKS } from "./hf";
import type { SeedTrack } from "./schema";

export const ALL_TRACKS: SeedTrack[] = [...CRE_TRACKS, ...HF_TRACKS];
export { ROADMAP } from "./roadmap";
export type { SeedTrack };
