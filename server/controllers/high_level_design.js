

import {training_flowchart, generate_code} from '../utils/ai_model.js'


const clean_code = (mermaidString) => {
        return  mermaidString
        .replace(/^```mermaid\s*/, '')
        .replace(/\s*```$/, '');  
}
const HighlevelDesign = async(req, res) => {
    const prompt = req.body;
    const response = await generate_code(prompt);

    const final_response = clean_code(response);

    console.log(final_response);
    return res.status(200).json({final_response});
}

const train = async(req, res) => {
    const response = await training_flowchart();
    return res.status(200).json({response});
}
export {HighlevelDesign, train}