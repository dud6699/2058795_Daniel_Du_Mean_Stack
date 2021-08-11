let product_list:any = [["Flashlight",12],["Screwdriver",10],["Bucket",15],["Hammer",25],["Saw",30],["Paintbrush",15],["Hat",22],["Sunglasses",24],["Batteries",5]];

function init_cart(){
    if (sessionStorage.getItem("cart") == null){
        let cart:number[] = [];
        sessionStorage.setItem("cart",JSON.stringify(cart));
    }
}

function update_cart(){
    init_cart();
    let cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    let output = '<h2>Cart Size: ';
    output += cart.length;
    output += "</h2>";
    document.getElementById("cart").innerHTML=output;
}

function add_item(num:number){
    init_cart();
    let cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    cart.push(num);
    sessionStorage.setItem("cart",JSON.stringify(cart));
    update_cart();
}

function getSet(value, index, self) {
    return self.indexOf(value) === index;
}

function fill_checkout(){
    let output = "";
    let cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    let unique:number[] = cart.filter(getSet);
    let total = 0;
    unique.forEach(element => {
        let quantity = get_quantity(element,cart);
        output += '<div class="row"><div class="col"><p>'+product_list[element][0]+"</p></div>";
        output += '<div class="col"><p>'+quantity+"</p></div>";
        output += '<div class="col"><p>$'+(quantity*product_list[element][1])+"</p></div></div>";
        total += quantity*product_list[element][1];
    });
    output += '<div class="row"><div class="col-8"><p>Total</p></div><div class="col"><p>$'+total+"</p></div></div>";
    document.getElementById("checkout").innerHTML=output;
}


function get_quantity(item:number, arr:number[]){
    let count = 0;
    arr.forEach(element => {
        if (item == element){
            count ++;
        }
    });
    return count;
}

