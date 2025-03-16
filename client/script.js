import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: false, securityLevel: 'loose' });

const input_prompt = document.getElementById("prompt");
const submit_btn = document.getElementById("submit");
const area = document.querySelector(".mermaid");
const hld_btn = document.querySelector("#submit");

area.style.display = "none";

 submit_btn.addEventListener("click", async (event) => {

  event.preventDefault();
  const userPrompt = input_prompt.value.trim();
  console.log("This is the prompt", userPrompt)
  if (!userPrompt) {
    alert("Please enter something!");
    return;
  }
  
  const apiUrl = "http://localhost:5000/system_design/api/hld";
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: userPrompt }),
  });
  const data = await response.json();
  area.innerHTML = data.final_response;
  mermaid.init('.mermaid');
  area.style.display = "block";

});