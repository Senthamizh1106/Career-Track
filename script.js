let applications = [];

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

    displayApplications();

    document.getElementById("company").value = "";
    document.getElementById("role").value = "";
}

function displayApplications(){

    const list =
    document.getElementById("applicationList");

    list.innerHTML = "";

    let applied = 0;
    let interview = 0;
    let selected = 0;

    applications.forEach((app,index)=>{

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

            <br>

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

    displayApplications();
}