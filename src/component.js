export default (text = "<h1>Hello world</h1>") => {
    const element = document.createElement("div");

    element.classList = "pure-button";
    element.innerHTML = text;

    return element;
};
