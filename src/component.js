export default (text = "<h1>Hello world</h1>") => {
    const container = document.createElement("div");
    container.className = "container";

    const row = document.createElement("div");
    row.className = "row";

    container.appendChild(row);

    row.innerHTML = `<div class="col-12">test</div>`;

    return container;
};
