import $ from 'jquery';

import './style.css';
import bookmarks from './bookmarks';
import api from './api';
import store from './store';




function main () {
    api.getBookmarks()
    .then((storeItems) => {
      storeItems.forEach((item) => store.addBookmark(item));
      bookmarks.renderHome();
    });
bookmarks.renderHome();
}

$(main);