

# from flask import Flask, request, jsonify
# import google.generativeai as genai
# from dotenv import load_dotenv
# import os
# import json

# # Load environment variables from .env file
# load_dotenv()

# app = Flask(__name__)

# # Configure Gemini API key
# genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

# # def extract_diagram(diagram_response):
# #     # Simulate extracting the diagram part only
# #     diagram_start = diagram_response.find('blockdiag {')
# #     diagram_end = diagram_response.rfind('}') + 1
# #     return diagram_response[diagram_start:diagram_end]

# def process_diagram(data):
#     diagram_response = data.get('response', '')
#     try:
#         clean_diagram = diagram_response.encode('utf-8').decode('unicode_escape')
#         if clean_diagram.startswith('"') and clean_diagram.endswith('"'):
#             clean_diagram = clean_diagram[1:-1]

#         return clean_diagram
#     except Exception as e:
#         return str(e), 500

# @app.route('/generate_hld', methods=['POST'])
# def generate_content():
#     base_message = """Please make a detailed high-level design for the following system:
    
#     {prompt}

#     Convert this into blockdiag syntax suitable for Kroki. Below is a sample syntax for reference:

#     blockdiag {{
#       Kroki -> generates -> "Block diagrams";
#       Kroki -> is -> "very easy!";

#       Kroki [color = "greenyellow"];
#       "Block diagrams" [color = "pink"];
#       "very easy!" [color = "orange"];
#     }}

#     I want only syntax for the blockdiag diagram. You can ignore the text above the blockdiag syntax.
#     """
#     data = request.get_json()
#     prompt = data.get('prompt', '')

#     if not prompt:
#         return jsonify({"error": "Prompt is required"}), 400
#     formatted_prompt = base_message.format(prompt=prompt)
    
#     try:
#         model = genai.GenerativeModel("gemini-2.0-flash")
#         response = model.generate_content(formatted_prompt)
#         diagram_text = extract_diagram(response.text)
#         diagram_text = json.dumps(diagram_text, indent=4)

#         return jsonify({"response": diagram_text})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)






from flask import Flask, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Configure Gemini API key
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

def process_diagram(diagram_response):
    # Decode escape characters in the string
    clean_diagram = diagram_response.encode('utf-8').decode('unicode_escape')
    # Remove surrounding quotes if they exist
    if clean_diagram.startswith('"') and clean_diagram.endswith('"'):
        clean_diagram = clean_diagram[1:-1]
    return clean_diagram

@app.route('/generate_hld', methods=['POST'])
def generate_content():
    # base_message = """Please make a detailed high-level design for the following system:
    
    # {prompt}

    # Convert this into blockdiag syntax suitable for Kroki. Below is a sample syntax for reference:

    # blockdiag {{
    #   Kroki -> generates -> "Block diagrams";
    #   Kroki -> is -> "very easy!";

    #   Kroki [color = "greenyellow"];
    #   "Block diagrams" [color = "pink"];
    #   "very easy!" [color = "orange"];
    # }}

    # I want only syntax for the blockdiag diagram. You can ignore the text above the blockdiag syntax.
    # no need any extra modifications I want that this sample runs correctly on kroki also try to make it error free and brief
    # """

    base_message = """
    Please make a detailed high-level design for the following system:

    {prompt}

    Convert this into blockdiag syntax suitable for Kroki. Below is a sample syntax for reference. Ensure the syntax is correctly formatted and follows the example closely to avoid errors:

    blockdiag {{
        // Basic settings
        default_fontsize = 12;   // Set the default font size for text
        default_node_color = "greenyellow";  // Default color for all nodes

        // Define nodes
        Kroki [shape = "box", label = "Kroki"];
        Diagrams [shape = "box", label = "Block diagrams"];
        Easy [shape = "ellipse", label = "very easy!"];

        // Define connections
        Kroki -> Diagrams [label = "generates"];
        Kroki -> Easy [label = "is"];

        // Apply colors
        Kroki [color = "greenyellow"];
        Diagrams [color = "pink"];
        Easy [color = "orange"];
    }}

    Remember, do not add or modify anything below the 'Convert this into blockdiag syntax' line except your specific system details as per the template shown.
    """

    data = request.get_json()
    prompt = data.get('prompt', '')

    if not prompt:
        return "Error: Prompt is required", 400
    formatted_prompt = base_message.format(prompt=prompt)
    
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(formatted_prompt)
        diagram_text = process_diagram(response.text)
        return diagram_text
    except Exception as e:
        return "Error: " + str(e), 500

if __name__ == '__main__':
    app.run(debug=True)

