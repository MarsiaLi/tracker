import {activities} from "./serviсes.js";

document.addEventListener('DOMContentLoaded', (event) => {
    let activitiesNav = document.getElementsByTagName("nav")[0];
    initActivityNav(activities, activitiesNav);
    // listeners
    let newActivityBtn = document.getElementById("newActivityBtn");
    newActivityBtn.addEventListener('click',()=>newActivityForm());
});


// -------activity nav--------
const initActivityNav = (arr=[], list) => {
    arr.forEach(item => {
        let template = generateActivityCard(item);
        list.appendChild(template);
    });
    let cardBtns = [...document.getElementsByClassName("toggleActivityBtn")];
    cardBtns.forEach((btn)=>{
        // listener to refine
        btn.addEventListener('click', ()=>toggleActivity());
    });
};
const addActivityToNav = (activity) => {
    let activitiesNav = document.getElementsByTagName("nav")[0];
    let template = generateActivityCard(activity);
    activitiesNav.appendChild(template);
    // listener
    let btn = activitiesNav.lastChild.getElementsByClassName("toggleActivityBtn")[0];
    btn.addEventListener('click', ()=>toggleActivity());
};
const generateActivityCard = ({id, title, text, trackingLog, isRunning}) => {
    let template = document.createElement('a',);
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
    template.classList.add("nav-link");
    template.innerHTML = `<div class="card ${status}" data-id=${id}>
                            <div class="card-body">
                               <h5 class="card-title">${title}</h5>
                               <div class="card-text">
                                 <div class="startDate">Started: ${startDate}</div>
                                 <div>${text}</div>
                                 <div class="total">Total, h: ${total}</div>                                 
                                 <button type="button" class="btn btn-light toggleActivityBtn">${btnText}</button>                                 
                               </div>
                            </div>
                          </div>`;
    return template;
};
// -------end activity nav--------

//------------ add new activity---------------
const newActivityForm = () => {
    let temp = document.getElementById("newActivityFormTemplate");
    let board = document.getElementById("activityBoard");
    let clon = temp.content.cloneNode(true);
    disableBtn(event.target, true);
    board.appendChild(clon);
    // listeners
    let titleInput = document.getElementById("activity-input-title");
    let form = document.getElementById("newActivityForm");
    titleInput.addEventListener('input',()=>verifyTitleInput());
    form.addEventListener('submit',()=>submitNewActivity(event));
    form.addEventListener('reset',()=>cancel());
};
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
const submitNewActivity = (event) => {
    event.preventDefault();
    let newActivity = {
        id: (Date.now()).toString(),
        title: event.target.title.value,
        text: event.target.text.value,
        trackingLog: [],
        isRunning: null
    };
    activities.push(newActivity);
    addActivityToNav(newActivity);
    destroyForm('newActivityForm');
    disableBtn(document.getElementById('newActivityBtn'), false);
};
const cancel = () => {
    destroyForm('newActivityForm');
    disableBtn(document.getElementById('newActivityBtn'), false);
};
const destroyForm = (id) => {
    let form = document.getElementById(id);
    form.remove();
};
//------------ end add new activity---------------
// -------control activity--------
const toggleActivity = () => {
    let activityCard = event.target.closest('.card');
    let activityCardBtn = activityCard.getElementsByTagName('button')[0];
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

        totalHText=`Total, h: ${getTotalH(activity.trackingLog)}+`;
    } else {
        activity.trackingLog[activity.trackingLog.length - 1].end = Date.now();
        activityCard.classList.remove('tracking');
        activityCard.classList.add('pending');
        activityCardBtn.innerText = 'start';
        totalHText=`Total, h: ${getTotalH(activity.trackingLog)}`;
    }
    totalDiv.innerText = totalHText;

};
// -------end control activity--------

// -------shared--------
const disableBtn = (btn, isDisabled) => {
    if (!isDisabled) {
        btn.removeAttribute('disabled');
    } else {
        btn.setAttribute('disabled', '');
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
        },0);
        totalH = (totalMs / (1000 * 60 * 60)).toFixed(2);
    }
    return totalH;
};
// -------end shared--------








