/**
 * Page-wide "only one video has sound at a time" coordinator. When any video
 * is unmuted it "claims" audio; every other registered video mutes itself.
 * Decoupled via a window event so it works across separate components
 * (hero, Dimitri story clips, etc.) without shared React state.
 */

const EVENT = "benefactor:audio-claim";

// Call when a video becomes the active (unmuted) one.
export function claimAudio(id: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
}

// Subscribe; `onLoseAudio` fires when a *different* video claims audio.
export function onAudioClaim(id: string, onLoseAudio: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => {
    const claimer = (e as CustomEvent).detail as string;
    if (claimer !== id) onLoseAudio();
  };
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
