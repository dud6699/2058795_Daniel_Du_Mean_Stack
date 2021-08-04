init_budgets = () => {
    if (sessionStorage.getItem("budgets") == null) {
        let init_budget = '[["Example Client 1","Example Project 1","12345"],["Example Client 2","Example Project 2","1000"]]';
        sessionStorage.setItem("budgets",JSON.stringify(init_budget));
    }
}

add_budget = () => {
    init_budgets();
    var client = document.getElementById("client").value;
    var project = document.getElementById("project").value;
    var budget = parseFloat(document.getElementById("budget").value);
    if (client.length == 0 || project.length == 0 || budget.length == 0){
        document.getElementById("msg").innerHTML="<p>All fields must be filled in</p>";
    }
    else if (isNaN(budget)){
        document.getElementById("msg").innerHTML="<p>Budget must be a number (No symbols)</p>";
    }
    else{
        var arr = eval(JSON.parse(sessionStorage.getItem("budgets")));
        arr.push([client,project,budget.toFixed(2)]);
        sessionStorage.setItem("budgets",JSON.stringify(arr));
        document.getElementById("msg").innerHTML="<p>Added new budget</p>";
    }
    
}

get_budget = () => {
    init_budgets();
    var output = "<table border=1><tr><td>Client Name</td><td>Project Name</td><td>Budget</td></tr>";
    var budget = eval(JSON.parse(sessionStorage.getItem("budgets")));
    var total = 0;
    for (let i = 0; i< budget.length; ++i){
        output += "<tr><td>"+budget[i][0]+"</td><td>"+budget[i][1]+"</td><td>$"+budget[i][2]+"</td></tr>";
        total += parseFloat(budget[i][2]);
    }
    output += '<tr><td colspan="2">Total</td><td>$'+total+"</td></tr>"
    output += "</table>";
    document.getElementById("tab").innerHTML=output;
}