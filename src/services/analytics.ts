import axios from 'axios';

/**
 * Data sent for analytics event.
 */
export interface AnalyticsData {
  userId?: string | number;
  country?: string;
  page: string;
  referrer?: string;
  userAgent?: string;
}

/**
 * Geo info response from ipapi.co
 */
export interface GeoInfo {
  country_name?: string;
}

/**
 * Fetch geo info (country) from ipapi.co
 * @returns {Promise<GeoInfo>}
 */
export async function getGeoInfo(): Promise<GeoInfo> {
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (!res.ok) throw new Error('Failed to fetch geo info');
    return await res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Geo info fetch failed', e);
    return { country_name: undefined };
  }
}

/**
 * Send analytics event to backend
 * @param analyticsData Analytics event data
 */
export async function recordAnalytics({ userId, country, page, referrer, userAgent }: AnalyticsData): Promise<void> {
  try {
    await axios.post('/api/analytics', {
      userId,
      country,
      page,
      referrer,
      userAgent,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to record analytics:', e);
  }
}
