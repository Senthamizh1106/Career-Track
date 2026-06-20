let applications =
JSON.parse(localStorage.getItem("applications"))
|| [];

displayApplications();

function addApplication(){

    const company =
    document.getElementById("company").value;

    const role =
    document.getElementById("role").value;

    const status =
    document.getElementById("status").value;

    if(company === "" || role === ""){

        alert("Please fill all fields");

        return;
    }

    const application = {

        company,
        role,
        status
    };

    applications.push(application);

    saveData();

    displayApplications();

    document.getElementById("company").value = "";
    document.getElementById("role").value = "";
}

function saveData(){

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );
}

function displayApplications(data = applications){

    const list =
    document.getElementById("applicationList");

    list.innerHTML = "";

    let applied = 0;
    let interview = 0;
    let selected = 0;

    data.forEach((app,index)=>{

        if(app.status === "Applied") applied++;
        if(app.status === "Interview") interview++;
        if(app.status === "Selected") selected++;

        list.innerHTML += `

        <div class="application-card">

            <h3>${app.company}</h3>

            <p>${app.role}</p>

            <span class="status">
            ${app.status}
            </span>

            <br><br>

            <button
            class="edit-btn"
            onclick="changeStatus(${index})">

            Change Status

            </button>

            <button
            class="delete-btn"
            onclick="deleteApplication(${index})">

            Delete

            </button>

        </div>

        `;
    });

    document.getElementById("total").textContent =
    applications.length;

    document.getElementById("applied").textContent =
    applied;

    document.getElementById("interview").textContent =
    interview;

    document.getElementById("selected").textContent =
    selected;
}

function deleteApplication(index){

    applications.splice(index,1);

    saveData();

    displayApplications();
}

function changeStatus(index){

    let current =
    applications[index].status;

    if(current === "Applied"){

        applications[index].status =
        "Interview";
    }

    else if(current === "Interview"){

        applications[index].status =
        "Selected";
    }

    else{

        applications[index].status =
        "Applied";
    }

    saveData();

    displayApplications();
}

function searchApplications(){

    const value =
    document.getElementById("searchInput")
    .value
    .toLowerCase();

    const filtered =
    applications.filter(app =>

        app.company
        .toLowerCase()
        .includes(value)
    );

    displayApplications(filtered);
}

function filterApplications(){

    const filter =
    document.getElementById("filterStatus")
    .value;

    if(filter === "All"){

        displayApplications();

        return;
    }

    const filtered =
    applications.filter(app =>

        app.status === filter
    );

    displayApplications(filtered);
}