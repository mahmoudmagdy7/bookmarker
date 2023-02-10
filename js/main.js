'use strict'

// setting the variables
var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var bookmarks = [];


// getting data form local storage.
if (localStorage.getItem('bookmarks') != null) {
  bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  displaySites()
}

// adding new item
function addBookmark() {
  var site = {
    name: siteName.value,
    url: siteUrl.value,
  }
  // validate the data 
  if (siteName.value && siteUrl.value != '') {
    bookmarks.unshift(site)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displaySites()
    generateRandomColors()
    clear()
  } else {
    document.getElementById("warning").style.display = 'block';
  }
}

// limit bookmark title
function lengthChecker() {
  if (siteName.value.length == 35) {
    document.getElementById("maxLength").style.display = 'block';
  } else {
    document.getElementById("maxLength").style.display = 'none';
  }
}

function hideValidation() {
  document.getElementById("warning").style.display = 'none';
}

// clearing form 
function clear() {
  siteName.value = '';
  siteUrl.value = '';
}

// display sites
function displaySites() {
  var table = '';
  for (var i = 0; i < bookmarks.length; i++) {
    table += `
    <div id="bookmarkItem" class="bookmarkRow d-flex align-items-center justify-content-between m-3 bg-white py-2 px-5 rounded-1">
      <h3>${bookmarks[i].name}</h3>
      <div>
        <button onclick="visit(${i})" class="btn btn-outline-primary px-4 mx-3">visit</button>
        <button onclick="deleteSite(${i})" class="btn btn-outline-danger px-4">Delete</button>
      </div>
    </div>
`
  }
  document.getElementById('bookmarkList').innerHTML = table;
}

// delete site
function deleteSite(index) {
  bookmarks.splice(index, 1)
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  displaySites()
  generateRandomColors()
}

// visit site 
function visit(index) {
  console.log(`visit ${bookmarks[index].url}`);
  window.open(`http://${bookmarks[index].url}`, '_blank');
}

//random border colors
function generateRandomColors() {
  var colors = ['#4681f4', '#5783db', '#55c2da', '#5dbea3', '#33b249', '#5adbb5', '#a881af', '#dd7973', '#ff4d4d', '#ff5000', '#ff9666', '#ffbd03'];
  var elements = document.getElementsByClassName("bookmarkRow");
  for (var i = 0; i < elements.length; i++) {
    var newColor = Math.floor(Math.random() * colors.length)
    elements[i].style.borderColor = colors[newColor];
  }
}
generateRandomColors()