function render() {
  generatePosts();
  generateSugg();
  generateStory();
}

function generatePosts() {
  document.getElementById('postcontainer').innerHMTL = '';

  for (let i = 0; i < content.length; i++) {
    document.getElementById('postcontainer').innerHTML += createPost(i);
  }
}

function generateSugg() {
  document.getElementById('suggProfile').innerHTML = '';
  for (let i = 0; i < suggestions.length; i++) {
    document.getElementById('suggProfile').innerHTML += createSugg(i);
  }
}

function generateStory() {
  document.getElementById('storys').innerHTML = '';

  for (let i = 0; i < content.length; i++) {
    document.getElementById('storys').innerHTML += createStory(i);
  }
}

function createPost(i) {
  const post = content[i];

  return /*html*/ `
        <div id="post" class="post post-box">
          <div class="header-post">
            <div class="header-wrapper">
              <div class="logoAndAuthor">
                <img id="postLogo" class="logoAuthor pointer" src="${post['logo']}" alt="" />
                <div class="authorLocation">
                  <h2 class="pointer" id="postAuthor">${post['author']}</h2>
                  <p id="postLocation">${post['location']}</p>
                </div>
              </div>
              <img class="post-menu pointer" src="./img/icons/punkte.png" alt="" />
            </div>
          </div>
          <img class="image" id="postImage" src="${post['images']}" alt="" />
          <div class="interact">
            <div class="interactIcons">
              <img id="heartIcon${i}" class="icons pointer" src="./img/icons/herz.png" alt="herz" onclick="like(${i})"/>
              <img class="icons pointer" src="./img/icons/chat-ballon.png" alt="chat" />
              <img class="icons pointer" src="./img/icons/nachricht.png" alt="commentar" />
            </div>
            <img class="icons pointer" src="./img/icons/instagram-speichern.png" alt="save" />
          </div>
          <p class="likeCount">Gefällt <span id="likeAmount${i}">${post['likes']}</span> Mal</p>
          <div class="postBody">
            <p><strong>${post['author']}</strong> ${post['headline']}</p>
          </div>

          <div class="comment" id="comment${i}"></div>
          <div id="commentInput">
            <div>
              <img class="pointer" src="./img/icons/smile.png" alt=""> 
              <input id="input${i}" class="commentInput" type="text" placeholder="Kommentieren...">

            </div>
            <button class="pointer" onclick="addComment(${i})">Posten</button>
          </div>
        </div>
        `;
}

function createSugg(i) {
  const sugg = suggestions[i];

  return /*html*/ `
    <div class="container-suggestions">
      <div class="suggProfile">
        <img class="suggLogo pointer" src="${sugg['logo']}" alt="logo">
        <div>
          <h2 class="pointer">${sugg['name']}</h2>
          <p>${sugg['info']}</p>
        </div>
      </div>
      <button id="follow${i}" class="followBtn pointer follow" onclick="follow(${i})">Folgen</button>
    </div>
    `;
}

function createStory(i) {
  const story = content[i];
  return /*html*/ `
  <div class="storyPost">
  <img class="logo pointer" src="${story['logo']}" alt="" />
  <h3 class="pointer">${story['author']}</h3>
  </div>
  `;
}

function addComment(i) {
  let add = document.getElementById(`comment${i}`);
  add.innerHTML = '';
  let comment = document.getElementById(`input${i}`);
  content[i]['comment'].push(comment.value);
  for (let j = 0; j < content[i]['comment'].length; j++) {
    add.innerHTML += /*html*/ `
    <div class="comment-section">
      <img class="logoComment pointer" src="./img/profile.jpg" alt="" />
      <h3 class="pointer">KevinPhotographie_official</h3>
      <p>${content[i]['comment'][j]}</p>      
    </div> 
    `;
  }
  comment.value = '';
}

function like(i) {
  let like = content[i]['likes'];
  document.getElementById(`likeAmount${i}`).innerHTML = like + 1;
  document.getElementById(`heartIcon${i}`).src = './img/icons/herz_rot.png';
  document
    .getElementById(`heartIcon${i}`)
    .setAttribute('onclick', `javascript: dislike(${i})`);
}

function dislike(i) {
  let like = content[i]['likes'];
  document.getElementById(`likeAmount${i}`).innerHTML = like + 1 - 1;
  document.getElementById(`heartIcon${i}`).src = './img/icons/herz.png';
  document
    .getElementById(`heartIcon${i}`)
    .setAttribute('onclick', `javascript: like(${i})`);
}

function follow(i) {
  document.getElementById(`follow${i}`).innerHTML = 'Entfolgen';
  document.getElementById(`follow${i}`).classList.add('unfollow');
  document.getElementById(`follow${i}`).classList.remove('follow');
  document
    .getElementById(`follow${i}`)
    .setAttribute('onclick', `javascript: unfollow(${i})`);
}

function unfollow(i) {
  document.getElementById(`follow${i}`).innerHTML = 'Folgen';
  document.getElementById(`follow${i}`).classList.add('follow');
  document.getElementById(`follow${i}`).classList.remove('unfollow');
  document
    .getElementById(`follow${i}`)
    .setAttribute('onclick', `javascript: follow(${i})`);
}
