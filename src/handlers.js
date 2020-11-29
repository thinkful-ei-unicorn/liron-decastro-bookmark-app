import $ from 'jquery';
import api from './api';
import store from './store';
import render from './render';


function handleAddNew() {
    $('.new-button').click(event => {
store.store.adding = true;
    render.renderHome();
    })
};

function handleSubmitNew() {
    $('.form-add').submit(event=> {
    event.preventDefault();
    const newURL = $('#enter-link').val();
    const newName = $('#enter-title').val();
    const newRating = parseInt($('input[name="star"]:checked').val());
    const newDescription = $('#input-description').val();
    console.log(newURL + newName + newRating + newDescription);
    api.submitNew(newURL, newName, newDescription, newRating)
    store.store.adding = false;
    render.renderHome();
    })
    }

function handleSubmitCancel() {
    $('.cancel-button').click(event => {
        store.store.adding = false;
        render.renderHome();
    })
}

function handleShowDesc() {
    $('.collapsible').click(event=> {

    })
}

export default {
    handleAddNew,
    handleSubmitNew,
    handleSubmitCancel,
    handleShowDesc
}