export let activities = [
    {
        "id": "1617561472718",
        "title": "Study Vanilla JS",
        "text": "The more the better",
        "trackingLog": [
            {
                "start": 1617642667482,
                "end": 1617708940866
            },
            {
                "start": 1617708964009,
                "end": 1617708967968
            },
            {
                "start": 1617709044130,
                "end": 1617709161748
            },
            {
                "start": 1617709163020,
                "end": 1617709720901
            },
            {
                "start": 1617709722274,
                "end": 1617709754763
            },
            {
                "start": 1617709758363,
                "end": 1617710024075
            }
        ],
        "isRunning": false
    },
    {
        "id": "1617561553851",
        "title": "Test Preparation",
        "text": "10 questions a day",
        "trackingLog": [
            {
                "start": 1617702746604,
                "end": ""
            },
            {
                "start": 1617708945632,
                "end": 1617708948650
            },
            {
                "start": 1617708950530,
                "end": 1617709035327
            },
            {
                "start": 1617709036939,
                "end": 1617709038899
            },
            {
                "start": 1617709040369,
                "end": 1617709156011
            },
            {
                "start": 1617709158930,
                "end": 1617709719053
            },
            {
                "start": 1617709723338,
                "end": 1617710025090
            }
        ],
        "isRunning": false
    },
    {
        "id": "1617711459982",
        "title": "Housework",
        "text": "Twice a week",
        "trackingLog": [],
        "isRunning": null
    },
    {
        "id": "1617711528675",
        "title": "Sport and hobbies",
        "text": "",
        "trackingLog": [],
        "isRunning": null
    }
];

export let about = {
    intro: "The Tracker is a web-application to track your time spent by activities",
    features: ["Responsive design", "Clear UI", "Wide browser support", "Demo and Live mode", "Local data storage in Live mode"],
    howItWorks: [
        "Open the tracker in your browser. By default it runs in Demo mode. All entered data will be cleared on page reset.",
        "Switch on local storage mode to not loose your data. More about local storage: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API . If yoy switch off local storage mode, all tracker related data will be cleared from your browser.",
        "If the browser does not support local data storage, user see corresponding message in application header.",
        "You can seed the tracker with fake data or enter you data yourself by clicking \"add new\" button and filling the form. Note, the seeding is only enabled if there is no item in the tracker.",
        " To start tracking press \"start\" button on a corresponding activity card. You see a spinner within \"hours\" area. When you press \"stop\" button the tracking stops and hours value updates.", "" +
        "Activity cards may be deleted one by one pressing corresponding \"trash\" button. Alternatively, you may switch off local storage mode and refresh page, all the data and cards are deleted."
    ]
};

