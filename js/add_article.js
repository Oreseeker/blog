"use strict";

function getFormData() {
    return {
        title: titleField.value,
        tags: tagsField.value,
        description: descriptionField.value
    };
}
function clearForm() {
    titleField.value = "";
    tagsField.value = "";
    descriptionField.value = ""
}
function sendFormData(data) {
    const request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:3000/articles?id=1");
    request.onreadystatechange = function() {
        if (request.status == 200) {
            alert('Data has been sent successfully')
        }
    }
    request.onerror = function () {
        alert("Error occured while sending the data");
    }
    request.send(data);
}
function submitArticle() {
    const data = getFormData();
    sendFormData(data);
    clearForm();
}

const titleField = document.querySelector("#article-title");
const tagsField = document.querySelector("#article-tags");
const descriptionField = document.querySelector("#article-description");
const submitButton = document.querySelector("#send-article");
submitButton.addEventListener("click", submitArticle);
