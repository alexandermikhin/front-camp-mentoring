const url = "http://localhost:3000";

async function deleteNewsitem() {
  const id = getInputValue('newsId');
  const request = new Request(`${url}/news/${id}`, {
    method: 'DELETE',
  });

  const response = await fetch(request);
  if (response.ok) {
    updateViewList();
    alert('Update success');
  } else {
    const body = await response.text();
    alert(body);
  }
}

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

async function editNewsItem() {
  const id = getInputValue('newsId');
  const item = {
    title: getInputValue('title'),
    author: getInputValue('author'),
    date: new Date(getInputValue('date')),
    content: getInputValue('content')
  };

  const request = new Request(`${url}/news/${id}`, {
    method: 'PUT',
    body: JSON.stringify(item)
  });

  const response = await fetch(request);
  if (response.ok) {
    updateViewList();
    alert('Update success');
  } else {
    const body = await response.text();
    alert(body);
  }
}

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

function getInputValue(elementId, value) {
  /** @type {HTMLInputElement | HTMLTextAreaElement} */
  const input = document.getElementById(elementId);
  return input.value;
}

main();

function main() {
  document.addEventListener("DOMContentLoaded", () => {
    updateViewList();
  });
}
