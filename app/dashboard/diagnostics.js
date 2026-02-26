"use server"

export async function checkSystemConnectivity() {
    const targets = [
        { name: "Clerk Auth", url: "https://sharp-satyr-98.clerk.accounts.dev" },
        { name: "Neon Database (HTTP)", url: "https://ep-sparkling-lake-ai55f0u0.c-4.us-east-1.aws.neon.tech" },
        { name: "Gemini AI", url: "https://generativelanguage.googleapis.com" }
    ];

    const results = await Promise.all(targets.map(async (target) => {
        try {
            const start = Date.now();
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

            const response = await fetch(target.url, { 
                method: 'HEAD', 
                mode: 'no-cors',
                signal: controller.signal 
            });
            
            clearTimeout(timeoutId);
            return {
                name: target.name,
                host: new URL(target.url).hostname,
                status: "Connected",
                latency: `${Date.now() - start}ms`
            };
        } catch (error) {
            return {
                name: target.name,
                host: new URL(target.url).hostname,
                status: "Failed",
                error: error.name === "AbortError" ? "Timeout (DNS/Network Block)" : error.message
            };
        }
    }));

    return results;
}
