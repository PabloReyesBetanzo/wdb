export default (text = "<h1>Hello world</h1>") => {
    const element = document.createElement("div");

    element.innerHTML = text;

    return element;
};
