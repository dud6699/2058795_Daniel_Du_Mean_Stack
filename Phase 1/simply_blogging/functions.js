//default blogs
init_blogs = () => {
    if (sessionStorage.getItem("blogs") == null) {
        let init_blogs = '[["Sample Soccer Blog","Filler paragraph text about the blog on soccer. There is an image on the right of a soccer ball.","https://cdn.pixabay.com/photo/2018/06/12/19/59/football-3471371_960_720.jpg"],["Sample Invalid Image","The image on the right is not a proper url that leads to an image.","not an image"]]';
        sessionStorage.setItem("blogs",JSON.stringify(init_blogs));
    }
}

//refresh blogs
get_blogs = () => {
    init_blogs();
    var output = "";
    var blogs = eval(JSON.parse(sessionStorage.getItem("blogs")));
    for (let i = 0; i< blogs.length; ++i){
        if (i % 3 == 0){
            output += '<div class="row">';
        }
        output += '<div class = "col-4"><div class="blog_space"><h2>'+blogs[i][0]+'</h2>';
        output += '<div class = "blog_content"><p>'+blogs[i][1]+"</p>"
        output += "<img src = "+blogs[i][2]+' alt="Invalid Image Link"></div></div></div>';
        if ((i+1) % 3 == 0){
            output += "</div>";
        }
        if ((blogs.length-1) % 3 == 0 && i == blogs.length-1){
            output += '<div class = "col-8"></div>';
        }
        else if ((blogs.length+1) % 3 == 0 && i == blogs.length-1){
            output += '<div class = "col"></div>';
        }
    }
    document.getElementById("blogs").innerHTML=output;
}

//add blog
add_blog = () => {
    var title = document.getElementById("title").value;
    var article = document.getElementById("article").value;
    var image = document.getElementById("image").value;

    var arr = eval(JSON.parse(sessionStorage.getItem("blogs")));
    arr.unshift([title,article,image]);
    sessionStorage.setItem("blogs",JSON.stringify(arr));

    get_blogs();
}