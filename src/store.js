const storeItems = {
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0
  };

const findById = function (id) {
  return storeItems.bookmarks.find(currentItem => currentItem.id === id);
  };

const expandThis = function (id) {
  console.log('are we expanding?');
  let selectedItem = findById(id);
  console.log('was the id found?', findById(id))
  selectedItem.expanded = !selectedItem.expanded
  console.log('are we expanded', selectedItem.expanded)
}

const addBookmark = function (item) {
  this.storeItems.bookmarks.push(item);
};

const findAndDelete = function (id) {
  storeItems.bookmarks = storeItems.bookmarks.filter(currentItem => currentItem.id !== id);
};

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