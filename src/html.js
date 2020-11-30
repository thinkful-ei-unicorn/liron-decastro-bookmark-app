import $ from 'jquery';
import bookmarks from './bookmarks';
import store from './store';


const generateHtml = function(htmlList) {
    let listHtml = htmlList.map(array => generateUi(array));  
    return `<div id="buttons" class="buttons">
    <div class="for-new-button">
        <button id="new-button" class="new-button">Add New</button>
    </div>
    <select name="filter" id="filter" class="filter">
    <option value="0" ${(store.storeItems.filter === '0') ? 'selected' : ''}>Filter By Rating</option> 
    <option value="0" ${(store.storeItems.filter === '0') ? 'selected' : ''}>Show All</option>
    <option value="1" ${(store.storeItems.filter === '0') ? 'selected' : ''}>Hide unrated bookmarks</option>
    <option value="2" ${(store.storeItems.filter === '2') ? 'selected' : ''}>Show only 2 stars and up</option>
    <option value="3" ${(store.storeItems.filter === '3') ? 'selected' : ''}>Show only 3 stars and up</option>
    <option value="4" ${(store.storeItems.filter === '4') ? 'selected' : ''}>Show only 4 stars and up</option>
    <option value="5" ${(store.storeItems.filter === '5') ? 'selected' : ''}>Show only 5 stars</option>
    </select>
</div>
<div class="main-display" id="main-display">
${listHtml.join('')}
</div>`
}

const generateUi = function (array) {
    if (array.rating >= store.storeItems.filter) {
        if(array.expanded === true){
            return panelView(array);
        } else {
            return defaultView(array);
        }
    }
}



const defaultView = function (array) {
    let displayRating;
    let starClicked = array.rating;
    const starHTML = `<span class="fa fa-star checked"></span>`;
    displayRating = starHTML.repeat(starClicked);
    return `<div class="content">
            <button type="button" class="collapsible" id="bookmark-content" data-bookmark-id="${array.id}">
                <div class="button-text" id="button-text">${array.title}</div>
                <div class="etoiles">
                    ${displayRating}
                </div>
            </button> </div>
            `
}

const panelView = function (array) {
    let displayRating;
    let starClicked = array.rating;
    const starHTML = `<span class="fa fa-star checked"></span>`;
    displayRating = starHTML.repeat(starClicked);
    return `<div class="content">
    <button type="button" class="collapsible" id="bookmark-content" data-bookmark-id="${array.id}">
        <div class="button-text" id="button-text">${array.title}</div>
        <div class="etoiles">
            ${displayRating}
        </div>
    </button> </div>
    <div class="panel">
    <div class="drop-down-button">
    <button class="visit-site" onclick="window.open('${array.url}','_blank')">Visit Site</button>
    <button class="delete-button" id="delete-button" data-bookmark-id=${array.id}> Delete</button>
    </div>
    <p id='drop-down-text'>
        ${array.desc}           
    </p>
</div>` 
}

function addBookmark() {
    return `<div class="add-bookmark">
    <form class="form-add">
        <div class="url-input">
        <label for="url">Add new bookmark:</label>
            <input type="text" name="url" id="enter-link" placeholder="enter URL here"required>
        </div> <div class="inner-box">
                <div class="name-input">
                <input type="text" name="title" id="enter-title" placeholder="Enter title here" required>
                </div>
                <div class="stars">
                    <input class="star star-5" id="star-5" type="radio" name="rating" value="5" required />
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="rating" value="4" required />
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="rating" value="3" required />
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="rating" value="2" required />
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="rating" value="1" required />
                    <label class="star star-1" for="star-1"></label>
                </div>
                <div class="description-area">
                    <textarea name="desc" id="input-description" placeholder="Enter Description (optional)"></textarea>
                </div>
            </div>
            <div class="form-buttons">
            <button class="cancel-button" default>Cancel</button>
            <button type="submit" class="submit-form">Submit</button>
            </div>
        </label>
    </form>
</div>`
}



export default {
    generateHtml,
    addBookmark
}