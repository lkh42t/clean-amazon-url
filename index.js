function cleanURL(s) {
  try {
    const url = new URL(s);
    const p = url.pathname.replace(/\/gp\/(?:product|aw\/d)\//, "/dp/").split("/");
    const i = p.indexOf("dp") + 1;
    if (i <= 0) {
      return `${s} is not an Amazon product's URL.`;
    }
    return `${url.origin}/dp/${p[i]}`;
  } catch (e) {
    return e.message;
  }
}

const textFields = document.getElementsByClassName("mdc-text-field");
for (const textField of textFields) {
  mdc.textField.MDCTextField.attachTo(textField);
}

const urlInput = document.getElementById("url-input");
const cleanButton = document.getElementById("clean-button");
const cleanedURL = document.getElementById("cleaned-url");
const copyButton = document.getElementById("copy-button");

urlInput.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    cleanButton.click();
  }
});

cleanButton.addEventListener("click", () => {
  if (!urlInput.reportValidity()) {
    return;
  }
  cleanedURL.textContent = cleanURL(urlInput.value);
});

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(cleanedURL.textContent);
});
