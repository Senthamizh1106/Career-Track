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

    if (company === "" || role === "") {
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

function saveData() {

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );
}

function getRemainingDays(deadline) {

    if (!deadline) return "";

    const today = new Date();

    const due = new Date(deadline);

    const diff = Math.ceil(
        (due - today) / (1000 * 60 * 60 * 24)
    );

    if (diff < 0) {

        return `
        <p class="deadline-warning">
            ❌ Deadline Passed
        </p>
        `;
    }

    return `
    <p class="deadline-safe">
        ⏳ ${diff} days left
    </p>
    `;
}

function displayApplications(data = applications) {

    const list =
    document.getElementById("applicationList");

    list.innerHTML = "";

    let applied = 0;
    let interview = 0;
    let selected = 0;
    let rejected = 0;

    data.forEach((app, index) => {

        if (app.status === "Applied") applied++;
        if (app.status === "Interview") interview++;
        if (app.status === "Selected") selected++;
        if (app.status === "Rejected") rejected++;

        list.innerHTML += `

        <div class="application-card">

            <h3>${app.company}</h3>

            <p>${app.role}</p>

            <span class="status">
                ${app.status}
            </span>

            ${getRemainingDays(app.deadline)}

            <p>
                <strong>Notes:</strong>
                ${app.notes || "No Notes"}
            </p>

            <br>

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

    const total = applications.length;

    const successRate =
    total === 0
        ? 0
        : Math.round((selected / total) * 100);

    document.getElementById("successRate").textContent =
    successRate + "%";
}

function deleteApplication(index) {

    applications.splice(index, 1);

    saveData();

    displayApplications();
}

function changeStatus(index) {

    let current =
    applications[index].status;

    if (current === "Applied") {

        applications[index].status =
        "Interview";
    }

    else if (current === "Interview") {

        applications[index].status =
        "Selected";
    }

    else if (current === "Selected") {

        applications[index].status =
        "Rejected";
    }

    else {

        applications[index].status =
        "Applied";
    }

    saveData();

    displayApplications();
}

function searchApplications() {

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

function filterApplications() {

    const filter =
    document.getElementById("filterStatus")
    .value;

    if (filter === "All") {

        displayApplications();
        return;
    }

    const filtered =
    applications.filter(app =>
        app.status === filter
    );

    displayApplications(filtered);
}