import { GoogleGenerativeAI } from "@google/generative-ai";
const genai = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);
const model = genai.getGenerativeModel({ model: "gemini-2.0-flash"
});

const training_flowchart = async(req, res) => {
    console.log("Training flowchart");
    const fullPrompt = `This is for your training data first you have to train yourself according  to the syntax and work
    First I am sharing some of the syntax
    syntax 1 : 
    flowchart TD
        A[Start] --> B{Is it?}
        B -->|Yes| C[OK]
        C --> D[Rethink]
        D --> B
        B ---->|No| E[End]


    syntax 2 : 
    flowchart TD
        A[Start] --> B{Is it?}
        B -- Yes --> C[OK]
        C --> D[Rethink]
        D --> B
        B -- No ----> E[End]



    I am giving a url also first train yoursel according to that url
    here is the url : https://mermaid.js.org/syntax/flowchart.html
    // after training you can use the syntax whenever someone called in flowchart diagram.
    // 
    ✅ Removed colons (:) inside node brackets: Mermaid.js treats colons as syntax delimiters, so wrapping the entire text inside double quotes ("...") ensures it's treated as plain text.
    ✅ Kept proper node formatting ([] for process, {} for decisions): But avoided {} in this flow as no decision nodes were needed.
    ✅ Ensured correct indentation and spacing: Mermaid.js is sensitive to formatting.
    Removed multi-line text in {} decision nodes

    "Request Type?" → "Request Type"
    "Retrieve Data from Data Source (e.g., Database, API)" → "Retrieve Data from Data Source"
    Mermaid does not support multi-line text in decision nodes {}.
    Ensured all arrows (-->) are correctly formatted

    Used proper edge labels instead of -- Multi-line Text -->.
    Ensured all nodes are explicitly linked

    Fixed missing flow for error responses (J → L, K → L).
    
    this is the error i faced
    It's a strict instruction please train yourself properly as there is not scope or error in the syntax`

    const rprompt = "are you ready to code in that syntax of flowchart diagram which is given in the url?";
   

    const result = await model.generateContent(fullPrompt);
    console.log(result.response.text());

    return result.response.text();
    
}

const generate_code = async(prompt, req, res) => {
    console.log("Promp from generate code", prompt);
    const fullPrompt = `Please generate a detailed high level design for ${prompt}
    in flowchart syntax
    Only generate code in flowchart syntax no need of any extra texts. please make sure not to give any syntax error `
    const result = await model.generateContent(fullPrompt);
    return result.response.text();
}

export {training_flowchart, generate_code};