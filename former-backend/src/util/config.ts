const withCompatSsl = (url: string) => {
    if (!url) return url;
    const parsed = new URL(url);
    parsed.searchParams.set('uselibpqcompat', 'true');
    parsed.searchParams.set('sslmode', 'require');
    return parsed.toString();
};

export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = withCompatSsl(process.env.DATABASE_URL || '');
export const JWT_SECRET = process.env.JWT_SECRET || '';
export const FRONTEND_URL = process.env.FRONTEND_URL || '';
