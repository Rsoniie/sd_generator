from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

app = Flask(__name__)


# print(os.getenv('GEMINI_API_KEY'))
client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))

@app.route('/generate_hld', methods=['POST'])
def generate_content():


    data = request.json
    web_app = data["prompt"]
    prompt = """
    Generate a high-level design (HLD) for a {web_app} system. The system should include an overview of the architecture, key components, data flow, and interactions. Consider the following aspects:"
    System Overview: Describe the purpose and functionality of the system.
    Architecture: Define the architecture (Monolithic, Microservices, Serverless, etc.).
    Key Components: Identify the main modules/services and their responsibilities.
    Technology Stack: Suggest technologies (backend, frontend, database, cloud services).
    Data Flow: Explain how data moves within the system.
    API Design: Outline key APIs and their usage.
    Scalability & Security: Address scalability considerations and security best practices.
    Deployment Strategy: Describe the deployment model (cloud, on-premises, hybrid).
    Ensure that the HLD is well-structured, concise, and provides a clear technical blueprint for implementation.
    Please give an Json response one for Json generated and one for the what and why to use this.
    Also try to give brief statements for each of the above points. try to give syntax in mindmap syntax
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
    This is the sample syntax for mindmap generation of code.
    """
    
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents = prompt,
        config={
        'response_mime_type': 'application/json',
    },
    )

    return response.text


@app.route('/generate', methods = ['POST'])
def generate():


    return jsonify({"message": "Get into generated block"})

if __name__ == '__main__':
    app.run(debug=True)









