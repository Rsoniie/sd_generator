import { GoogleGenerativeAI } from "@google/generative-ai";
const genai = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);
const model = genai.getGenerativeModel({ model: "gemini-2.0-flash" });

const training_flowchart = async (req, res) => {
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
    // after training you can use the syntax whenever someone called design flow diagram.
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
    It's a strict instruction please train yourself properly as there is not scope or error in the syntax
    No need to write random text in between that creates error no need to give end statement no need to give styling feature to this take your time and train yourself properly`;

  const rprompt =
    "are you ready to code in that syntax of flowchart diagram which is given in the url?";

  const result = await model.generateContent(fullPrompt);
  console.log(result.response.text());

  return result.response.text();
};

// const design_flow_code = async (prompt, req, res) => {
//   // console.log("Promp from generate code", prompt);
//   const fullPrompt = `Generate a detailed user design flow for "${prompt}" using **Mermaid flowchart** syntax. 

//   ### ⚠ STRICT INSTRUCTIONS:
//   1. **ONLY** use the graph TD syntax shown below.  
//   2. **DO NOT** add any extra text, explanations, or end statements.  
//   3. **AVOID** any syntax errors (no <, unclosed brackets, etc.).  
//   4. **Directly output** the flowchart code starting with graph TD.  
//   5. **Cover multiple services and processes** relevant to "${prompt}" in the same style as the example.  
//   6. **DO NOT** add headings, bullet points, or any commentary – **only** the code block.
  
//   ### 📌 EXAMPLE STRUCTURE (KEEP THIS EXACT FORMAT):
//   graphTD
//   %% Service A branch
// E -- Type A --> F[Service A: Process request];
// F --> G[Service A: Access data store];
// G --> H{Data found?};
// H -- Yes --> I[Service A: Transform data];
// H -- No --> J[Service A: Return 'not found' response];
// I --> K[Service A: Format response];
// K --> L[Service A: Return response];

// %% Service B branch
// E -- Type B --> M[Service B: Process request];
// M --> N[Service B: Validate input];
// N --> O{Input valid?};
// O -- Yes --> P[Service B: Perform complex operation];
// O -- No --> Q[Service B: Return validation error];
// P --> R[Service B: Update data store];
// R --> S[Service B: Generate confirmation message];
// S --> T[Service B: Format response];
// T --> U[Service B: Return response];


// `
//   const result = await model.generateContent(fullPrompt);
//   return result.response.text();
// };



// 2. DESIGN FLOW DIAGRAM PROMPT
const design_flow_code = async (prompt, req, res) => {
  const fullPrompt = `Generate a detailed user design flow for "${prompt}" using Mermaid flowchart syntax.

1. ONLY use "graph TD".
2. DO NOT add any extra text, explanations, or end statements.
3. AVOID syntax errors (no <, no unclosed brackets).
4. Output must start with "graph TD".
5. Cover multiple services and processes relevant to "${prompt}" in the style shown.
6. DO NOT add headings, bullets, or commentary—ONLY the code block.

Example Structure (do NOT alter arrows or brackets, just rename or add nodes as needed):
graph TD
    %% Service A branch
    E -- Type A --> F[Service A: Process request];
    F --> G[Service A: Access data store];
    G --> H{Data found?};
    H -- Yes --> I[Service A: Transform data];
    H -- No --> J[Service A: Return 'not found' response];
    I --> K[Service A: Format response];
    K --> L[Service A: Return response];

    %% Service B branch
    E -- Type B --> M[Service B: Process request];
    M --> N[Service B: Validate input];
    N --> O{Input valid?};
    O -- Yes --> P[Service B: Perform complex operation];
    O -- No --> Q[Service B: Return validation error];
    P --> R[Service B: Update data store];
    R --> S[Service B: Generate confirmation message];
    S --> T[Service B: Format response];
    T --> U[Service B: Return response];`;

  const result = await model.generateContent(fullPrompt);
  return result.response.text();
};



// const system_design_code = async (prompt, req, res) => {
//     // console.log("Promp from generate code", prompt);
//     const fullPrompt = `Generate a detailed system design for "${prompt}" using **Mermaid flowchart** syntax. 
  
//     ### ⚠ STRICT INSTRUCTIONS:
//     1. **ONLY** use the graph TD syntax shown below.  
//     2. **DO NOT** add any extra text, explanations, or end statements.  
//     3. **AVOID** any syntax errors (no <, unclosed brackets, etc.).  
//     4. **Directly output** the flowchart code starting with graph TD.  
//     5. **Cover multiple services and processes** relevant to "${prompt}" in the same style as the example.  
//     6. **DO NOT** add headings, bullet points, or any commentary – **only** the code block.
    
//     ### 📌 EXAMPLE STRUCTURE (KEEP THIS EXACT FORMAT):
//     graphTD
//   %% Service A branch
// E -- Type A --> F[Service A: Process request];
// F --> G[Service A: Access data store];
// G --> H{Data found?};
// H -- Yes --> I[Service A: Transform data];
// H -- No --> J[Service A: Return 'not found' response];
// I --> K[Service A: Format response];
// K --> L[Service A: Return response];

// %% Service B branch
// E -- Type B --> M[Service B: Process request];
// M --> N[Service B: Validate input];
// N --> O{Input valid?};
// O -- Yes --> P[Service B: Perform complex operation];
// O -- No --> Q[Service B: Return validation error];
// P --> R[Service B: Update data store];
// R --> S[Service B: Generate confirmation message];
// S --> T[Service B: Format response];
// T --> U[Service B: Return response];


// Please don't do any syntax error make it clear and crisp try to use sample for best result It's  a strict order.


//   `
//     const result = await model.generateContent(fullPrompt);
//     return result.response.text();
// };



// 3. SYSTEM DESIGN FLOWCHART PROMPT
const system_design_code = async (prompt, req, res) => {
  const fullPrompt = `Generate a detailed system design for "${prompt}" using Mermaid flowchart syntax.

1. ONLY use "graph TD".
2. DO NOT add any extra text, explanations, or end statements.
3. AVOID syntax errors (no <, no unclosed brackets).
4. Output must start with "graph TD".
5. Cover multiple services and processes relevant to "${prompt}" in the style shown.
6. DO NOT add headings, bullets, or commentary—ONLY the code.

Example Structure (unchanged arrows, rename or add nodes as needed):
graph TD
    %% Service A branch
    E -- Type A --> F[Service A: Process request];
    F --> G[Service A: Access data store];
    G --> H{Data found?};
    H -- Yes --> I[Service A: Transform data];
    H -- No --> J[Service A: Return 'not found' response];
    I --> K[Service A: Format response];
    K --> L[Service A: Return response];

    %% Service B branch
    E -- Type B --> M[Service B: Process request];
    M --> N[Service B: Validate input];
    N --> O{Input valid?};
    O -- Yes --> P[Service B: Perform complex operation];
    O -- No --> Q[Service B: Return validation error];
    P --> R[Service B: Update data store];
    R --> S[Service B: Generate confirmation message];
    S --> T[Service B: Format response];
    T --> U[Service B: Return response];

Please keep it crisp, clear, and error-free.`;

  const result = await model.generateContent(fullPrompt);
  return result.response.text();
};

export {
  training_flowchart,
  design_flow_code,
  system_design_code,
};
