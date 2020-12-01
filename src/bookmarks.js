import $ from 'jquery';
import api from './api';
import store from './store';
import html from './html';

// add new methods that can be used with jquery, in this case to serialize into json
$.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const output = {};
      formData.forEach((val, name) => output[name] = val);
      return JSON.stringify(output);
    }
  });
  
// returns HTML for when an error message needs to appear
const generateError = function (message) {
    return `
        <section class="error-content">
          <button id="cancel-error">X</button>
          <p>${message}</p>
        </section>
      `;
};

// generates the error message
const renderError = function () {
    if (store.storeItems.error) {
        const el = generateError(store.storeItems.error);
        $('.error-area').html(el);
    } else {
        $('.error-area').empty();
    }
    handleCloseError();
};

// closes the error message
const handleCloseError = function () {
    $('.error-area').on('click', '#cancel-error', () => {
        store.setError(null);
        renderError();
    });
};

// handles click event on 'add new'
const handleAddNew = function () {
    $('.new-button').click(event => {
        store.storeItems.adding = true;
        renderHome();
    })
};

// handles submit event of new bookmark form
const handleSubmitNew = function() {
    $('.form-add').submit(event => {
        event.preventDefault();
        console.log('initial click'); 
        const newBookmark = $('.form-add').serializeJson();
        api.createBookmark(newBookmark)
        .then((newData) => {
            console.log("it's clicking!");
            store.addBookmark(newData);
            store.storeItems.adding = false;
            renderHome();
        })
        .catch ((error) => {
            store.setError(error.message);
            renderError();
        }); 
    });
}

//handles click event on cancel buttin within the form
const handleSubmitCancel = function () {
    $('.cancel-button').click(event => {
        store.storeItems.adding = false;
        renderHome();
    })
}

//retrieves ID from clicked bookmark
const getIdFromElement = function (item) {
    return $(item)
    .closest('.collapsible')
    .data('bookmark-id')
}

//retrieves ID from delete button within a bookmark
const getIdToDelete = function (item) {
    return $(item)
    .closest('.delete-button')
    .data('bookmark-id')
}

//handles click event on bookmark
const handlePanelExpand = function () {
    $('.collapsible').click((event => {
        const panelID = getIdFromElement(event.currentTarget);
        console.log('ID is ', panelID)
        store.expandThis(panelID);
        renderHome();
    }));
}

//handles event when filter is changed
const handleFilter = function () {
    $('.filter').change(event => {
        let filter = $('.filter').val();
        store.storeItems.filter = filter;
        renderHome();
    })
}

//handles delete button on bookmark
const handleDeleteBookmark = function () {
    $('.delete-button').click(event => {
        const id = getIdToDelete(event.currentTarget);
        console.log(id, " is the id to delete");
        api.deleteBookmark(id)
        .then(()=>{
            store.findAndDelete(id);
            renderHome();
        })
        .catch((error) => {
            console.log(error);
            store.setError(error.message);
            renderError();
        })
    })
}

// renders the DOM
const renderHome = function () {
    const renderBookmark = [...store.storeItems.bookmarks];
    if (store.storeItems.adding === false) {
        $("main").html(html.generateHtml(renderBookmark));
        renderError();
        handleAddNew();
        handlePanelExpand();
        handleFilter();
        handleDeleteBookmark();
    } else {
        $("main").html(html.addBookmark());
        handleSubmitNew();
        handleSubmitCancel();
        renderError();
    }
};


export default {
    renderHome
}
