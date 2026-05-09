"use server"

export async function checkSystemConnectivity() {
    const targets = [
        { name: "Authentication Service", url: "https://clerk.com" },
        { name: "AI Service", url: "https://generativelanguage.googleapis.com" },
        { name: "Database Service", url: "https://neon.tech" },
    ];

    const results = await Promise.all(targets.map(async (target) => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            const start = Date.now();

            await fetch(target.url, {
                method: 'HEAD',
                mode: 'no-cors',
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            return {
                name: target.name,
                status: "Connected",
                latency: `${Date.now() - start}ms`
            };
        } catch (error) {
            return {
                name: target.name,
                status: "Failed",
                error: error.name === "AbortError" ? "Timeout" : "Unreachable"
            };
        }
    }));

    return results;
}
