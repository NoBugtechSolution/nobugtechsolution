function header() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("main-header").innerHTML = this.responseText;
            content("Projects",document.getElementById('home_page'))   
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
var home=true;
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
                home=true;
                document.getElementById("main-footer").style.display="None";
                laptop_write()
                code_write()
                AssignObservers()
                
            }else{
                home=false;
                document.getElementById("main-footer").style.display="flex";
                document.getElementById("content-body").style.height="85%";
                const scripts = document.getElementById("content-body").getElementsByTagName("script");
                for (let script of scripts) {
                    const newScript = document.createElement("script");
                    newScript.src = script.src;
                    document.body.appendChild(newScript);
                }
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
    if(home==true){
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


function AssignObservers(){
    const objects = [];
    objects[0] = document.getElementById('feabox');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('open');
            }
            else{
                
                entry.target.classList.remove('open');
            
            }
        });
    });

    objects.forEach(element => {
        if (element) {
            observer.observe(element);
        }
    });
}




function scroller(way,object) {
    const mainContainer = document.getElementById('the-home');
    if(way==0){
        child = mainContainer.lastElementChild;
    }
    else{
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
    const offset = child.offsetLeft - firstchild.offsetLeft;

    mainContainer.scrollTo({
        behavior: 'smooth',
        left: offset
    });
}



