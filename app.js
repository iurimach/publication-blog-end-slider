

//

 
function playaddslide() {
  
  const imageForm = document.getElementById('imageForm');
  const imageInput = document.getElementById('imageInput');
  const deleteForm = document.getElementById('deleteForm');
  const imageCountDisplay = document.getElementById('imageCount');

  let storedImages = JSON.parse(localStorage.getItem('images')) || [];
  renderImages();

  imageForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const file = imageInput.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(event) {
              const imageSrc = event.target.result;
              storedImages.push(imageSrc);
              localStorage.setItem('images', JSON.stringify(storedImages));
              renderImages();
          }
          reader.readAsDataURL(file);
          function refreshPage() { //reflesh page--ატვირთვის შემდეგ არეფლშბს რო გამოჩდნეს ატვირტული
            location.reload();
          }
           refreshPage()
      }
  });

  deleteForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const deleteIndex = parseInt(document.getElementById('deleteIndex').value);
      if (!isNaN(deleteIndex) && deleteIndex >= 0 && deleteIndex < storedImages.length) {
          storedImages.splice(deleteIndex, 1);
          localStorage.setItem('images', JSON.stringify(storedImages));
          renderImages();
          function refreshPage() { //reflesh page--ატვირთვის შემდეგ არეფლშბს რო გამოჩდნეს ატვირტული
            location.reload();
          }
           refreshPage()
      } else {
          alert('Invalid index');
      }
  });

  function renderImages() {
    
      storedImages.forEach((imageSrc, index) => {
          const img = document.createElement('img');
          img.src = imageSrc;
          img.classList.add('box');
          slider.appendChild(img);
      });
      updateImageCount();
      
  }

  function updateImageCount() {
      imageCountDisplay.textContent = storedImages.length;
  }
}


function addImageToSlider(imageSrc) {
    const img = document.createElement('img');
    img.src = imageSrc;
    slider.appendChild(img);
}
playaddslide()



//default slide end add slide function აქ ორივეა რასაც დავამტებ იმასც დაატრიალებას სალიდერად
function  playdefaultslide() {
  const slider = document.querySelector(".slider");
  const boxes = document.querySelectorAll(".box");
  const boxWidth = boxes[0].offsetWidth;
  const visibleBoxes = 1;  // აქ წერ თავიდან რამდნი იტემი ჩანდეს 3 ზეა დეფულტდ აწყობილი, მე გადვაკეთ
  let currentIndex = 0;

  function moveSlider() {
    currentIndex = (currentIndex + 1) % boxes.length;
    // Calculate the transform value to show only the next three boxes
    const translateValue =- currentIndex * boxWidth;
    slider.style.transform = `translateX(${translateValue}px)`;
    // Update opacity to hide/show boxes
    boxes.forEach((box, index) => {
      if (index >= currentIndex && index < currentIndex + visibleBoxes) {
        box.style.opacity = 1;
      } else {
        box.style.opacity = 0;
      }
    });
  }
  // Automatically move the slider every 1 seconds (adjust as needed)
  setInterval(moveSlider,1000);
};
playdefaultslide()






