import $ from 'jquery';
import api from './api';
import store from './store';
import html from './html';
import handlers from './handlers';

function renderHome () {
    api.getBookmarks();
    if (store.store.adding === false) {
            $("main").html(html.loadDefault());
            handlers.handleAddNew();
    } else {
            $("main").html(html.addBookmark());
            handlers.handleSubmitNew();
            handlers.handleSubmitCancel();
    }
console.log(store.store.bookmarks);
};


export default {
    renderHome
}

