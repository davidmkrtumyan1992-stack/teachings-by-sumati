/**
 * Converts any YouTube URL form (youtu.be short link or youtube.com/watch)
 * into an embeddable URL, stripping tracking params. Returns null if the
 * input isn't a recognizable YouTube URL so callers can render a fallback
 * instead of an embed that YouTube will refuse to load.
 */
export function toEmbedUrl(url: string | null | undefined, lang?: "en" | "ru"): string | null {
  if (!url) return null;
  let id: string | null = null;

  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) id = shortMatch[1];

  if (!id) {
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) id = watchMatch[1];
  }

  if (!id) return null;

  const embedUrl = `https://www.youtube.com/embed/${id}`;
  return lang ? `${embedUrl}?hl=${lang}` : embedUrl;
}
