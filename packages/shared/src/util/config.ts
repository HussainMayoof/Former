const withCompatSsl = (url: string) => {
    if (!url) return url;
    const parsed = new URL(url);
    parsed.searchParams.set('uselibpqcompat', 'true');
    parsed.searchParams.set('sslmode', 'require');
    return parsed.toString();
};


export const DATABASE_URL = process.env.NODE_ENV === 'production' ? withCompatSsl(process.env.DATABASE_URL || '') : process.env.DATABASE_URL || '';