let plans = JSON.parse(
    localStorage.tripData ||
      '[["14:30","Check into The Lumiares"],["17:30","Sunset at Miradouro"],["20:00","Dinner at Taberna Sal Grosso"]]',
  ),
  tab = "Planner";
const save = () => (localStorage.tripData = JSON.stringify(plans));
document.body.innerHTML = `<style>*{box-sizing:border-box}body{margin:0;background:#f8f7f4;color:#1d2b3b;font:14px system-ui}.app{display:grid;grid-template-columns:245px 1fr;min-height:100vh}.side{background:#fff;border-right:1px solid #e7e1d8;padding:28px 15px}.logo{font-size:21px;font-weight:800}.logo span{color:#ed704a}.side button{border:0;background:none;width:100%;text-align:left;padding:13px;border-radius:7px;color:#667486}.side button.on{background:#fff0e9;color:#ad4b30;font-weight:bold}.main{padding:40px;max-width:1100px;width:100%;margin:auto}.top{display:flex;justify-content:space-between}.primary{border:0;border-radius:7px;background:#1d2b3b;color:white;padding:10px 14px;font-weight:700}.card{background:white;border:1px solid #e8e2d8;border-radius:14px;padding:23px;margin-top:20px}.timeline{border-left:2px solid #f0b39d;margin:20px 0;padding-left:23px}.plan{position:relative;padding:14px 0;border-bottom:1px solid #eee9e2;display:grid;grid-template-columns:65px 1fr 65px;gap:10px}.plan:before{content:'';position:absolute;left:-30px;top:20px;width:12px;height:12px;border-radius:50%;background:#ed704a}.plan button{border:0;border-radius:5px}.map{height:300px;background:linear-gradient(135deg,#d5e5dc,#d6c9b6);border-radius:12px;padding:22px}.pin{background:white;border-radius:6px;padding:8px;width:max-content;margin:20px 0 0 45%;box-shadow:0 2px 8px #0002}.budget{font-size:38px;font-weight:800;color:#536f9f}.bar{height:10px;background:#e4e9ee;border-radius:9px}.bar i{display:block;width:68%;height:100%;background:#536f9f;border-radius:9px}@media(max-width:650px){.app{grid-template-columns:1fr}.side{display:flex;overflow:auto;padding:10px}.side button{width:auto;white-space:nowrap}.main{padding:22px}}</style><div class="app"><aside class="side"><div class="logo">tripcanvas<span>●</span></div>${["Planner", "Map", "Budget", "Trips"].map((x) => `<button class="${x === tab ? "on" : ""}" onclick="route('${x}')">${x}</button>`).join("")}</aside><main class="main"><div class="top"><div><small>18–23 OCT · LISBON</small><h1>${tab}</h1></div><button class="primary" onclick="add()">+ Add plan</button></div><section id="app"></section></main></div>`;
function route(x) {
  tab = x;
  document
    .querySelectorAll(".side button")
    .forEach((b) => b.classList.toggle("on", b.textContent === x));
  render();
}
function render() {
  if (tab === "Planner")
    app.innerHTML = `<div class="card"><h2>Friday, 18 October</h2><div class="timeline">${plans.map((p, i) => `<div class="plan"><b>${p[0]}</b><strong contenteditable oninput="plans[${i}][1]=this.innerText;save()">${p[1]}</strong><button onclick="plans.splice(${i},1);save();render()">Delete</button></div>`).join("")}</div></div>`;
  if (tab === "Map")
    app.innerHTML = `<div class="card"><h2>Discover nearby places</h2><input style="padding:11px;width:100%" placeholder="Search restaurants, museums, stations" oninput="mapResult.textContent=this.value?'Showing places near: '+this.value:'Start searching'"><div class="map"><div id="mapResult" class="pin">Start searching</div><div class="pin" style="margin-left:15%">Hotel · 8 min</div></div></div>`;
  if (tab === "Budget")
    app.innerHTML = `<div class="card"><h2>Shared travel budget</h2><p class="budget">€612 <small style="font-size:14px">of €900</small></p><div class="bar"><i></i></div><p>Food €260 · Stay €280 · Experiences €72</p><button class="primary" onclick="alert('Expense entry opened — add this as your next backend feature.')">+ Add expense</button></div>`;
  if (tab === "Trips")
    app.innerHTML = `<div class="card"><h2>Your trips</h2><p><b>Lisbon, slowly.</b><br><small>Oct 18–23 · 2 travellers</small></p><button class="primary" onclick="route('Planner')">Open trip →</button></div>`;
}
function add() {
  const text = prompt("Add an itinerary item");
  if (text) {
    plans.push(["12:00", text]);
    save();
    tab = "Planner";
    render();
  }
}
render();
