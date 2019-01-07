let textarea = document.querySelector("textarea"),
    span = document.querySelector("span");


textarea.onkeydown = () => {
    if (textarea.value.length > 200) return false;
    span.innerHTML = "Characters left: " + (200 - textarea.value.toString().length) + "/200.";
    
};