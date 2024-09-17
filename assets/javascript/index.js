$('#addListingBtn').click(() => {
  window.location.href = 'assets/pages/addListing.html'
})

// filter buttons func
$('#regioniBtn').click( () => {
  $('.regioniDropdown').toggle();
  $('.fasiDropdown').css('display', 'none');
  $('.fartobiDropdown').css('display', 'none');
  $('.sadzDropdown').css('display', 'none');
});

$('#fasiBtn').click(() =>  {
  $('.fasiDropdown').toggle();
  $('.regioniDropdown').css('display', 'none');
  $('.fartobiDropdown').css('display', 'none');
  $('.sadzDropdown').css('display', 'none');
});

$('#fartobiBtn').click(() =>  {
  $('.fartobiDropdown').toggle();
  $('.regioniDropdown').css('display', 'none');
  $('.fasiDropdown').css('display', 'none');
  $('.sadzDropdown').css('display', 'none');
});

$('#sadzBtn').click(() =>  {
  $('.sadzDropdown').toggle();
  $('.fasiDropdown').css('display', 'none');
  $('.fartobiDropdown').css('display', 'none');
  $('.regioniDropdown').css('display', 'none');
})

// prices func

let addMinPrice = (element)=>{
  let minPrice = $(element).data('value')
  $('#minPriceInput').val(minPrice);
}

let addMaxPrice = (element)=>{
  let maxPrice = $(element).data('value');
  $('#maxPriceInput').val(maxPrice);
}

// fartobi func
let addMinFartobi = (element)=>{
  let minFartobi = $(element).data('value')
  $('#minFartobiInput').val(minFartobi);
}

let addMaxFartobi = (element)=>{
  let maxFartobi = $(element).data('value');
  $('#maxFartobiInput').val(maxFartobi);
}

// get selected cities
let selectedRegionsString;

if(localStorage.getItem("selectedRegions") !== null){
  selectedRegionsString = localStorage.getItem("selectedRegions")
}else{
  selectedRegionsString = "[]"
}

const selectedRegions = new Set(JSON.parse(selectedRegionsString));


// modal func

$('#openModal').on('click', function() {
  $('#myModal').fadeIn();
});

$(window).on('click', (event) => {
  if ($(event.target).is('#myModal')) {
    $('#myModal').fadeOut();
  }
});


$('#closeModalBtn').on('click', () => {
  $('#myModal').fadeOut();
});

// agent image upload

$('#uploadImg').on('click', function() {
  $('#imageUpload').click();
});

$('#imageUpload').on('change', function() {
  const file = this.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    $('#previewImage').attr('src', e.target.result).show();
    $('#deleteImgBtn').show();
    $('.imgUploadDiv').css('border-color', '#808A93');
    $('#uploadImg').hide();
  };
  reader.readAsDataURL(file);
});

$('#deleteImgBtn').on('click', function() {
  $('.imgUploadDiv').css('border-color', 'red');
  $('#previewImage').empty();
  $('#imageUpload').val('');
  $('#previewImage').attr('src', '').hide();
  $('#deleteImgBtn').hide();
  $('#uploadImg').show();
});



// add agent validations

const form = $('#agentForm');
const submitBtn = $('#submitBtn');

let nameInput = $('#name');
let surnameInput = $('#surname');
let emailInput = $('#email');
let phoneInput = $('#phone');
let imgInput = $('#imageUpload');

let isNameValid;
let isSurnameValid;
let isEmailValid;
let isPhoneValid;
let isImageValid;

// name validation
let validateName = () => {
  if(nameInput.val().length === 0){
    $('#requiredName').css('color', 'red');
    nameInput.css('border-color', 'red');
    isNameValid=false;
  }else{
    $('#requiredName').css('color', 'green');
    nameInput.css('border-color', '#808A93');
    isNameValid=true;
  }
  if(nameInput.val().length < 2){
    $('#minName').css('color', 'red');
    nameInput.css('border-color', 'red');
    isNameValid = false;
  }else{
    $('#minName').css('color', 'green');
    nameInput.css('border-color', '#808A93');
    isNameValid=true;
  }
}

// surname validation
let validateSurname = ()=> {
  if(surnameInput.val().length === 0){
    $('#requiredSurname').css('color', 'red');
    surnameInput.css('border-color', 'red');
    isSurnameValid= false;
  }else{
    $('#requiredSurname').css('color', 'green');
    surnameInput.css('border-color', '#808A93');
    isSurnameValid= true;
  }
  if(surnameInput.val().length < 2){
    $('#minSurname').css('color', 'red');
    surnameInput.css('border-color', 'red');
    isSurnameValid= false;
  }else{
    $('#minSurname').css('color', 'green');
    surnameInput.css('border-color', '#808A93');
    isSurnameValid= true;
  }
}
// emal validation
let validateEmail = ()=> {
  if(emailInput.val().length === 0){
    $('#requiredEmail').css('color', 'red');
    emailInput.css('border-color', 'red');
    isEmailValid= false;
  }else{
    $('#requiredEmail').css('color', 'green');
    emailInput.css('border-color', '#808A93');
    isEmailValid= true;
  }
  if(!emailInput.val().endsWith('@redberry.ge')){
    $('#endEmail').css('color', 'red');
    emailInput.css('border-color', 'red');
    isEmailValid= false;
  }else{
    $('#endEmail').css('color', 'green');
    emailInput.css('border-color', '#808A93');
    isEmailValid= true;
  }
}

// phone validation
let validatePhone = ()=> {

  if(phoneInput.val().length === 0){
    $('#requiredPhone').css('color', 'red');
    phoneInput.css('border-color', 'red');
    isPhoneValid= false;
  }else{
    $('#requiredPhone').css('color', 'green');
    phoneInput.css('border-color', '#808A93');
    isPhoneValid= true;
  }

  if(/[^0-9]/.test(phoneInput.val()) || phoneInput.val().length === 0){
    $('#numericPhone').css('color', 'red');
    phoneInput.css('border-color', 'red');
    isPhoneValid= false;
  }else{
    $('#numericPhone').css('color', 'green');
    phoneInput.css('border-color', '#808A93');
    isPhoneValid= true;
  }

  if(phoneInput.val().length !== 9 || !phoneInput.val().startsWith('5') || /[^0-9]/.test(phoneInput.val())){
    $('#mobileFormatPhone').css('color', 'red');
    phoneInput.css('border-color', 'red');
    isPhoneValid= false;
  }else{
    $('#mobileFormatPhone').css('color', 'green');
    phoneInput.css('border-color', '#808A93');
    isPhoneValid= true;
  }

}

// image validation
let validateImage = ()=> {
  if(imgInput.val() === ''){
    $('.imgUploadDiv').css('border-color', 'red');
    isImageValid = false
  }else{
    $('.imgUploadDiv').css('border-color', '#808A93');
    isImageValid = true;
  }
}

nameInput.on('input', validateName);
surnameInput.on('input', validateSurname);
emailInput.on('input', validateEmail);
phoneInput.on('input', validatePhone);

let isFormValid = ()=>{
  validateName();
  validateSurname();
  validateEmail();
  validatePhone();
  validateImage();
  return isNameValid && isSurnameValid && isEmailValid && isPhoneValid && isImageValid;
}

// post agent
$('#agentForm').on('submit', function(event) {
  event.preventDefault(); 

  if(isFormValid()){
    const formData = new FormData(this);
    const token = '9cfbfa11-2b4d-4396-9ac7-b8c3770ebb44';
  
    $.ajax({
      url: 'https://api.real-estate-manager.redberryinternship.ge/api/agents',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      success: function(response) {
        console.log('Success:', response);
      },
      error: function(xhr, status, error) {
        console.error('Error:', error);
      }
    });
    
  }

});


//get all regions

$.ajax({
  url: 'https://api.real-estate-manager.redberryinternship.ge/api/regions',
  type: 'GET',
  success: function(data) {
    let regions = data;
    regions.forEach(item => {
      let newLi = $(`<li><input data-region type="checkbox" id="${item.name}" name="${item.name}"><label for="${item.name}">${item.name}</label>`);
      $('ul').append(newLi)
        if(selectedRegions.has(item.name)){
          const inputId = `#${item.name}`
          $(inputId).prop('checked', true)
        }
      })
      $('input[data-region]').change(e => {
        if(e.target.checked){
          selectedRegions.add(e.target.name)
        }else{
          selectedRegions.delete(e.target.name)
        }
        localStorage.setItem('selectedRegions', JSON.stringify([...selectedRegions])) 
      })

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Error:', textStatus, errorThrown);
    }
});
