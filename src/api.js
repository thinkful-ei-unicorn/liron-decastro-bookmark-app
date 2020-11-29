import store from './store';

const baseURL = 'https://thinkful-list-api.herokuapp.com/lirondecastro';

function getBookmarks() {
    let request =  `${baseURL}/bookmarks`;
    fetch(request,{
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response=>response.json()).then(json => {
        console.log(json, ' est le json')
        let newArray = json;
        for (let i = 0; i < newArray.length; i++) {
            newArray[i]["expanded"] = false;
        }
        console.log(newArray, ' est le information internel');
        store.store.bookmarks = newArray;
    })
    .catch(err=>console.log(err));
};


function submitNew(newURL, newTitle, newDesc, newRating) {
    const sendBookmark = JSON.stringify({
        url: newURL,
        title: newTitle,
        desc: newDesc,
        rating: newRating
    });
    fetch(`${baseURL}/bookmarks`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: sendBookmark    
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err.message));
    getBookmarks();
}


export default {
    getBookmarks,
    submitNew
}


