import {activities as seeds} from "./serviсes.js";
let activities =[];
let seedBtn;

document.addEventListener('DOMContentLoaded', () => {
    seedBtn=document.getElementById("seedBtn");
    seedBtn.addEventListener("click", ()=>{seedActivities()});
    addActivitiesToContainer(activities);
    addListener("id", "activity-input-title", "input", verifyTitleInput, false, document);
    addListener("id", "activity-input-title", "blur", verifyTitleInput, false, document);
    addListener("id", "activityForm", "submit", submitActivityData, false, document);
});

// -------activities--------
const seedActivities=()=>{
    activities=seeds;
    addActivitiesToContainer(activities);
}
const addActivitiesToContainer = (activities = []) => {
    let container = document.getElementsByClassName("activities")[0];
    let empty = document.getElementsByClassName("emptyCard")[0];
    if (activities.length) {
        disableBtn (seedBtn, true);
        if (empty){
            empty.remove();
        }
        activities.forEach(item => {
            let card = generateActivityCard(item);
            container.appendChild(card);
            addListener("class", "toggleActivityBtn", "click", toggleActivity, false, container.lastChild);
            addListener("class", "cardDeleteBtn", "click", deleteActivity, false, container.lastChild);
        });
    } else {
        showNoActivity(container);
        disableBtn (seedBtn, false);
    }
};
const generateNoActivityCard = ()=>{
    let cardDiv = document.createElement('div',);
    cardDiv.classList.add("card");
    cardDiv.classList.add("emptyCard");
    cardDiv.innerHTML = `<div class="card-body">
                                <div class="activity-card-header">
                                    <h5 class="card-title">No activity in your list</h5>                                    
                                </div>                            
                               <div class="card-text">
                                 Add your activities and start tracking right now!                                                                                                
                               </div>                                                          
                          </div>`;
    return cardDiv;
}
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
// -------end activities--------
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
    addActivitiesToContainer([newActivity]);
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
    let container = event.target.closest('.activities');
    activities.splice(activityIndex, 1);
    activityCard.remove();
    if (!activities.length){
        showNoActivity(container);
        disableBtn (seedBtn, false);
    }
};
//------------ end control activity---------------
// -------shared--------
const showNoActivity=(container)=>{
    let card = generateNoActivityCard();
    container.appendChild(card);
};
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








