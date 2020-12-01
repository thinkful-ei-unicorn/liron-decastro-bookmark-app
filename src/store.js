const storeItems = {
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0
  };

//simplifies item search using ID
const findById = function (id) {
  return storeItems.bookmarks.find(currentItem => currentItem.id === id);
  };

//function to expand each bookmark when clicked
const expandThis = function (id) {
  let selectedItem = findById(id);
  selectedItem.expanded = !selectedItem.expanded
}

//adds bookmark into local store
const addBookmark = function (item) {
  this.storeItems.bookmarks.push(item);
};

//handles item deletion from store
const findAndDelete = function (id) {
  storeItems.bookmarks = storeItems.bookmarks.filter(currentItem => currentItem.id !== id);
};

//changes value of storeItems.error
const setError = function (error) {
  this.storeItems.error = error;
}


export default {
  storeItems,
  findById,
  expandThis,
  addBookmark,
  findAndDelete,
  setError
}