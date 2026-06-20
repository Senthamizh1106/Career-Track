let applications =
JSON.parse(localStorage.getItem("applications")) || [];

displayApplications();

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function addApplication() {

    const company =
    document.getElementById("company").value.trim();

    const role =
    document.getElementById("role").value.trim();

    const status =
    document.getElementById("status").value;

    const deadline =
    document.getElementById("deadline").value;

    const notes =
    document.getElementById("notes").value;

    if(company === "" || role === ""){
        alert("Please fill all fields");
        return;
    }

    const application = {
        company,
        role,
        status,
        deadline,
        notes
    };

    applications.push(application);

    saveData();

    displayApplications();

    document.getElementById("company").value = "";
    document.getElementById("role").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("notes").value = "";
}

function saveData(){
    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );
}

function getRemainingDays(deadline){

    if(!deadline) return "";

    const today = new Date();
    const due = new Date(deadline);

    const diff = Math.ceil(
        (due - today) /
        (1000 * 60 * 60 * 24)
    );

    if(diff < 0){

        return `
        <p class="deadline-warning">
        Deadline Passed
        </p>
        `;
    }

    return `
    <p class="deadline-safe">
    ${diff} days left
    </p>
    `;
}

function displayApplications(data = applications){

    const list =
    document.getElementById("applicationList");

    list.innerHTML = "";

    if(data.length === 0){

        list.innerHTML = `
        <div class="empty-state">
            <h3>No Applications Found 🚀</h3>
            <p>Add your first internship application.</p>
        </div>
        `;

        updateDashboard();
        return;
    }

    data.forEach((app,index)=>{

        list.innerHTML += `

        <div class="application-card">

            <h3>${app.company}</h3>

            <p>${app.role}</p>

            <span class="status ${app.status.toLowerCase()}">
                ${app.status}
            </span>

            ${getRemainingDays(app.deadline)}

            <p>
                <strong>Notes:</strong>
                ${app.notes || "No Notes"}
            </p>

            <div class="btn-group">

                <button
                class="edit-btn"
                onclick="editApplication(${index})">
                Edit
                </button>

                <button
                class="status-btn"
                onclick="changeStatus(${index})">
                Change Status
                </button>

                <button
                class="delete-btn"
                onclick="deleteApplication(${index})">
                Delete
                </button>

            </div>

        </div>
        `;
    });

    updateDashboard();
}

function updateDashboard(){

    let applied = 0;
    let interview = 0;
    let selected = 0;
    let rejected = 0;

    applications.forEach(app=>{

        if(app.status === "Applied") applied++;
        if(app.status === "Interview") interview++;
        if(app.status === "Selected") selected++;
        if(app.status === "Rejected") rejected++;
    });

    document.getElementById("total").textContent =
    applications.length;

    document.getElementById("applied").textContent =
    applied;

    document.getElementById("interview").textContent =
    interview;

    document.getElementById("selected").textContent =
    selected;

    document.getElementById("rejected").textContent =
    rejected;

    const successRate =
    applications.length === 0
    ? 0
    : Math.round(
        (selected / applications.length) * 100
    );

    document.getElementById("successRate").textContent =
    successRate + "%";
}

function editApplication(index){

    const app = applications[index];

    const company =
    prompt("Company Name", app.company);

    const role =
    prompt("Role", app.role);

    if(company && role){

        app.company = company;
        app.role = role;

        saveData();
        displayApplications();
    }
}

function deleteApplication(index){

    applications.splice(index,1);

    saveData();

    displayApplications();
}

function changeStatus(index){

    const current =
    applications[index].status;

    if(current === "Applied"){
        applications[index].status =
        "Interview";
    }

    else if(current === "Interview"){
        applications[index].status =
        "Selected";
    }

    else if(current === "Selected"){
        applications[index].status =
        "Rejected";
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

function exportData(){

    const data =
    JSON.stringify(
        applications,
        null,
        2
    );

    const blob =
    new Blob(
        [data],
        {type:"application/json"}
    );

    const link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "careertrack-data.json";

    link.click();
}