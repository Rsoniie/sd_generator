const input_prompt = document.getElementById("prompt");
const submit_btn = document.getElementById("submit");

const area = document.querySelector(".mermaid")
area.style.display = "none";

console.log("Hello from script.js");
submit_btn.addEventListener("click", async (event) => {
  event.preventDefault();
  const userPrompt = input_prompt.value.trim();
  console.log(userPrompt);
  if (!userPrompt) {
    alert("Please enter something!");
    return;
  }
  const apiUrl = "http://localhost:5000/system_design/api/hld";
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: userPrompt }),
  });
  const data = await response.json();
  console.log(data.final_response);

  area.innerHTML = data.final_response;

  area.style.display = "block";
});
