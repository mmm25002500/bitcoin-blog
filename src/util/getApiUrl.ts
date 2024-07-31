// utils/getApiUrl.ts
import { IncomingMessage } from 'http';

export function getApiUrl(req?: IncomingMessage) {
  if (req) {
    const host = req.headers.host || 'localhost:3000';
    const protocol = /^localhost(:\d+)?$/.test(host) ? 'http' : 'https';
    return `${protocol}://${host}`;
  }
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
}
