import {activities} from "./serviсes.js";

document.addEventListener('DOMContentLoaded', () => {
    let activitiesContainer = document.getElementsByClassName("activities")[0];
    initActivities(activities, activitiesContainer);

    addListener("id", "activity-input-title", "input", verifyTitleInput, false, document);
    addListener("id", "activity-input-title", "blur", verifyTitleInput, false, document);
    addListener("id", "activityForm", "submit", submitActivityData, false, document);

});

// -------activity nav--------
const initActivities = (arr = [], container) => {
    arr.forEach(item => {
        let card = generateActivityCard(item);
        container.appendChild(card);
    });
    addListener("class", "toggleActivityBtn", "click", toggleActivity, true, document);
    addListener("class", "cardDeleteBtn", "click", deleteActivity, true, document);
};
const addActivityToContainer = (activity) => {
    let container = document.getElementsByClassName("activities")[0];
    let card = generateActivityCard(activity);
    container.appendChild(card);
    addListener("class", "toggleActivityBtn", "click", toggleActivity, false, container.lastChild);
    addListener("class", "cardDeleteBtn", "click", deleteActivity, false, container.lastChild);
};
const generateActivityCard = ({id, title, text, trackingLog, isRunning}) => {
    let cardDiv = document.createElement('div',);
    let startDate = "hasn't started yet", status = "", btnText = "start", total = "0.0";
    let totalH = getTotalH(trackingLog);
    if (trackingLog.length) {
        startDate = new Date(trackingLog[0].start).toDateString();
    }
    if (isRunning) {
        status = "tracking";
        btnText = "stop";
        total = `${totalH}+`;
    } else if (!isRunning && isRunning !== null) {
        status = "pending";
        total = `${totalH}`;
    }
    cardDiv.classList.add("card");
    if (status.length) {
        cardDiv.classList.add(status);
    }
    cardDiv.setAttribute("data-id", id);
    cardDiv.innerHTML = `<div class="card-body">
                                <div class="activity-card-header">
                                    <h5 class="card-title">${title}</h5>
                                    <button type="button" class="btn btn-secondary cardDeleteBtn" aria-label="delete"><i class="bi bi-trash"></i></button>
                                </div>                            
                               <div class="card-text">
                                 <div class="startDate">Started: ${startDate}</div>
                                 <div>${text}</div>
                                 <div class="total">Total, h: ${total}</div>                                                                                                
                               </div>                            
                                <button type="button" class="btn btn-success toggleActivityBtn">${btnText}</button>
                          </div>`;
    return cardDiv;
};
// -------end activity nav--------
//--------add new activity--------
const verifyTitleInput = () => {
    let input = event.target;
    let inputLength = input.value.trim().length;
    let formBtn = event.target.closest('form').getElementsByTagName('button')[0];
    if (inputLength && inputLength > 0) {
        disableBtn(formBtn, false);
        input.classList.remove("is-invalid");
    } else {
        disableBtn(formBtn, true);
        input.classList.add("is-invalid");
    }
};
const submitActivityData = () => {
    event.preventDefault();
    let newActivity = {
        id: (Date.now()).toString(),
        title: event.target.title.value,
        text: event.target.text.value,
        trackingLog: [],
        isRunning: null
    };
    activities.push(newActivity);
    addActivityToContainer(newActivity);
    event.target.reset();
};

//------------ end add new activity---------------
//------------ control activity---------------
const toggleActivity = () => {
    let activityCard = event.target.closest('.card');
    let activityCardBtn = activityCard.getElementsByClassName('toggleActivityBtn')[0];
    let activityId = activityCard.getAttribute('data-id');
    let activity = activities.find(element => element.id === activityId);
    let startDateDiv = activityCard.getElementsByClassName('startDate')[0];
    let totalDiv = activityCard.getElementsByClassName('total')[0];
    let startDate = null, totalHText = null;

    activity.isRunning = !activity.isRunning;
    if (activity.isRunning) {
        startDate = Date.now();
        activity.trackingLog.push({start: startDate, end: ''});
        startDateDiv.innerText = `Started: ${new Date(startDate).toDateString()}`;
        activityCard.classList.remove('pending');
        activityCard.classList.add('tracking');
        activityCardBtn.innerText = 'stop';
        activityCardBtn.classList.remove('btn-success');
        activityCardBtn.classList.add('btn-danger');

        totalHText = `Total, h: ${getTotalH(activity.trackingLog)}+`;
    } else {
        activity.trackingLog[activity.trackingLog.length - 1].end = Date.now();
        activityCard.classList.remove('tracking');
        activityCard.classList.add('pending');
        activityCardBtn.innerText = 'start';
        activityCardBtn.classList.remove('btn-danger');
        activityCardBtn.classList.add('btn-success');
        totalHText = `Total, h: ${getTotalH(activity.trackingLog)}`;
    }
    totalDiv.innerText = totalHText;

};
const deleteActivity = () => {
    let activityCard = event.target.closest('.card');
    let activityId = activityCard.getAttribute('data-id');
    let activityIndex = activities.indexOf(activities.find(element => element.id === activityId));
    activities.splice(activityIndex, 1);
    activityCard.remove();
};
//------------ end control activity---------------
// -------shared--------
const disableBtn = (btn, isDisabled) => {
    if (!isDisabled) {
        btn.removeAttribute('disabled');
    } else {
        btn.setAttribute('disabled', '');
    }
};
const addListener = (selector, selectorName, eventType, handler, isMultiple = false, inside) => {
    let element, elements = [];
    if (isMultiple) {
        if (selector === "class") {
            elements = [...inside.getElementsByClassName(selectorName)];
        }
        elements.forEach((el) => {
            el.addEventListener(eventType, handler);
        });
    } else {
        if (selector === "id") {
            element = inside.getElementById(selectorName);
        }
        if (selector === "class") {
            element = inside.getElementsByClassName(selectorName)[0];
        }
        element.addEventListener(eventType, handler);
    }
};
const getTotalH = (trackingLog) => {
    let totalMs, totalH = 0;
    if (trackingLog.length) {
        totalMs = trackingLog.reduce((acc, entry) => {
            let {start, end} = entry;
            if (end.toString().length) {
                return acc + end - start
            } else {
                return acc;
            }
        }, 0);
        totalH = (totalMs / (1000 * 60 * 60)).toFixed(2);
    }
    return totalH;
};
// -------end shared--------








