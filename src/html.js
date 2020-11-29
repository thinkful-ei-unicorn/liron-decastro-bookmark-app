import store from './store';

function loadDefault() {
    let content = "";

    let displayRating = '';
    
    console.log(store.store.bookmarks, " c'est le store en html")
    if(store.store.bookmarks.length !== 0) {
        for(let i = 0; i < store.store.bookmarks.length; i++) {
            for(let j = 0; j < store.store.bookmarks[i].rating; j++) {
                displayRating += `<span class="fa fa-star checked"></span>`
            }
            content += `
        <div class="content">
            <button type="button" class="collapsible" id="bookmark-content">
                <div class="button-text">${store.store.bookmarks[i].title}</div>
                <div class="etoiles">
                    ${displayRating}
                </div>
            </button> </div>`
          displayRating = '';  
        }
        
    } else { 
        content = `
        <div class="content">
            <span class="collapsible" id="bookmark-content">
                This list is empty.
            </span>`
    }
    
    return    `<div id="buttons" class="buttons">
    <div class="for-new-button">
        <button id="new-button" class="new-button">Add New</button>
    </div>
    <select name="filter" id="filter" class="filter">
        <option value="default" selected="selected">Filter Rating:
        <option value="1">1+
        <option value="2">2+
        <option value="3">3+
        <option value="4">4+
        <option value="5">5+
    </select>
</div>
<div class="main-display" id="main-display">
${content}
</div>
</div>`
}

function addBookmark() {
    return `<div class="add-bookmark">
    <form class="form-add">
        <div class="url-input">
        <label for="enter-link">Add new bookmark:</label>
            <input type="text" name="enter-link" id="enter-link" placeholder="enter URL here"required>
        </div> <div class="inner-box">
                <div class="name-input">
                <input type="text" name="enter-title" id="enter-title" placeholder="Enter title here" required>
                </div>
                <div class="stars">
                    <input class="star star-5" id="star-5" type="radio" name="star" value="5" required />
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star" value="4" required />
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star" value="3" required />
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star" value="2" required />
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star" value="1" required />
                    <label class="star star-1" for="star-1"></label>
                </div>
                <div class="description-area">
                    <textarea name="input-description" id="input-description" placeholder="Enter Description (optional)"></textarea>
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
    loadDefault,
    addBookmark
}