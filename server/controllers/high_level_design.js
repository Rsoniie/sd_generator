

import generate_code from '../utils/ai_model.js'
const HighlevelDesign = async(req, res) => {
    const prompt = req.body;

    const response = await generate_code(prompt);

    // console.log(response);

    return res.status(200).json({response});


}

export {HighlevelDesign}