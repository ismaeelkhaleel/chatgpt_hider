const button = document.getElementById("toggle");

function render(state) {
  button.textContent = state ? "Prompt Show" : "Prompt Hide";
}

chrome.storage.sync.get("maskInput", (data) => {
  render(data.maskInput !== undefined ? data.maskInput : true);
});

button.addEventListener("click", () => {
  chrome.storage.sync.get("maskInput", (data) => {
    const current = data.maskInput !== undefined ? data.maskInput : true;
    const next = !current;

    chrome.storage.sync.set({ maskInput: next });
    render(next);
  });
});
