/* =========================
   ELEMENT SELECTOR
========================= */

const logbookForm = document.getElementById("logbookForm");

const logbookList = document.getElementById("logbookList");

const totalLog = document.getElementById("totalLog");

const todayLog = document.getElementById("todayLog");

const filterMember = document.getElementById("filterMember");

/* =========================
   LOCAL STORAGE
========================= */

let logbooks = JSON.parse(
    localStorage.getItem("capstoneLogbooks")
) || [];

/* =========================
   SAVE DATA
========================= */

function saveData(){

    localStorage.setItem(
        "capstoneLogbooks",
        JSON.stringify(logbooks)
    );

}

/* =========================
   UPDATE STATISTICS
========================= */

function updateStatistics(){

    /* TOTAL LOG */

    totalLog.textContent = logbooks.length;

    /* TODAY LOG */

    const today = new Date()
        .toISOString()
        .split("T")[0];

    const todayActivity = logbooks.filter(log => {

        return log.date === today;

    });

    todayLog.textContent = todayActivity.length;

}

/* =========================
   CREATE LOG CARD
========================= */

function createLogCard(log, index){

    const card = document.createElement("div");

    card.classList.add("log-card");

    card.innerHTML = `

        <div class="log-header">

            <div class="member-badge">
                ${log.member}
            </div>

            <div class="log-date">
                ${formatDate(log.date)}
            </div>

        </div>

        <h3>
            ${log.title}
        </h3>

        <p>
            ${log.description}
        </p>

        <button
            class="delete-btn"
            onclick="deleteLog(${index})"
        >
            Delete Log
        </button>

    `;

    return card;

}

/* =========================
   DISPLAY LOGBOOK
========================= */

function displayLogbooks(){

    /* CLEAR AREA */

    logbookList.innerHTML = "";

    /* FILTER MEMBER */

    const selectedMember = filterMember.value;

    let filteredLogs = [...logbooks];

    if(selectedMember !== "all"){

        filteredLogs = filteredLogs.filter(log => {

            return log.member === selectedMember;

        });

    }

    /* SORT NEWEST FIRST */

    filteredLogs.sort((a, b) => {

        return new Date(b.date) - new Date(a.date);

    });

    /* EMPTY STATE */

    if(filteredLogs.length === 0){

        logbookList.innerHTML = `

            <div class="log-card">

                <h3>
                    No Logbook Yet
                </h3>

                <p>
                    Start adding your project activity and progress.
                </p>

            </div>

        `;

        updateStatistics();

        return;

    }

    /* SHOW LOGBOOK */

    filteredLogs.forEach((log, index) => {

        const card = createLogCard(log, index);

        logbookList.appendChild(card);

    });

    updateStatistics();

}

/* =========================
   FORMAT DATE
========================= */

function formatDate(dateString){

    const options = {

        year: "numeric",

        month: "long",

        day: "numeric"

    };

    return new Date(dateString)
        .toLocaleDateString("id-ID", options);

}

/* =========================
   ADD NEW LOGBOOK
========================= */

logbookForm.addEventListener("submit", function(event){

    event.preventDefault();

    /* GET INPUT */

    const member = document.getElementById("member").value;

    const date = document.getElementById("date").value;

    const title = document.getElementById("title").value;

    const description = document.getElementById("description").value;

    /* VALIDATION */

    if(
        member === "" ||
        date === "" ||
        title === "" ||
        description === ""
    ){

        alert("Please complete all fields.");

        return;

    }

    /* CREATE OBJECT */

    const newLogbook = {

        id: Date.now(),

        member: member,

        date: date,

        title: title,

        description: description

    };

    /* PUSH DATA */

    logbooks.push(newLogbook);

    /* SAVE */

    saveData();

    /* RENDER */

    displayLogbooks();

    /* RESET FORM */

    logbookForm.reset();

});

/* =========================
   DELETE LOGBOOK
========================= */

function deleteLog(index){

    const confirmation = confirm(
        "Are you sure you want to delete this logbook?"
    );

    if(!confirmation){

        return;

    }

    logbooks.splice(index, 1);

    saveData();

    displayLogbooks();

}

/* =========================
   FILTER EVENT
========================= */

filterMember.addEventListener("change", function(){

    displayLogbooks();

});

/* =========================
   INITIAL LOAD
========================= */

displayLogbooks();