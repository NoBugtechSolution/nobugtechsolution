function header() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main-header").innerHTML = this.responseText;
            content("Home",document.getElementById('home_page'))   
        }
    };
    xhttp.open("GET", "Common/Header.html", true);
    xhttp.send();
}

function footer() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main-footer").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "Common/Footer.html", true);
    xhttp.send();
}
header();
footer();
var prev=0
function content(page,object) {
    
    if(prev==0){prev=object;object.classList.add("select")}
    else{
        prev.classList.remove("select");
        object.classList.add("select")
        prev=object
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("content-body").innerHTML = this.responseText;
            if(page=="Home"){//Home Page doesn't need footer
                document.getElementById("main-footer").style.display="None";
                document.getElementById("content-body").style.height="90%";
                attachScrollListener();
                laptop_write()
                code_write()
            }else{
                document.getElementById("main-footer").style.display="flex";
                document.getElementById("content-body").style.height="85%";
            }
        }
    };
    xhttp.open("GET", "Pages/"+page+".html", true);
    xhttp.send();
}
function open_nav(){
    nav=document.getElementById("nav")
    icon=document.getElementById("menu_icon")
    if(nav.classList.contains("open")){
        icon.setAttribute("name", "menu-outline");
        nav.classList.remove("open")
    }else{
        nav.classList.add("open")
        icon.setAttribute("name", "close-sharp");
    }
}

function  code_write(){
    setTimeout(function() {
        var codeline = document.querySelectorAll("#code_lines");
        var total = codeline.length;
        if(total==0){
            laptop_write()
        }
        
        codeline.forEach(function(element, index) {
            setTimeout(function() {
                element.style.opacity = 1;
                if (index === total - 1) {
                     setTimeout(code_clean, 3000);
                }
            }, index * 100); 
        });
      }, 500);
}
function code_clean(codeline){
    var codeline = document.querySelectorAll("#code_lines");
    codeline.forEach(function(element) {
        element.classList.add("shutdown")
    });
    setTimeout(function() {
        codeline.forEach(function(element) {
            element.classList.remove("shutdown")
            element.style.opacity = 0;
        });
        code_write()
    }, 1000);
}
function laptop_write(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("laptop-welcome").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "Images/Laptop/svgs.html", true);
    xhttp.send();

}

let onCooldown = false;

function startCooldown() {
    onCooldown = true;
    setTimeout(() => {
        onCooldown = false;
    }, 1200); 
}


var scrollTimeout;
var prevScrollPos = 0;
data=0
function attachScrollListener() {
    var homeElement = document.getElementById("the-home");
    if (homeElement) {
        homeElement.addEventListener("scroll", function(event) {
            event.preventDefault(); 
            var currentScrollPos = this.scrollTop;
            var scrollDirection = currentScrollPos > prevScrollPos ? 0 : 1;
            prevScrollPos = currentScrollPos;
            if(data==0){
                scroller(scrollDirection,1)
                data=1;
                setTimeout(function() {
                   data=0
                }, 900);
            }
            
        });
    }
}


function scroller(way,object) {
    feat=document.getElementById("feabox")
    const mainContainer = document.getElementById('the-home');
    if(way==0){
            feat.classList.add("open")
        child = mainContainer.lastElementChild;
    }
    else{
            feat.classList.remove("open")
        child = mainContainer.firstElementChild;
    }
    if(object==0){
        mainContainer.scroll({
            behavior: 'smooth',
            top: child.offsetTop 
          });
    }
    
}

var selected_feature=0
function feature_select(object,nav){
    select_int=document.getElementById('feat-option'+selected_feature)
    select_int.style.backgroundColor="transparent";
    const mainContainer = document.getElementById('feabox');
    if(nav==0){
        if(selected_feature==0){
            selected_feature=2
        }
        else{
            selected_feature--;
        }
        
    }
    else{
        if(selected_feature==2){
            selected_feature=0
        }
        else{
            selected_feature++;
        }
    }
    select_int=document.getElementById('feat-option'+selected_feature)
    select_int.style.backgroundColor="#0fd6e3";
    firstchild = mainContainer.children[0];
    child = mainContainer.children[selected_feature];
    offset=child.offsetTop-firstchild.offsetTop;
    mainContainer.scrollTo({
        behavior: 'smooth',
        top: offset 
      });
}



