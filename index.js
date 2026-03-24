 const nohis = document.getElementById("noHis")


 function addProcess(){

let table = document.getElementById("processTable");

let row = table.insertRow();

let count = table.rows.length -1;

row.innerHTML = `<td>P${count}</td>
<td><input type="number" value=""></td>
<td><input type="number" value=""></td>
`;

}
const runScheduling = () => {

let rows = document.querySelectorAll("table tr");
let processes = [];

// READ PROCESS DATA
rows.forEach((row, index) => {

if(index === 0) return;

let arrival = row.children[1].children[0].value;
let burst = row.children[2].children[0].value;

processes.push({
id: "P"+index,
arrival: parseInt(arrival),
burst: parseInt(burst)
});

});


// ---------- FCFS ----------
let fcfs = [...processes].sort((a,b)=>a.arrival-b.arrival);

let time = 0;
let totalWaitFCFS = 0;

fcfs.forEach(p => {

if(time < p.arrival) time = p.arrival;

let wait = time - p.arrival;

totalWaitFCFS += wait;

time += p.burst;

});

let avgFCFS = (totalWaitFCFS / fcfs.length).toFixed(2);


// ---------- SJF ----------
let sjf = [...processes].sort((a,b)=>a.burst-b.burst);

time = 0;
let totalWaitSJF = 0;

sjf.forEach(p => {

if(time < p.arrival) time = p.arrival;

let wait = time - p.arrival;

totalWaitSJF += wait;

time += p.burst;

});

let avgSJF = (totalWaitSJF / sjf.length).toFixed(2);


// ---------- ROUND ROBIN ----------
let quantum = 2;

let rr = JSON.parse(JSON.stringify(processes));

let queue = [];
let currentTime = 0;
let totalWaitRR = 0;

rr.forEach(p=>{
p.remaining = p.burst;
p.finish = 0;
});

queue = [...rr];

while(queue.length > 0){

let p = queue.shift();

if(p.remaining > quantum){

currentTime += quantum;
p.remaining -= quantum;
queue.push(p);

}else{

currentTime += p.remaining;
p.remaining = 0;
p.finish = currentTime;

let wait = p.finish - p.arrival - p.burst;
totalWaitRR += wait;

}

}

let avgRR = (totalWaitRR / rr.length).toFixed(2);


// ---------- DISPLAY RESULT ----------

document.querySelectorAll("li")[0].innerText =
"FCFS Avg Waiting Time : " + avgFCFS;

document.querySelectorAll("li")[1].innerText =
"SJF Avg Waiting Time : " + avgSJF;

document.querySelectorAll("li")[2].innerText =
"Round Robin Avg Waiting Time : " + avgRR;


// ---------- BEST ALGORITHM ----------

let best = Math.min(avgFCFS,avgSJF,avgRR);

let bestAlgo = "";

if(best == avgFCFS) bestAlgo = "FCFS";
else if(best == avgSJF) bestAlgo = "SJF";
else if(best == avgRR)  bestAlgo = "Round Robin";
else bestAlgo = "No Match Found";

document.querySelector(".algo").innerText =
"⭐ Best Algorithm : " + bestAlgo;
// ---------- HISTORY STORE ----------
let historyDiv = document.getElementById("his");
let nohis = document.getElementById("noHis");

// "No History Found" hide
if (nohis) {
    nohis.style.display = "none";
}

// Count runs
let runCount = historyDiv.children.length + 1;

// Create new entry
let newEntry = document.createElement("p");

newEntry.innerText =
`Run ${runCount} : Processes ${processes.length} → Best ${bestAlgo} (F:${avgFCFS}, S:${avgSJF}, RR:${avgRR})`;

// Add to history
historyDiv.appendChild(newEntry);

};

 const clearHistory = ()=>{
    // document.getElementById("his").innerHTML = "NO RESULT FOUND!!";   
    location.reload();
};
const clearProcess = () => {

    // ---------- CLEAR TABLE ----------
    let rows = document.querySelectorAll("#processTable tr");

    rows.forEach((row, index) => {
        if (index === 0) return;

        row.children[1].children[0].value = "";
        row.children[2].children[0].value = "";
    });

    // ---------- CLEAR RESULTS ----------
    let list = document.querySelectorAll("li");

    list[0].innerText = "FCFS Avg Waiting Time :";
    list[1].innerText = "SJF Avg Waiting Time :";
    list[2].innerText = "Round Robin Avg Waiting Time :";

    // ---------- CLEAR BEST ----------
    document.querySelector(".algo").innerText =
        "⭐ Best Algorithum :";

};





