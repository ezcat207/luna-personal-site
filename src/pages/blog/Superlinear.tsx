import { Link } from 'react-router-dom';

const Superlinear = () => {
    return (
        <article className="max-w-4xl mx-auto pt-12 pb-20">
            <Link to="/blog" className="inline-block mb-8 text-pencil hover:text-ink font-handwritten">&larr; Back to Journal</Link>

            <div className="paper-sheet relative overflow-hidden">
                <div className="tape -top-4 left-1/2 -translate-x-1/2 w-40 rotate-1"></div>

                {/* Header */}
                <div className="text-center mb-12 border-b-2 border-dashed border-gray-300 pb-8">
                    <h1 className="font-header text-4xl md:text-6xl text-ink mb-4">The Superlinear Path 🚀</h1>
                    <p className="font-handwritten text-xl text-pencil">From Zero to Builder: A Technical Deep Dive</p>
                    <div className="mt-4 inline-block bg-yellow-100 px-3 py-1 text-sm font-mono rotate-[-2deg] shadow-sm">
                        Update: 2026-01-18
                    </div>
                </div>

                <div className="space-y-12 font-serif text-lg leading-relaxed text-gray-800">

                    {/* Intro */}
                    <div className="prose prose-lg max-w-none">
                        <p>
                            Imagine a restaurant. But not just any restaurant—a <b>code restaurant</b>.
                            This is the story of how I learned to build APIs with FastAPI, understanding the "Strict Waiter" and the "Holographic Menu".
                        </p>
                    </div>

                    {/* Concept 1 & 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-blue-50 p-6 rounded-lg rotate-1 shadow-lifted border border-blue-100">
                            <h3 className="font-header text-2xl text-blue-800 mb-2">Concept 1: The API Endpoint</h3>
                            <p className="font-bold text-blue-600 mb-2">(The Strict Waiter)</p>
                            <p className="font-handwritten text-lg">
                                Imagine you go to a restaurant and the waiter (FastAPI) asks for your order.
                                If you forget something important, the waiter says "No!" instantly.
                            </p>
                        </div>

                        <div className="bg-purple-50 p-6 rounded-lg rotate-[-1deg] shadow-lifted border border-purple-100">
                            <h3 className="font-header text-2xl text-purple-800 mb-2">Concept 2: Swagger UI</h3>
                            <p className="font-bold text-purple-600 mb-2">(The Holographic Menu)</p>
                            <p className="font-handwritten text-lg">
                                The UI is the screen—a working partner. FastAPI writes a "rulebook" (menu) automatically.
                                It's like a holographic menu you can touch!
                            </p>
                        </div>
                    </div>

                    {/* Code Snippet 1 */}
                    <div className="relative">
                        <div className="tape -top-3 right-10 w-24 bg-gray-200/50 rotate-2"></div>
                        <div className="bg-gray-900 text-gray-100 p-6 rounded-xl shadow-2xl font-mono text-sm overflow-x-auto border-4 border-gray-800">
                            <div className="flex gap-2 mb-4 border-b border-gray-700 pb-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="ml-2 text-gray-400 text-xs">restaurant_manager.py</span>
                            </div>
                            <pre>{`from fastapi import FastAPI

# 1. THE RESTAURANT MANAGER (The Server Framework)
# This creates the "Head Waiter" that manages orders (requests).
# It also builds the "Holographic Menu" at /docs.
app = FastAPI()

# 2. THE MENU ITEM (The Endpoint)
# @app.get tells the waiter: "When a customer asks for THIS..."
@app.get("/{input_text}")
def read_root(input_text: str):
    # 3. THE STRICT WAITER (Type Validation)
    # The ": str" checks the order card. 
    # If it's not text, the waiter sends it back!
    
    # 4. THE CHEF'S KITCHEN (The Logic)
    # Creating the "Hello, World" dish.
    return {"message": f"Hello, World {input_text}"}
    
    # 5. THE PLATTER (JSON Response)
    # Waiter brings food on a standard tray (JSON).`}</pre>
                        </div>
                    </div>

                    {/* Zero2Builder Section */}
                    <div className="my-12">
                        <h2 className="font-header text-3xl text-center mb-8 underline decoration-wavy decoration-orange-400">Zero2Builder</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* CER Method */}
                            <div className="bg-orange-50 p-6 rounded-lg rotate-1 shadow-lifted border border-orange-100 relative">
                                <div className="tape -top-3 left-1/2 -translate-x-1/2 w-24 bg-orange-200/50 h-6 absolute rotate-[-2deg]"></div>
                                <h3 className="font-bold text-xl text-orange-800 mb-4">The CER Method</h3>
                                <p className="font-handwritten text-lg mb-4">
                                    How to debug and build with strict rules:
                                </p>
                                <ul className="space-y-3 font-mono text-sm text-gray-700">
                                    <li className="flex items-start">
                                        <span className="font-bold text-orange-600 mr-2">C</span>
                                        <span>Context: What was executed?</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-orange-600 mr-2">E</span>
                                        <span>Error: The complete error message.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-orange-600 mr-2">R</span>
                                        <span>Request: Ask AI to fix / explain.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* 3C Builder Card */}
                            <div className="bg-green-50 p-6 rounded-lg rotate-[-1deg] shadow-lifted border border-green-100 relative">
                                <div className="tape -top-3 right-10 w-24 bg-green-200/50 h-6 absolute rotate-2"></div>
                                <h3 className="font-bold text-xl text-green-800 mb-4">The 3C Builder Card</h3>
                                <p className="font-handwritten text-lg mb-4">
                                    The blueprint for any project:
                                </p>
                                <ul className="space-y-3 font-mono text-sm text-gray-700">
                                    <li className="flex items-start">
                                        <span className="font-bold text-green-600 mr-2">1.</span>
                                        <span>Context: Goals and Priorities.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-green-600 mr-2">2.</span>
                                        <span>Components: Step-by-step parts.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-green-600 mr-2">3.</span>
                                        <span>Critical Rules: Constraints & limits.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Agentic Tools */}
                    <div className="my-12">
                        <h2 className="font-header text-3xl text-center mb-8 underline decoration-wavy decoration-pink-400">Integrating Core Intelligence</h2>

                        <div className="bg-pink-50 p-8 rounded-xl border-2 border-dashed border-pink-200 relative">
                            <div className="absolute -top-5 -left-5 bg-white p-3 rounded-full shadow-md rotate-[-10deg]">
                                <span className="text-4xl">🤖</span>
                            </div>

                            <h3 className="text-xl font-bold text-pink-800 mb-4 ml-8">The "React Cafe" Workflow</h3>
                            <ul className="list-disc pl-6 space-y-4 font-medium text-gray-700">
                                <li>
                                    <span className="text-pink-600 font-bold">Ingredients:</span> Constants and data. Just buying them isn't enough!
                                </li>
                                <li>
                                    <span className="text-pink-600 font-bold">Recipe:</span> The exact steps (like MapExplorer.tsx).
                                </li>
                                <li>
                                    <span className="text-pink-600 font-bold">Cook:</span> Execution loop where the Agent (Chef) uses tools.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Full Stack Code Snippet */}
                    <div className="relative">
                        <div className="tape -top-3 left-10 w-24 bg-gray-200/50 rotate-[-2deg]"></div>
                        <div className="bg-gray-900 text-gray-100 p-6 rounded-xl shadow-2xl font-mono text-sm overflow-x-auto border-4 border-gray-800">
                            <div className="flex gap-2 mb-4 border-b border-gray-700 pb-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="ml-2 text-gray-400 text-xs">full_stack_agent.py</span>
                            </div>
                            <pre>{`# --- 3. TOOLS FOR THE AI ---
# Giving the superhero gadgets!

# Tool 1: Web Search
def web_search(query: str):
    # Uses httpx (code browser) to search the web
    # ... implementation ...

# Tool 2: Read Page
def read_page(url: str):
    # Visits a website and extracts text (BeautifulSoup)
    # Like a messy eater cleaning up the plate!
    # ... implementation ...

# --- THE AGENT LOOP ---
# The thinking process (up to 10 turns)
for turn in range(10):
    # Ask the AI (client) for a response
    response = client.chat.completions.create(
        model="gpt-5",
        messages=messages,
        tools=tools,
        tool_choice="auto"
    )
    
    # Did the AI decide to use a tool?
    if message.tool_calls:
        # Execute tool and feed result back...
    else:
        # Final Answer found!
        return {"content": message.content}`}</pre>
                        </div>
                    </div>

                    {/* Plan B / Footer */}
                    <div className="mt-16 p-6 bg-yellow-50 border-t-4 border-yellow-200 rotate-1 shadow-sm">
                        <h3 className="font-header text-xl text-yellow-800 mb-2">Plan B: Phase 1</h3>
                        <p className="font-handwritten text-gray-600">
                            "You give AI the information (ingredients) and it does the steps (menu) to making what you want."
                        </p>
                        <div className="mt-4 text-xs font-mono text-gray-400 text-right">
                            Ref: Superlinear Academy / Zero2Builder
                        </div>
                    </div>

                </div>
            </div>
        </article>
    );
};

export default Superlinear;
