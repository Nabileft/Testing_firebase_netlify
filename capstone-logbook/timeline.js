/* =========================
   ELEMENT
========================= */

const timelineForm = document.getElementById("timelineForm");

const timelineList = document.getElementById("timelineList");

/* =========================
   STORAGE
========================= */

let timelines = JSON.parse(
    localStorage.getItem("projectTimeline")
) || [];

/* =========================
   SAVE DATA
========================= */

function saveTimeline(){

    localStorage.setItem(
        "projectTimeline",
        JSON.stringify(timelines)
    );

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
   STATUS CLASS
========================= */

function getStatusClass(status){

    if(status === "Pending"){

        return "pending";

    }

    if(status === "On Progress"){

        return "progress";

    }

    if(status === "Completed"){

        return "completed";

    }

}

/* =========================
   DISPLAY TIMELINE
========================= */

function displayTimeline(){

    timelineList.innerHTML = "";

    /* SORT */

    timelines.sort((a, b) => {

        return new Date(a.date) - new Date(b.date);

    });

    /* EMPTY */

    if(timelines.length === 0){

        timelineList.innerHTML = `

            <div class="timeline-item">

                <h3>
                    No Timeline Yet
                </h3>

                <p>
                    Add your first project roadmap activity.
                </p>

            </div>

        `;

        return;

    }

    /* LOOP */

    timelines.forEach((item, index) => {

        const div = document.createElement("div");

        div.classList.add("timeline-item");

        div.innerHTML = `

            <div class="timeline-top">

                <div class="timeline-date">
                    ${formatDate(item.date)}
                </div>

                <div class="status ${getStatusClass(item.status)}">
                    ${item.status}
                </div>

            </div>

            <h3>
                ${item.title}
            </h3>

            <p>
                ${item.description}
            </p>

            <button
                class="delete-btn"
                onclick="deleteTimeline(${index})"
            >
                Delete
            </button>

        `;

        timelineList.appendChild(div);

    });

}

/* =========================
   ADD TIMELINE
========================= */

timelineForm.addEventListener("submit", function(event){

    event.preventDefault();

    /* GET INPUT */

    const title = document.getElementById("title").value;

    const date = document.getElementById("date").value;

    const status = document.getElementById("status").value;

    const description = document.getElementById("description").value;

    /* OBJECT */

    const newTimeline = {

        id: Date.now(),

        title,

        date,

        status,

        description

    };

    /* PUSH */

    timelines.push(newTimeline);

    /* SAVE */

    saveTimeline();

    /* RENDER */

    displayTimeline();

    /* RESET */

    timelineForm.reset();

});

/* =========================
   DELETE TIMELINE
========================= */

function deleteTimeline(index){

    const confirmDelete = confirm(
        "Delete this timeline?"
    );

    if(!confirmDelete){

        return;

    }

    timelines.splice(index, 1);

    saveTimeline();

    displayTimeline();

}

/* =========================
   INITIAL LOAD
========================= */

displayTimeline();