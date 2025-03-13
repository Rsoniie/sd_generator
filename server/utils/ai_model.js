import { GoogleGenerativeAI } from "@google/generative-ai";
const genai = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);
const model = genai.getGenerativeModel({ model: "gemini-2.0-flash"
});

const generate_code = async(prompt, req, res) => {
    console.log("Promp from generate code", prompt);

            
    const fullPrompt = `
    Use from technology point of view.
    Generate a high-level design (HLD) in brief for a ${prompt} system. The system should include an overview of the architecture, key components, data flow, and interactions. Consider the following aspects:

    System Overview: Describe the purpose and functionality of the system.
    Architecture: Define the architecture (Monolithic, Microservices, Serverless, etc.).
    Key Components: Identify the main modules/services and their responsibilities.
    Technology Stack: Suggest technologies (backend, frontend, database, cloud services).
    Data Flow: Explain how data moves within the system.
    API Design: Outline key APIs and their usage.
    Scalability & Security: Address scalability considerations and security best practices.
    Deployment Strategy: Describe the deployment model (cloud, on-premises, hybrid).

    Ensure that the HLD is well-structured, concise, and provides a clear technical blueprint for implementation.

    Strictly order give in this format syntax in mindmap syntax:
    @startmindmap
    * Debian
    ** Ubuntu
    *** Linux Mint
    *** Kubuntu
    *** Lubuntu
    *** KDE Neon
    ** LMDE
    ** SolydXK
    ** SteamOS
    ** Raspbian with a very long name
    *** <s>Raspmbc</s> => OSMC
    *** <s>Raspyfi</s> => Volumio
    @endmindmap

    This is the sample syntax for wbs generation of code.
    No need to add any extra texts only the code is enough
    `;

    const result = await model.generateContent(fullPrompt);
    console.log(result.response.text());

    return result.response.text();
    
}

export default generate_code;