let observer = null;

function applyMaskNow() {
  const input = document.querySelector('[contenteditable="true"]');
  if (!input) return;

  input.style.webkitTextSecurity = "disc";
  input.style.textSecurity = "disc";
}

function removeMaskNow() {
  const input = document.querySelector('[contenteditable="true"]');
  if (!input) return;

  input.style.webkitTextSecurity = "";
  input.style.textSecurity = "";
}

function startMasking() {
  stopMasking();

  // APPLY IMMEDIATELY (fixes delay)
  applyMaskNow();

  observer = new MutationObserver(() => {
    applyMaskNow();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function stopMasking() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }

  // REMOVE IMMEDIATELY
  removeMaskNow();
}

// default = hidden
chrome.storage.sync.get("maskInput", (data) => {
  const state = data.maskInput !== undefined ? data.maskInput : true;
  chrome.storage.sync.set({ maskInput: state });

  state ? startMasking() : stopMasking();
});

chrome.storage.onChanged.addListener((changes) => {
  if (!changes.maskInput) return;

  changes.maskInput.newValue ? startMasking() : stopMasking();
});
