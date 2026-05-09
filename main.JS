'use strict';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let href = this.getAttribute('href').substring(1);
            const scrollTarget = document.getElementById(href);
            if (!scrollTarget) return;

            const topOffset = 0; 
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    const nextImageTimeout = 4800; 
    const mainSlider = document.getElementById('slider');
    let sliderImagesArr = mainSlider.querySelectorAll('.slide-img');
    let currentImage = 0;
    const selectSlidePointsArr = [];
    let sliderTimeoutId;

    function showNextSlide() {
        selectSlidePointsArr[currentImage].classList.remove('active');

        if (currentImage < sliderImagesArr.length - 1) {
            currentImage++;
            sliderImagesArr[currentImage].style.opacity = 1;
        } else {
            currentImage = 0;
            sliderImagesArr.forEach((img, i) => {
                if (i > 0) img.style.opacity = 0;
            });
        }
        selectSlidePointsArr[currentImage].classList.add('active');
        sliderTimeoutId = setTimeout(showNextSlide, nextImageTimeout);
    }

    if (sliderImagesArr.length > 1) {
        const previousSlideBtn = document.createElement('div');
        previousSlideBtn.className = "slide-button previous";
        previousSlideBtn.innerHTML = "<";
        mainSlider.append(previousSlideBtn);

        const nextSlideBtn = document.createElement('div');
        nextSlideBtn.className = "slide-button next";
        nextSlideBtn.innerHTML = ">";
        mainSlider.append(nextSlideBtn);

        const selectSlideDiv = document.createElement('div');
        selectSlideDiv.className = "select-slide";
        mainSlider.append(selectSlideDiv);

        sliderImagesArr.forEach((el, index) => {
            const selectSlideBtn = document.createElement('div');
            selectSlideBtn.className = "select-slide-button";
            selectSlideBtn.index = index;

            selectSlideBtn.onclick = function(element) {
                clearTimeout(sliderTimeoutId);
                selectSlidePointsArr[currentImage].classList.remove('active');
                currentImage = element.target.index;
                selectSlidePointsArr[currentImage].classList.add('active');

                sliderImagesArr.forEach((img, i) => {
                    img.style.opacity = (i > currentImage) ? 0 : 1;
                });
                sliderTimeoutId = setTimeout(showNextSlide, nextImageTimeout);
            };

            selectSlidePointsArr.push(selectSlideBtn);
            selectSlideDiv.append(selectSlideBtn);
        });

        selectSlidePointsArr[currentImage].classList.add('active');

        previousSlideBtn.onclick = function() {
            clearTimeout(sliderTimeoutId);
            selectSlidePointsArr[currentImage].classList.remove('active');
            currentImage--;
            if (currentImage < 0) currentImage = sliderImagesArr.length - 1;
            selectSlidePointsArr[currentImage].classList.add('active');

            sliderImagesArr.forEach((img, i) => {
                img.style.opacity = (i > currentImage) ? 0 : 1;
            });
            sliderTimeoutId = setTimeout(showNextSlide, nextImageTimeout);
        };

        nextSlideBtn.onclick = function() {
            clearTimeout(sliderTimeoutId);
            showNextSlide();
        };

        sliderTimeoutId = setTimeout(showNextSlide, nextImageTimeout);
    }
});

const minuteMilliseconds = 1000 * 60
const hourMilliseconds = minuteMilliseconds * 60
const dayMilliseconds = hourMilliseconds * 24

//dadad//
const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

const startTime = Date.now()
const endTime = startTime + dayMilliseconds * 4

function updateDate() {
    let rest = endTime - Date.now()
    let days = Math.floor(rest / dayMilliseconds)
    rest -= days * dayMilliseconds
    let hours = Math.floor(rest / hourMilliseconds)
    rest -= hours * hourMilliseconds
    let minutes = Math.floor(rest / minuteMilliseconds)
    rest -= minutes * minuteMilliseconds
    let seconds = Math.ceil(rest / 1000)

    daysSpan.innerText = days
    hoursSpan.innerText = hours
    minutesSpan.innerText = formatTo00(minutes)
    secondsSpan.innerText = formatTo00(seconds)

    daysSpan.innerText = days;
    hoursSpan.innerText = hours;
    minutesSpan.innerText = formatTo00(minutes);
    secondsSpan.innerText = formatTo00(seconds);
}



function formatTo00(number) {
    if (number < 10) return '0' + number
    return number
}

setInterval(updateDate, 1000);
updateDate();

//al

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('formButton');
    
    const inputName = document.getElementById('formName');
    const inputPhone = document.getElementById('formPhone');
    const inputWishes = document.getElementById('formWishes');
    const inputAgreement = document.getElementById('formAgreement');

    button.addEventListener('click', (event) => {
        event.preventDefault(); 
        if (inputName.value.trim() === '' || 
            inputPhone.value.trim() === '' || 
            inputWishes.value.trim() === '' || 
            !inputAgreement.checked) {
            
            alert('Пожалуйста, заполните все поля и дайте согласие!');
            
        } else {
            alert(`Спасибо, ${inputName.value}! Ваша заявка отправлена.`);
            inputName.value = '';
            inputPhone.value = '';
            inputWishes.value = '';
        }
    });
});
