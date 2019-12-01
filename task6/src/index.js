const url = "http://localhost:3000";

function deleteNewsitem() {}

async function updateViewList() {
  const newsListElement = document.querySelector("#news-list");
  newsListElement.innerHTML = "";
  const data = await fetch(`${url}/news`);
  const items = await data.json();
  const newsHtml = items.map(item => buildNewsItemHtml(item)).join('');
  newsListElement.innerHTML = newsHtml
}

function buildNewsItemHtml(item) {
  const publishDate = new Date(item.date);
  return `<div class="news-item">
            <div class="news-item__title">${item.title}</div>
            <div class="news-item__publish-date">${publishDate.toLocaleString()}</div>
            <div class="news-item-content">${item.author}</div>
            <button onclick="selectNewsItem(${item.id})">Select</button>
          </div>`;
}

function editNewsItem() {}

async function selectNewsItem(id) {
  const data = await fetch(`${url}/news/${id}`);
  const item = await data.json();
  setInputValue('newsId', item.id);
  setInputValue('title', item.title);
  setInputValue('date', new Date(item.date).toISOString().substr(0, 10));
  setInputValue('author', item.author);
  setInputValue('content', item.content);
}

function setInputValue(elementId, value) {
  /** @type {HTMLInputElement | HTMLTextAreaElement} */
  const input = document.getElementById(elementId);
  input.value = value;
}

main();

function main() {
  document.addEventListener("DOMContentLoaded", () => {
    updateViewList();
  });
}
