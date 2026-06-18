/* =========================
   LOCAL STORAGE DATABASE
========================= */

let users =
JSON.parse(localStorage.getItem("users")) || [];

let patients =
JSON.parse(localStorage.getItem("patients")) || [];

let appointments =
JSON.parse(localStorage.getItem("appointments")) || [];

let prescriptions =
JSON.parse(localStorage.getItem("prescriptions")) || [];

let accounts =
JSON.parse(localStorage.getItem("accounts")) || [];

/* SAVE DATABASE */

function saveData(){

localStorage.setItem(
"users",
JSON.stringify(users)
);

localStorage.setItem(
"patients",
JSON.stringify(patients)
);

localStorage.setItem(
"appointments",
JSON.stringify(appointments)
);

localStorage.setItem(
"prescriptions",
JSON.stringify(prescriptions)
);

localStorage.setItem(
"accounts",
JSON.stringify(accounts)
);

}

let registerMode = false;

/* =========================
   TOGGLE LOGIN / REGISTER
========================= */

function toggleAuth(){

registerMode = !registerMode;

const title =
document.getElementById("authTitle");

const button =
document.getElementById("authButton");

const fields =
document.getElementById("registerFields");

const switchText =
document.getElementById("switchText");

const switchLink =
document.getElementById("switchLink");

if(registerMode){

title.innerText = "Register";

button.innerText = "Create Account";

button.setAttribute(
"onclick",
"register()"
);

fields.style.display = "block";

switchText.innerText =
"Already have an account?";

switchLink.innerText = "Login";

}else{

title.innerText = "Login";

button.innerText = "Login";

button.setAttribute(
"onclick",
"login()"
);

fields.style.display = "none";

switchText.innerText =
"Don't have an account?";

switchLink.innerText = "Register";
}
}

/* =========================
   REGISTER
========================= */

function register(){

const fullName =
document.getElementById("fullName").value;

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

const role =
document.getElementById("role").value;

const pattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(
fullName === "" ||
email === "" ||
password === ""
){
alert("Complete all fields");
return;
}

if(!pattern.test(email)){
alert("Enter valid email");
return;
}

/* CHECK ACCOUNT */

const exists =
accounts.find(
acc => acc.email === email
);

if(exists){
alert("Account already exists");
return;
}

/* SAVE ACCOUNT */

accounts.push({
fullName,
email,
password,
role
});

/* SAVE TO DATABASE */

saveData();

alert(
"Registration successful. You can now login."
);

document.getElementById("fullName").value = "";
document.getElementById("email").value = "";
document.getElementById("password").value = "";

toggleAuth();
}

/* =========================
   LOGIN
========================= */

function login(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

/* FIND ACCOUNT */

const user = accounts.find(
acc =>
acc.email === email &&
acc.password === password
);

if(!user){
alert(
"Invalid account. Please register first."
);
return;
}

alert("Welcome " + user.fullName);

document.getElementById("loginPage")
.style.display = "none";

document.getElementById("app")
.style.display = "block";
}

/* =========================
   LOGOUT
========================= */

function logout(){

document.getElementById("app")
.style.display = "none";

document.getElementById("loginPage")
.style.display = "flex";

document.getElementById("email").value = "";
document.getElementById("password").value = "";
}

/* =========================
   NAVIGATION
========================= */

function show(id){

document.querySelectorAll(".section")
.forEach(section=>{
section.classList.remove("active");
});

document.getElementById(id)
.classList.add("active");
}

/* =========================
   USERS
========================= */

function addUser(){

const name =
document.getElementById("userName").value;

const role =
document.getElementById("userRole").value;

if(name === ""){
alert("Enter user name");
return;
}

users.push({
name,
role
});

/* SAVE DATABASE */

saveData();

renderUsers();
updateDashboard();

document.getElementById("userName").value = "";
}

function renderUsers(){

const table =
document.getElementById("userTable");

table.innerHTML = "";

users.forEach((user,index)=>{

table.innerHTML += `
<tr>
<td>${user.name}</td>
<td>${user.role}</td>
<td>
<button class="delete-btn"
onclick="deleteUser(${index})">
Delete
</button>
</td>
</tr>
`;

});
}

function deleteUser(index){

users.splice(index,1);

/* SAVE DATABASE */

saveData();

renderUsers();
updateDashboard();
}

/* =========================
   PATIENTS
========================= */

function savePatient(){

const firstName =
document.getElementById("patientFirstName").value;

const lastName =
document.getElementById("patientLastName").value;

const gender =
document.getElementById("patientGender").value;

const phone =
document.getElementById("patientPhone").value;

if(
firstName === "" ||
lastName === ""
){
alert("Enter patient details");
return;
}

patients.push({
firstName,
lastName,
gender,
phone
});

/* SAVE DATABASE */

saveData();

renderPatients();
updateDashboard();

document.getElementById("patientFirstName").value = "";
document.getElementById("patientLastName").value = "";
document.getElementById("patientPhone").value = "";
}

function renderPatients(){

const table =
document.getElementById("patientTable");

table.innerHTML = "";

patients.forEach((patient,index)=>{

table.innerHTML += `
<tr>
<td>${patient.firstName}</td>
<td>${patient.lastName}</td>
<td>${patient.gender}</td>
<td>${patient.phone}</td>
<td>
<button class="delete-btn"
onclick="deletePatient(${index})">
Delete
</button>
</td>
</tr>
`;

});
}

function deletePatient(index){

patients.splice(index,1);

/* SAVE DATABASE */

saveData();

renderPatients();
updateDashboard();
}

/* =========================
   APPOINTMENTS
========================= */

function saveAppointment(){

const patient =
document.getElementById("appointmentPatient").value;

const date =
document.getElementById("appointmentDate").value;

const time =
document.getElementById("appointmentTime").value;

if(patient === ""){
alert("Enter patient");
return;
}

appointments.push({
patient,
date,
time
});

/* SAVE DATABASE */

saveData();

renderAppointments();
updateDashboard();

document.getElementById("appointmentPatient").value = "";
}

function renderAppointments(){

const table =
document.getElementById("appointmentTable");

table.innerHTML = "";

appointments.forEach((appointment,index)=>{

table.innerHTML += `
<tr>
<td>${appointment.patient}</td>
<td>${appointment.date}</td>
<td>${appointment.time}</td>
<td>
<button class="delete-btn"
onclick="deleteAppointment(${index})">
Delete
</button>
</td>
</tr>
`;

});
}

function deleteAppointment(index){

appointments.splice(index,1);

/* SAVE DATABASE */

saveData();

renderAppointments();
updateDashboard();
}

/* =========================
   PRESCRIPTIONS
========================= */

function savePrescription(){

const patientId =
document.getElementById("prescriptionPatient").value;

const doctorId =
document.getElementById("prescriptionDoctor").value;

const medication =
document.getElementById("prescriptionMedication").value;

if(patientId === ""){
alert("Enter patient ID");
return;
}

prescriptions.push({
patientId,
doctorId,
medication
});

/* SAVE DATABASE */

saveData();

renderPrescriptions();

document.getElementById("prescriptionPatient").value = "";

document.getElementById("prescriptionDoctor").value = "";

document.getElementById("prescriptionMedication").value = "";
}

function renderPrescriptions(){

const table =
document.getElementById("prescriptionTable");

table.innerHTML = "";

prescriptions.forEach((prescription,index)=>{

table.innerHTML += `
<tr>
<td>${prescription.patientId}</td>
<td>${prescription.doctorId}</td>
<td>${prescription.medication}</td>
<td>
<button class="delete-btn"
onclick="deletePrescription(${index})">
Delete
</button>
</td>
</tr>
`;

});
}

function deletePrescription(index){

prescriptions.splice(index,1);

/* SAVE DATABASE */

saveData();

renderPrescriptions();
}

/* =========================
   DASHBOARD
========================= */

function updateDashboard(){

document.getElementById("uCount")
.innerText = users.length;

document.getElementById("pCount")
.innerText = patients.length;

document.getElementById("aCount")
.innerText = appointments.length;
}

/* =========================
   LOAD SAVED DATA
========================= */

renderUsers();
renderPatients();
renderAppointments();
renderPrescriptions();
updateDashboard();

/* =========================
   CHARTS
========================= */

new Chart(
document.getElementById("barChart"),
{
type:"bar",
data:{
labels:[
"Mon",
"Tue",
"Wed",
"Thu",
"Fri"
],
datasets:[{
data:[30,50,70,40,60],
backgroundColor:"#1e5eff"
}]
},
options:{
responsive:true,
plugins:{
legend:{display:false}
}
}
}
);

new Chart(
document.getElementById("pieChart"),
{
type:"doughnut",
data:{
labels:[
"Cardio",
"Neuro",
"Ortho"
],
datasets:[{
data:[40,30,30],
backgroundColor:[
"#1e5eff",
"#ff3b3b",
"#4caf50"
]
}]
},
options:{
responsive:true,
plugins:{
legend:{
position:"bottom"
}
}
}
}
);

new Chart(
document.getElementById("lineChart"),
{
type:"line",
data:{
labels:[
"Jan",
"Feb",
"Mar",
"Apr",
"May"
],
datasets:[{
data:[10,20,15,30,25],
borderColor:"#1e5eff",
backgroundColor:
"rgba(30,94,255,0.2)",
fill:true,
tension:0.3
}]
},
options:{
responsive:true
}
}
);