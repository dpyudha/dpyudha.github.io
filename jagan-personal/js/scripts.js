//libraries like jquery etc
//main.js file
const { barba } = window;
barba.hooks.afterEnter(() => {
  console.log("ASdas")
  popupInit();
  siriWave();
  selectInit();
  toggleSwitchMusic();
});



barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter(data) {
        // update the menu based on user navigation
        // menu.update();
        gsap.set(".home-title", {
          y: 10,
          opacity: 0,
        });
      },
      afterEnter() {
        // refresh the parallax based on new page content
        gsap.to(".home-title", {
          y: 0,
          opacity: 1,
          duration: 0.1,
          ease: Power2.easeInOut,
        });

        checkToggleMusic()

        

      },
    },
    {
      namespace: "blog",
      beforeEnter(data) {
        console.log("blog")
        gsap.set(".blog-item",{
          y: 10,
          opacity:0
        })
        gsap.set(".illustration",{
          x: 10,
          opacity:0
        })

        selectInit();
        gsap.to(".blog-item,.illustration",{
          y: 0,
          x:0,
          opacity:1,
          ease: Power2.easeInOut,
          duration: .2
        })
      },
      afterEnter(data) {
        console.log("after enter")
        gsap.to(".blog-item,.illustration",{
          y: 0,
          x:0,
          opacity:1,
          ease: Power2.easeInOut,
          duration: .2
        })
      }
    }
  ],
  // transitions: [
  //   {
  //     name: "opacity-transition",
  //     leave(data) {
  //       return gsap.to(data.current.container, {
  //         opacity: 0,
  //         left:100
  //       });
  //     },
  //     enter(data) {
  //       return gsap.from(data.next.container, {
  //         opacity: 0,
  //         left:100
  //       });
  //     },
  //   },
  // ],
});

function popupInit() {
  var popupBtn = document.querySelector(".btn-popup-close");
  popupBtn.addEventListener("click", () => {
    hidePopup();
  });

  var popupBtn = document.querySelector(".popup-toggle");
  popupBtn.addEventListener("click", () => {
    showPopup();
  });
  
}

function hidePopup() {
  gsap.to(".popup", {
    duration: 0.5,
    y: 20,
    opacity: 0,
    ease: Power2.easeInOut,
    onComplete: () => {
      gsap.set(".popup", {
        display: "none",
      });
    },
  });
}

function showPopup() {
  gsap.to(".popup", {
    duration: 0.5,
    y: 0,
    opacity: 1,
    display: "block",
    ease: Power2.easeInOut,
  });
}

function siriWave() {
  new SiriWave({
    container: document.getElementById("wave"),
    width: 280,
    height: 84,
    amplitude: 1.5,
    color: "#342E3C",
    frequency: "16",
    autostart: true,
    curveDefinition: [{ attenuation: 1, lineWidth: 3, opacity: 1 }],
  });
}

function selectInit() {
  let selectToggles = document.querySelectorAll(".select--toggle")
  selectToggles.forEach(function(select){
    select.addEventListener("click",function() {
      console.log(this)
      var parent = this.parentNode,
      isActive = parent.classList.contains("active")

      document.querySelectorAll(".select").forEach(elem => elem.classList.remove("active"))
      if ( !isActive ) {
        parent.classList.add("active")
      } 
      
    })
  })

  let selectValue = document.querySelectorAll(".select--options > li")
  selectValue.forEach(function(select) {
    select.addEventListener("click",function() { 
      var parent = this.parentNode.parentNode
      var value = this.getAttribute("data-value")
      // console.log(value,parent.querySelector(""))

      parent.querySelector(".select--value").innerHTML = value
      setTimeout(()=> {
        parent.classList.remove("active")
      },100)
    })
  })
  console.log(selectValue)
  // selects.map(select => {
  //   console.log(select)
  // })
}

function toggleSwitchMusic() {
  console.log("toggle")
  var toggle = document.getElementById("music")
  if ( toggle ) {
    toggle.addEventListener("change", () => {
      localStorage.setItem("music", true)
    })
  }
}

function checkToggleMusic() {
  var isToggled = localStorage.getItem("music")

  if ( isToggled ) {
    gsap.set(".popup", {
      duration: 0.5,
      opacity: 0,
      display: "none"
    });
  }
}