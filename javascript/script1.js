
// uers count

function updateUserCount() {
    $.ajax({
        url: "../php/get_user_count.php",
        method: "GET",
        success: function(data) {
            let currentCount = parseInt($("#user_count").text());
            let newCount = parseInt(data);

            if (newCount !== currentCount) {
                animateCount(currentCount, newCount);
            }
        }
    });
}
function animateCount(start, end) {
    $({ counter: start }).animate({ counter: end }, {
        duration: 800,
        easing: "swing",
        step: function (now) {
            $("#user_count").text(Math.ceil(now));
        }
    });
}

// Update every 3 seconds
setInterval(updateUserCount, 3000);
updateUserCount();

const images = [
    "../images/img1.jpg",
    "../images/img2_s.jpeg",
    "../images/img6.avif",
    "https://assets.change.org/photos/3/td/cz/pytdCZcRKwxmInH-1600x900-noPad.jpg?1589957690",
    "../images/image15.png",
    "../images/image8.png",
];

let currentIndex = 0;
const bannerElement = document.querySelector(".banner");

function changeBackgroundImage() {
    currentIndex = (currentIndex + 1) % images.length;
    bannerElement.style.backgroundImage = `url("${images[currentIndex]}")`;
}
setInterval(changeBackgroundImage, 5000);

function toggleDarkMode() {

    document.body.classList.toggle('dark-mode');
  
    const isDarkMode = document.body.classList.contains('dark-mode');

    let dark=document.body.style.backgroundColor = isDarkMode ? 'rgb(6, 2, 53)' : 'azure';
    document.body.style.color = isDarkMode ? '#ecf0f1' : '#333';

  }

  function toggleMenu() {
        const menu = document.getElementById("navMenu");
        if (menu.style.display === "block") {
          menu.style.display = "none";
        } else {
          menu.style.display = "block";
        }
      }

     
      function toggleMenu() {
            document.querySelector("nav ul").classList.toggle("active");
        }







// show reminder form
function showRemind(){
    document.getElementById('remind-form').style.display="flex";
    setTimeout(function(){
        document.getElementById('remind-form').classList.add('show');
    })
}


function closeRemindForm() {

    document.getElementById("remind-form").classList.remove("show");
    
    setTimeout(function() {
        document.getElementById("remind-form").style.display = "none";
    }, 300); 
} 

function handleFormSubmit1(event) {
    let get = document.getElementById("num").value;
   
    console.log(get);
  
    if(get.length<10){
        alert("please Enter 10 digit number!");
    }
    else{
    event.target.submit();
    event.target.reset();
    alert("Thank You for Reminder!");
    }
    event.preventDefault(); 
}



function showLoginForm() {
    document.getElementById("login-form").style.display = "flex";
    setTimeout(function() {
        document.getElementById("login-form").classList.add("show");

        const form = document.querySelector("#login-form form");
        if (form) {
            form.reset();
        }
    }, 10); 
}

function closeLoginForm() {

    document.getElementById("login-form").classList.remove("show");
    
    setTimeout(function() {
        document.getElementById("login-form").style.display = "none";
    }, 300); 
} 


function handleFormSubmit(event) {
    event.preventDefault(); 
    const name = document.getElementById("name").value;
    localStorage.setItem("name", name);
    event.target.submit();
    event.target.reset();

}


function showUserProfile() {
    const name = localStorage.getItem("name");
    let status = document.getElementById('s');
    let button = document.getElementById('sub');
    
    status.style.fontSize = '19px';
    status.style.color = 'blue';
    
    const totalDonations = parseInt(localStorage.getItem("totalDonations")) || 0;

    if (name) { 
        document.getElementById("profile-name").textContent = name;
        document.getElementById("result").textContent = `₹${totalDonations}`;
        
        const level = updateLevel(totalDonations);
        updateCircularProgress(totalDonations, level);

        let check = document.getElementById("profile-box").style.display = "flex";
        if (check === "") {
            status.innerText = "InActive";
        } else {
            status.innerText = "Active";
        }
    } else {
        alert("No user data found. Please register first.");
    }

    button.addEventListener('click', function(event) {
        console.log(localStorage.clear('totalDonations'));
    });
}

function closeUserProfile() {

    document.getElementById("profile-box").style.display = "none";

}

function updateLevel(totalDonations) {
    document.getElementById("level").style.color='Blue';
    let level = "Sprout";  

    if (totalDonations >= 200 && totalDonations <= 500) {
        level = "Advocate";  
    } else if (totalDonations > 500) {
        level = "Pioneer";  
    }

    
    document.getElementById("level").textContent = level;
   
    return level;

}

const totalLines = 100;

function updateCircularProgress(totalDonations, level) {
    const linesContainer = document.getElementById("lines-container");
    const levelLabel = document.getElementById("level-label");
    linesContainer.innerHTML = "";

    const thresholds = { sprout: 200, advocate: 500, max: 1000 }; 
    const sproutFill = Math.floor((thresholds.sprout / thresholds.max) * totalLines);
    const advocateFill = Math.floor((thresholds.advocate / thresholds.max) * totalLines);
    const fillLines = Math.min(Math.floor((totalDonations / thresholds.max) * totalLines), totalLines);

    for (let i = 0; i < totalLines; i++) {
        const line = document.createElement("div");
        line.classList.add("line");
        line.style.transform = `rotate(${(220 / totalLines) * i}deg)`;
        line.style.background = "white"; 

        if (i < fillLines) {
            if (i < sproutFill) {
                line.style.background = "rgb(3, 31, 193)"; 
            } else if (i < advocateFill) {
                line.style.background = "rgb(234, 0, 0)"; 
            } else {
                line.style.background = "rgb(9, 255, 0)"; 
            }
            line.style.boxShadow = `0 0 10px ${line.style.background}`;
        }

        linesContainer.appendChild(line);
    }

    
    levelLabel.textContent = level;

    
    if (level === "Pioneer") {
        linesContainer.style.animation = "pulse 2s infinite";
    } else {
        linesContainer.style.animation = "";
    }
}





//   Donatio box open
// const donateBtn = document.getElementById('donateBtn');
// const donateModal = document.getElementById('donateModal');
// const closeModal = document.getElementById('closeModal');


// donateBtn.addEventListener('click', () => {
//     donateModal.style.display = 'flex';
// });


// closeModal.addEventListener('click', () => {
//     donateModal.style.display = 'none';
// });

// Close Modal on Outside Click
window.addEventListener('click', (event) => {
    if (event.target === donateModal) {
        donateModal.style.display = 'none';
    }
});


    // Function to toggle dark mode
  

// level setup
let dnt=document.getElementById('result');
let level=document.getElementById('level');
if(dnt<40){
level.innerText=dnt;
}




























