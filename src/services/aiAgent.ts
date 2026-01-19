/**
 * Bunny AI Agent Service
 * This service handles the agentic loop and tool calls directly in the frontend.
 * It routes requests through /api/chat (Vercel proxy) to avoid CORS issues.
 */

// Tool 1: Web Search
async function webSearch(query: string) {
    console.log(`[Agent] Decided to call tool: 'web_search' with query: "${query}"`);
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                path: '/search/',
                keywords: [query],
                max_results: 3
            })
        });
        if (!response.ok) throw new Error(`Search failed: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        return { error: (error as Error).message };
    }
}

// Tool 2: Read Page
async function readPage(url: string) {
    console.log(`[Agent] Decided to call tool: 'read_page' with url: "${url}"`);
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to read page: ${response.statusText}`);
        const html = await response.text();

        const doc = new DOMParser().parseFromString(html, 'text/html');
        doc.querySelectorAll('script, style').forEach(el => el.remove());
        const text = doc.body.textContent || "";
        return text.trim().substring(0, 4000);
    } catch (error) {
        return `Error reading page: ${(error as Error).message}`;
    }
}

// Tools Definition
const tools = [
    {
        "type": "function",
        "function": {
            "name": "web_search",
            "description": "Search the web for information.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": { "type": "string", "description": "The query string to search for." }
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "read_page",
            "description": "Read the content of a web page.",
            "parameters": {
                "type": "object",
                "properties": {
                    "url": { "type": "string", "description": "The URL of the page to read." }
                },
                "required": ["url"]
            }
        }
    }
];

export async function runAgent(userMessage: string, onUpdate?: (msg: string) => void) {
    const messages: any[] = [
        { role: 'user', content: userMessage }
    ];

    // Agent Loop (Up to 10 turns)
    for (let turn = 0; turn < 10; turn++) {
        console.log(`--- Agent Turn ${turn} ---`);

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                path: '/chat/completions',
                model: "gpt-5",
                messages: messages,
                tools: tools,
                tool_choice: "auto"
            })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({ detail: response.statusText }));
            throw new Error(errData.detail || `AI call failed: ${response.statusText}`);
        }

        const data = await response.json();
        const assistantMsg = data.choices[0].message;
        messages.push(assistantMsg);

        if (assistantMsg.tool_calls && assistantMsg.tool_calls.length > 0) {
            for (const toolCall of assistantMsg.tool_calls) {
                const args = JSON.parse(toolCall.function.arguments);
                let toolResult = "";

                if (toolCall.function.name === 'web_search') {
                    if (onUpdate) onUpdate(`🐰 Searching for: ${args.query}...`);
                    const result = await webSearch(args.query);
                    toolResult = JSON.stringify(result);
                } else if (toolCall.function.name === 'read_page') {
                    if (onUpdate) onUpdate(`🐰 Visiting: ${args.url}...`);
                    toolResult = await readPage(args.url);
                }

                messages.push({
                    role: 'tool',
                    tool_call_id: toolCall.id,
                    content: toolResult
                });
            }
        } else {
            // No tool calls means we have a final answer!
            return assistantMsg.content;
        }
    }

    return "Max turns reached without a final answer. 🐰💦";
}
