let error = document.querySelector('#error');
let dayLabel = document.querySelector('#day-label');
let dayInput = document.querySelector('#day-input');
let monthLabel = document.querySelector('#month-label');
let monthInput = document.querySelector('#month-input');
let yearLabel = document.querySelector('#year-label');
let yearInput = document.querySelector('#year-input');
let ageBtn = document.querySelector('#age-btn');
// Targeting important element


ageBtn.addEventListener('click',()=>{
    let day = dayInput.value;
    let month = monthInput.value;
    let year = yearInput.value;

    if(!day){
        dayInput.nextElementSibling.innerHTML = "This field is required"
        dayInput.style.border = '1px solid #e63f3fd2'
        dayLabel.style.color = '#e63f3fd2'
    }
    if (!month) {   
        monthInput.nextElementSibling.innerHTML = "This field is required"
        monthLabel.style.color = '#e63f3fd2'
        monthInput.style.border = '1px solid #e63f3fd2'
    }
    if(!year){
        yearInput.nextElementSibling.innerHTML = "This field is required"
        yearLabel.style.color = '#e63f3fd2'
        yearInput.style.border = '1px solid #e63f3fd2'
    }
    if(!day || !month || !year){
        return;
    }
// Calculations
    let dateProvided = new Date(year, month - 1, day);
    let currentDate = new Date();

    if(!(dateProvided.getFullYear() == year && dateProvided.getMonth() == month - 1 && dateProvided.getDate() == day) || dateProvided > currentDate || year < 0){
        error.style.display = 'block'
        dayInput.nextElementSibling.innerHTML = "Must be a Valid Date"
        dayInput.style.border = '1px solid #e63f3fd2'
        dayLabel.style.color = '#e63f3fd2'
        
        monthInput.nextElementSibling.innerHTML = ""
        monthInput.style.border = '1px solid #e63f3fd2'
        monthLabel.style.color = '#e63f3fd2'

        yearInput.nextElementSibling.innerHTML = ""
        yearInput.style.border = '1px solid #e63f3fd2'
        yearLabel.style.color = '#e63f3fd2'
        return;
       
    }
    

    // Setting the age
    let ageY = currentDate.getFullYear() - dateProvided.getFullYear();
    let ageM = 0
    let ageD = 0

    if(currentDate < new Date(currentDate.getFullYear(),month - 1 ,day)){
        ageY = ageY - 1
        ageM = currentDate.getMonth() + 1;
        ageD = currentDate.getDate();
    }else {
        if (currentDate.getMonth() + 1 === month) { 
          ageM = 0;
          ageD = currentDate.getDate() - day;
        } else {
          ageM = currentDate.getMonth() + 1 - month;
          if (currentDate.getDate() < day) {
            ageM = ageM - 1;
            ageD = currentDate.getDate() + new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate() - day;
          } else {
            ageD = currentDate.getDate() - day;
          }
        }
    }
    
    outputDay = document.querySelector('#age-day')
    outputMonth = document.querySelector('#age-month')
    outputYear = document.querySelector('#age-year')
    
    OutputAnims(outputYear, ageY);
    OutputAnims(outputMonth, ageM);
    OutputAnims(outputDay, ageD);

    function OutputAnims(el, num) {
        let step = 50;
        num > 25 && (step = 35);
        num > 50 && (step = 25);
        num > 75 && (step = 20);
        num > 100 && (step = 10);
        num > 200 && (step = 1);
    
        let n = 0;
        if (num === 0) {
          el.innerHTML = n;
        } else {
          let inteval = setInterval(() => {
            n = n + 1;
            if (n === num) {
              clearInterval(inteval);
            }
            el.innerHTML = n;
          }, step);
        }
      }
})


dayInput.addEventListener('input', function () {
    if(dayInput.nextElementSibling.innerHTML = "This field is required"){
        error.style.display = 'none'
        dayInput.style.border = '1px solid #808080'
        dayLabel.style.color = '#4d4d4d'
    }
    if (dayInput.value > 31) {
        error.style.display ='block'
        dayInput.nextElementSibling.innerHTML = "Must be a valid day";
    } else {
        error.style.display ='none'
        dayInput.nextElementSibling.innerHTML = "";
    }
  });
  
monthInput.addEventListener('input', function () {
    if(monthInput.nextElementSibling.innerHTML = "This field is required"){
        error.style.display = 'none'
        monthInput.style.border = '1px solid #808080'
        monthLabel.style.color = '#4d4d4d'
    }
    if (monthInput.value > 12) {
        error.style.display ='block'
        monthInput.nextElementSibling.innerHTML = "Must be a Month";
    } else {
        error.style.display ='none'
        monthInput.nextElementSibling.innerHTML = "";
    }
});

yearInput.addEventListener('input', function () {
    if(yearInput.nextElementSibling.innerHTML = "This field is required"){
        error.style.display = 'none'
        yearInput.style.border = '1px solid #808080'
        yearLabel.style.color = '#4d4d4d'
    }
   
    let dateData = new Date();

    if (yearInput.value > dateData.getFullYear()) {
        error.style.display ='block'
        yearInput.nextElementSibling.innerHTML = "Must be in the past";
    } else {
        error.style.display ='none'
        yearInput.nextElementSibling.innerHTML = "";
    }
});

yearInput.addEventListener('change', ()=>{
    let dateData = new Date();

    if(yearInput.value < 0){
        yearInput.value = -yearInput.value
        yearInput.value = dateData.getFullYear() - yearInput.value
    }
})