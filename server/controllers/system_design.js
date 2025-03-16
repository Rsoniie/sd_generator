import {training_flowchart, design_flow_code, system_design_code} from '../utils/ai_model.js'

const clean_code = (mermaidString) => {
        return  mermaidString
        .replace(/^```mermaid\s*/, '')
        .replace(/\s*```$/, '')
        .replace(/^```\s*/, '');  
}
const DesignFlow = async(req, res) => {
    const prompt = req.body;
    const response = await design_flow_code(prompt);
    // console.log(response)
    const final_response = clean_code(response);

    // console.log(final_response);
    return res.status(200).json({final_response});
}

const train = async(req, res) => {
    const response = await training_flowchart();
    return res.status(200).json({response});
}

const SystemDesign = async(req, res) => {
    const prompt = req.body;
    const response = await system_design_code(prompt);
    // console.log(response)
    const final_response = clean_code(response);

    // console.log(final_response);
    return res.status(200).json({final_response});
}
export {DesignFlow, train, SystemDesign}