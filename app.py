from flask import Flask, request, jsonify, Response
import os
import requests
from dotenv import load_dotenv
from google import genai

load_dotenv()

app = Flask(__name__)

client = genai.Client(api_key=os.getenv('GEMINI_API_KEY'))



def generate(text_data):
    
    print(text_data)
    
    api_url = "http://localhost:8080/svg"
    print(api_url)
    response = requests.post(api_url, data=text_data, headers={"Content-Type": "text/plain"}, stream=True)

    
    print("Status Code:", response.status_code)
    print("Response Headers:", response.headers)
    print("Response Content (first 500 chars):", response.text[:500])
    
    # return response.content
    if response.status_code == 200:
        return response.content, response.headers.get('Content-Type', 'image/svg+xml')
    else: 
        return None, None

@app.route('/generate_hld', methods=['POST'])
def generate_hld():


    data = request.json
    web_app = data["prompt"]
    prompt = f"""
    Use from technology point of View
    Generate a high-level design (HLD) in brief for a {web_app} system. The system should include an overview of the architecture, key components, data flow, and interactions. Consider the following aspects:"
    System Overview: Describe the purpose and functionality of the system.
    Architecture: Define the architecture (Monolithic, Microservices, Serverless, etc.).
    Key Components: Identify the main modules/services and their responsibilities.
    Technology Stack: Suggest technologies (backend, frontend, database, cloud services).
    Data Flow: Explain how data moves within the system.
    API Design: Outline key APIs and their usage.
    Scalability & Security: Address scalability considerations and security best practices.
    Deployment Strategy: Describe the deployment model (cloud, on-premises, hybrid).
    Ensure that the HLD is well-structured, concise, and provides a clear technical blueprint for implementation.
    try to give syntax in wbs syntax:
   @startwbs
    * Business Process Modelling WBS
    ** Launch the project
    *** Complete Stakeholder Research
    *** Initial Implementation Plan
    ** Design phase
    *** Model of AsIs Processes Completed
    ****< Model of AsIs Processes Completed1
    ****> Model of AsIs Processes Completed2
    ***< Measure AsIs performance metrics
    ***< Identify Quick Wins
    @endwbs

    This is the sample syntax for wbs generation of code.
    No need to add any extra texts only the code is enough
    """
    
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents = prompt,
    #     config={
    #     'response_mime_type': 'application/json',
    # },
    )
    
    image_data, content_type = generate(response.text)
    
    # Right after calling `response = requests.post(...)`



    if image_data:
        return Response(image_data, content_type=content_type)
    else:
        return jsonify({"error": "Failed to fetch image"}), 500

    # return response.text


@app.route('/generate_workflow', methods = ['POST'])
def generate_workflow():


    data = request.json
    web_app = data["prompt"]
    prompt = f"""
    Provide a brief yet comprehensive workflow for a {web_app}. 
    Outline the key steps, user interactions, and system processes involved.
    Highlight the roles of different users, major decision points, and data flow. 
    Keep the explanation concise while ensuring clarity on how the system functions from start to finish.
    try to give syntax in block diagram syntax:
    @startuml
    map CapitalCity {{
    UK => London
    USA => Washington
    Germany => Berlin
    }}
    @enduml
    This is the sample syntax for block diagram generation of code.
    No need to add any extra texts only the code is enough
    """
    
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents = prompt,
    #     config={
    #     'response_mime_type': 'application/json',
    # },
    )
    
    return response.text
    print("Just before calling the function")
    image_data, content_type = generate(response.text)
    
    # Right after calling `response = requests.post(...)`



    if image_data:
        return Response(image_data, content_type=content_type)
    else:
        return jsonify({"error": "Failed to fetch image"}), 500
    
    # return image_data



@app.route('/generate_lld', methods = ['POST'])
def generate_lld():

    data = request.json
    web_app = data["prompt"]
    prompt = f"""

    Generate a Low-Level Design (LLD) in brief for a  {web_app} system. The design should include detailed class diagrams, database schema, API specifications, and component interactions. Consider the following aspects:"

    Use syntax in Json Diagram syntax:
    @startjson  
    {{
    "fruit":"Apple",
   "size":"Large",
   "color": ["Red", "Green"]
    }}
    @endjson

    This is the sample syntax for Json diagram generation of code.
    No need to add any extra texts only the code is enough
    """

    print(prompt)
    
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents = prompt,
        config={
        'response_mime_type': 'application/json',
    },
    )
    
    

    return response.text


if __name__ == '__main__':
    app.run(debug=True)









