function show() {
  document.getElementById('postcontainer').innerHMTL = '';

  for (let i = 0; i < content.length; i++) {
    const post = content[i];

    document.getElementById('postcontainer').innerHTML += /*html*/ `
        <div>
            <img src="${post['images']}" alt="">
            <div>${post['author']}</div>
            <div>${post['headline']}</div>
        </div>
        `;
  }
}
