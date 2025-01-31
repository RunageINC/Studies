import TableComponent from "../../shared/base/tableComponent.mjs";

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data);

    document.body.insertAdjacentHTML("afterbegin", template);
  }

  prepareData(data) {
    const [firstItem] = data;
    const tHeaders = Object.keys(firstItem).map(
      (text) => `<th scope="col">${text}</th>`
    );

    const joinLists = (list) => list.join("");

    const tBodyValues = data.map((item) => {
      const tds = Object.values(item).map((value) => `<td>${value}</td>`);
      return `<tr scope="row">${joinLists(tds)}</tr>`;
    });

    const template = `
      <table class="table">
        <thead>
          <tr>${joinLists(tHeaders)}</tr>
        </thead>
        <tbody>
          ${joinLists(tBodyValues)}
        </tbody>
      </table>`;

    return template;
  }
}
