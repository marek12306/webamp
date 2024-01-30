import { Track, URLTrack, PartialState } from "./Webamp";
// @ts-ignore
import llamaAudio from "url:../mp3/llama-2.91.mp3";

interface Config {
  initialTracks?: Track[];
  audioUrl?: string;
  skinUrl?: string;
  disableMarquee?: boolean;
  initialState?: PartialState;
}

const { hash } = window.location;
let config: Config = {};
if (hash) {
  try {
    config = JSON.parse(decodeURIComponent(hash).slice(1));
  } catch (e) {
    console.error("Failed to decode config from hash: ", hash);
  }
}

// Backwards compatibility with the old syntax
if (config.audioUrl && !config.initialTracks) {
  config.initialTracks = [{ url: config.audioUrl }];
}

export const SHOW_DESKTOP_ICONS = true;

if ("URLSearchParams" in window) {
  // const params = new URLSearchParams(location.search);
  // SHOW_DESKTOP_ICONS = Boolean(params.get("icons"));
}

export const skinUrl = config.skinUrl ?? null;

export const defaultInitialTracks: URLTrack[] = [
  {
    url: "/play",
  },
];

export const initialTracks = config.initialTracks || defaultInitialTracks;

export const disableMarquee = config.disableMarquee || false;
export const initialState = config.initialState || undefined;
