import store from './store';

//generates the main HTML for the DOM
const generateHtml = function(htmlList) {
    let listHtml = htmlList.map(array => generateUi(array));  
    return `<div id="buttons" class="buttons">
    <div class="for-new-button">
        <button id="new-button" class="new-button" tabindex="0">Add New</button>
    </div>
    <select tabindex="0" name="filter" id="filter" class="filter">
    <option value="0" ${(store.storeItems.filter === '0') ? 'selected' : ''}>Filter by Rating</option>
    <option value="1" ${(store.storeItems.filter === '1') ? 'selected' : ''}>Hide unrated bookmarks</option>
    <option value="2" ${(store.storeItems.filter === '2') ? 'selected' : ''}>Show only 2 stars and up</option>
    <option value="3" ${(store.storeItems.filter === '3') ? 'selected' : ''}>Show only 3 stars and up</option>
    <option value="4" ${(store.storeItems.filter === '4') ? 'selected' : ''}>Show only 4 stars and up</option>
    <option value="5" ${(store.storeItems.filter === '5') ? 'selected' : ''}>Show only 5 stars</option>
    </select>
</div>
<div class="content">
<ul class="main-display" id="main-display">
${listHtml.join('')}
</ul>
</div>`
}

//determines if a list is to be shown according to the filter, and to be expanded 
const generateUi = function (array) {
    if (array.rating >= store.storeItems.filter) {
        if(array.expanded === true){
            return panelView(array);
        } else {
            return defaultView(array);
        }
    }
}


//what a bookmark will look like unexpanded
const defaultView = function (array) {
    let displayRating;
    let starClicked = array.rating;
    const starHTML = `<span class="fa fa-star checked"></span>`;
    displayRating = starHTML.repeat(starClicked);
    return `<li tabindex="0" class="collapsible" id="bookmark-content-${array.id}" data-bookmark-id="${array.id}">
            <p class="button-text" id="button-text-${array.id}">${array.title}</p>
            <p class="etoiles">
                ${displayRating}
            </p>
            </li>
            `
}

//what a bookmark will look like expanded
const panelView = function (array) {
    let displayRating;
    let starClicked = array.rating;
    const starHTML = `<span class="fa fa-star checked"></span>`;
    displayRating = starHTML.repeat(starClicked);
    return `<li tabindex="0" class="collapsible" id="bookmark-content-${array.id}" data-bookmark-id="${array.id}">
    <p class="button-text" id="button-text-${array.id}">${array.title}</p>
    <p class="etoiles">
        ${displayRating}
    </p>
    <div class="panel">
    <div class="drop-down-button">
    <a href="${array.url}" target="_blank" ref="external" class="visit-site")">Visit Site</a>
    <button class="delete-button" id="delete-${array.id}" data-bookmark-id=${array.id}> Delete</button>
    </div>
    <p id='desc-for-${array.id}' class='drop-down-text'>
        ${array.desc}           
    </p>
</div>  </li>` 
}

//HTML for the form to add a new bookmark
function addBookmark() {
    return `<div class="add-bookmark">
    <form class="form-add">
        <div class="url-input">
            <label for="enter-link">Enter URL (must start with 'http://' or 'https://'):</label>
            <input type="text" name="url" id="enter-link" placeholder="enter URL here" required />
        </div> <div class="inner-box">
                <div class="name-input">
                <label for="enter-title">Enter title:</label>
                <input type="text" name="title" id="enter-title" placeholder="Enter title here" required />
                </div>
                <div class="stars">
                    <input aria-label="5 stars" class="star star-5" id="star-5" type="radio" name="rating" value="5" />
                    <label class="star star-5" for="star-5"></label>
                    <input aria-label="4 stars" class="star star-4" id="star-4" type="radio" name="rating" value="4" />
                    <label class="star star-4" for="star-4"></label>
                    <input aria-label="3 stars" class="star star-3" id="star-3" type="radio" name="rating" value="3" />
                    <label class="star star-3" for="star-3"></label>
                    <input aria-label="2 stars" class="star star-2" id="star-2" type="radio" name="rating" value="2" />
                    <label class="star star-2" for="star-2"></label>
                    <input aria-label="1 star" class="star star-1" id="star-1" type="radio" name="rating" value="1" />
                    <label class="star star-1" for="star-1"></label>
                </div>
                <div class="description-area">
                    <label for="input-description">Enter description here (optional):</label>
                    <textarea name="desc" id="input-description" placeholder="Enter Description (optional)"></textarea>
                </div>
            </div>
            <div class="form-buttons">
            <button class="cancel-button" default>Cancel</button>
            <button type="submit" class="submit-form">Submit</button>
            </div>
    </form>
</div>`
}



export default {
    generateHtml,
    addBookmark
}