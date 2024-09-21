let isNameValid;
let isSurnameValid;
let isEmailValid;
let isPhoneValid;
let isImageValid;

$('#addListingBtn').click(() => {
  window.location.href = 'assets/pages/addListing.html'
})


// filter buttons func
$('#regioniBtn').click( () => {
  $('.regioniDropdown').toggle();
  $('.fasiDropdown').css('display', 'none');
  $('.fartobiDropdown').css('display', 'none');
  $('.sadzDropdown').css('display', 'none');
  $('#regioniBtn').toggleClass('active');
  
  $('#fasiBtn').removeClass('active');
  $('#fartobiBtn').removeClass('active');
  $('#sadzBtn').removeClass('active');
});

$('#fasiBtn').click(() =>  {
  $('.fasiDropdown').toggle();
  $('.regioniDropdown').css('display', 'none');
  $('.fartobiDropdown').css('display', 'none');
  $('.sadzDropdown').css('display', 'none');
  $('#fasiBtn').toggleClass('active');
  
  $('#regioniBtn').removeClass('active');
  $('#fartobiBtn').removeClass('active');
  $('#sadzBtn').removeClass('active');
});

$('#fartobiBtn').click(() =>  {
  $('.fartobiDropdown').toggle();
  $('.regioniDropdown').css('display', 'none');
  $('.fasiDropdown').css('display', 'none');
  $('.sadzDropdown').css('display', 'none');
  $('#fartobiBtn').toggleClass('active');

  $('#regioniBtn').removeClass('active');
  $('#fasiBtn').removeClass('active');
  $('#sadzBtn').removeClass('active');
});

$('#sadzBtn').click(() =>  {
  $('.sadzDropdown').toggle();
  $('.fasiDropdown').css('display', 'none');
  $('.fartobiDropdown').css('display', 'none');
  $('.regioniDropdown').css('display', 'none');
  $('#sadzBtn').toggleClass('active');
  
  $('#regioniBtn').removeClass('active');
  $('#fasiBtn').removeClass('active');
  $('#fartobiBtn').removeClass('active');

})

// prices func

let addMinPrice = (element)=>{
  let minPrice = $(element).data('value')
  $('#minPriceInput').val(minPrice);
  localStorage.setItem('minPrice', $('#minPriceInput').val())
}

let addMaxPrice = (element)=>{
  let maxPrice = $(element).data('value');
  $('#maxPriceInput').val(maxPrice);
  localStorage.setItem('maxPrice', $('#maxPriceInput').val())
}

// area func
let addMinFartobi = (element)=>{
  let minFartobi = $(element).data('value')
  $('#minFartobiInput').val(minFartobi);
  localStorage.setItem('minArea', $('#minFartobiInput').val())
}

let addMaxFartobi = (element)=>{
  let maxFartobi = $(element).data('value');
  $('#maxFartobiInput').val(maxFartobi);
  localStorage.setItem('maxArea', $('#maxFartobiInput').val())
}



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

let locStrgImg = localStorage.getItem('agentImg');
if(locStrgImg ){
  $('#previewImage').attr('src', locStrgImg).show();
  $('#deleteImgBtn').show();
  $('.imgUploadDiv').css('border-color', '#808A93');
  $('#uploadImg').hide();
  
}

$('#uploadImg').on('click', function() {
  $('#imageUpload').click();
});

$('#imageUpload').on('change', function() {
  const file = this.files[0];
  const maxSizeInBytes = 1 * 1024 * 1024;
  
  if(file.size > maxSizeInBytes || !file.size ){
    $('.imgUploadDiv').css('border-color', 'red');
    $('#imageUpload').val('');
    isImageValid = false;
    return
  }else{
    $('.imgUploadDiv').css('border-color', '#808A93');
    isImageValid = true;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    $('#previewImage').attr('src', e.target.result).show();
    $('#deleteImgBtn').show();
    $('.imgUploadDiv').css('border-color', '#808A93');
    $('#uploadImg').hide();
    
    
    localStorage.setItem('agentImg', e.target.result)
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
  localStorage.setItem('agentImg', '')
});



// agent validations

const form = $('#agentForm');
const submitBtn = $('#submitBtn');

let nameInput = $('#name');
let surnameInput = $('#surname');
let emailInput = $('#email');
let phoneInput = $('#phone');
let imgInput = $('#imageUpload');


// get data from localstorage

nameInput.val(localStorage.getItem('agentName'));
surnameInput.val(localStorage.getItem('agentSurname'));
emailInput.val(localStorage.getItem('agentEmail'));
phoneInput.val(localStorage.getItem('agentPhone'));

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
  localStorage.setItem('agentName', nameInput.val())
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
  localStorage.setItem('agentSurname', surnameInput.val())
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
  localStorage.setItem('agentEmail', emailInput.val())
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
  
  localStorage.setItem('agentPhone', phoneInput.val());
}

// image validation
let validateImage = ()=> {
  
  if(imgInput.val().length === 0){
    $('.imgUploadDiv').css('border-color', 'red');
    isImageValid = false
  }else{
    $('.imgUploadDiv').css('border-color', '#808A93');
    isImageValid = true;
  }
  
  localStorage.setItem('agentImg', imgInput.val());
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
        $('.imgUploadDiv').css('border-color', 'red');
        $('#previewImage').empty();
        $('#imageUpload').val('');
        $('#previewImage').attr('src', '').hide();
        $('#deleteImgBtn').hide();
        $('#uploadImg').show();
        localStorage.setItem('agentImg', '');
        
        $('#agentForm').find('input').val('');
        $('.imgUploadDiv').css('border-color', '#808A93');
        $('#agentForm').find('span').css('color', '#808A93');
        localStorage.setItem('agentName', '');
        localStorage.setItem('agentEmail', '');
        localStorage.setItem('agentSurname', '');
        localStorage.setItem('agentPhone', '');
      },
      error: function(xhr, status, error) {
        console.error('Error:', error);
      }
    });
    
  }
  
});


/////////////////



// get selected cities
let selectedRegionsString;

if(localStorage.getItem("selectedRegions") !== null){
  selectedRegionsString = localStorage.getItem("selectedRegions")
}else{
  selectedRegionsString = "[]"
}

const selectedRegions = new Set(JSON.parse(selectedRegionsString));


// append realestates in div
let appendRealEstateData = (data)=>{

  $('.realEstatesList').empty();

  data.forEach(item => {

    let isRentalText = item.is_rental === 0 ? 'იყიდება' : 'ქირავდება';

    $('.realEstatesList').append(`
      <div class="realEstateCard" data-id="${item.id}">
        <img class="realEstateImg" src="${item.image}" alt="">
        <p class="realEstatePrice">${item.price} ₾</p>
        <div class="isRentalDiv">${isRentalText}</div>
        <img class="addressSvg" src="/assets/images/addressSvg.svg" alt="">
        <p class="addressText inputSpan">${item.address}</p>
        <img class="bedroomSvg" src="/assets/images/bed.svg" alt="">
        <p class="bedroomText inputSpan">${item.bedrooms}</p>
        <img class="areaSvg" src="/assets/images/area.svg" alt="">
        <p class="areaText inputSpan">${item.area} მ²</p>
        <img class="zipCodeSvg" src="/assets/images/zipCode.svg" alt="">
        <p class="zipCodeText inputSpan">${item.zip_code}</p>
      </div>
  `);
})
}

// get all real estates

let getRealEstates = 
  $.ajax({
  url: 'https://api.real-estate-manager.redberryinternship.ge/api/real-estates',
  type: 'GET',
  async: false,
  headers: {
    'Authorization': 'Bearer 9cfbfa11-2b4d-4396-9ac7-b8c3770ebb44' 
  },
  success: function(response) {
    return 'real estates request'
  },
  error: function(error) {
    console.error('Error:', error); 
  }
}).responseJSON;

//get all regions
$.ajax({
  url: 'https://api.real-estate-manager.redberryinternship.ge/api/regions',
  type: 'GET',
  success: function(data) {
    let regions = data;
    regions.forEach(item => {
      let newLi = $(`<li><input region_id = "${item.id}" type="checkbox" id="${item.id}" name="${item.name}"><label for="${item.name}">${item.name}</label>`);
      $('ul').append(newLi)
      if(selectedRegions.has(item.id)){
        const inputId = $(`input[region_id='${item.id}']`)
        $(inputId).prop('checked', true)
      }
    })
    $('input[region_id]').change(e => {
      if(e.target.checked){
        selectedRegions.add(Number(e.target.id))
      }else{
          selectedRegions.delete(Number(e.target.id))
        }
        localStorage.setItem('selectedRegions', JSON.stringify([...selectedRegions])) 
      })
      
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Error:', textStatus, errorThrown);
    }
});

// filter functionality

let filteredDataIds = new Set([])

const retrievedfilteredDataIds = localStorage.getItem('filteredDataIds');


// filter by regions
let filterByRegion = (data)=>{

  if(selectedRegions.size === 0 || !selectedRegions.size){
    return false;
  }

  data.forEach(realEstate => {
    let realEstateRegionId = realEstate.city.region.id
    if(selectedRegions.has(realEstateRegionId)){
      filteredDataIds.add(realEstate.id)
    }
  })
  
}

// filter by price
$('#minPriceInput').val(localStorage.getItem('minPrice'))
$('#maxPriceInput').val(localStorage.getItem('maxPrice'))


let filterByPrice = (data)=>{
  let minPrice = Number(localStorage.getItem('minPrice'));
  let maxPrice = Number(localStorage.getItem('maxPrice'));

  //validate min and max prices
  
  if(minPrice > maxPrice){
    $('#minPriceInput').css('border-color', 'red');
    $('#maxPriceInput').css('border-color', 'red');
    return false;
  }else{
    $('#minPriceInput').css('border-color', '#808A93');
    $('#maxPriceInput').css('border-color', '#808A93');
  }
  
  
  data.forEach(realEstate => {
    let realEstatePrice = Number(realEstate.price);
    if(realEstatePrice > minPrice){
      if(realEstatePrice < maxPrice){
        filteredDataIds.add(realEstate.id)
      }
    }
  })
}


// filter by area
$('#minFartobiInput').val(localStorage.getItem('minArea'))
$('#maxFartobiInput').val(localStorage.getItem('maxArea'))


let filterByArea = (data)=>{
  let minArea = Number(localStorage.getItem('minArea'));
  let maxArea = Number(localStorage.getItem('maxArea'));
  
  //validate min and max areas
  if(minArea > maxArea){
    $('#minFartobiInput').css('border-color', 'red');
    $('#maxFartobiInput').css('border-color', 'red');
    return false;
  }else{
    $('#minFartobiInput').css('border-color', '#808A93');
    $('#maxFartobiInput').css('border-color', '#808A93');
  }
  
  data.forEach(realEstate => {
    let realEstateArea = Number(realEstate.area);
    if(realEstateArea > minArea){
      if(realEstateArea < maxArea){
        filteredDataIds.add(realEstate.id)
      }
    }
  })
}


//filter by bedrooms
$('#sadzInput').on('input', ()=>{
  
})
$('#sadzInput').val(localStorage.getItem('bedroomsQuantity'))

let filterByBedrooms = (data)=>{
  let bedroomsQuantity = Number(localStorage.getItem('bedroomsQuantity'));
  
  //validate bedroomos input
  if(bedroomsQuantity < 1){
    return false;
  }
  data.forEach(realEstate => {
    let realEstateBedrooms = Number(realEstate.bedrooms);
    if(realEstateBedrooms === bedroomsQuantity){
      filteredDataIds.add(realEstate.id)
    }
  })
}


// filter real estates

// load filterrs from localstorage
if (retrievedfilteredDataIds) {
  filteredDataIds = new Set(JSON.parse(retrievedfilteredDataIds));
}

let filteredRealEstates = ()=>{
  let filteredData = []
  getRealEstates.forEach(realEstate =>{
    if(filteredDataIds.has(realEstate.id)){
      filteredData.push(realEstate)
    }
  })
  return filteredData;
}

if(filteredDataIds.size == 0){
  appendRealEstateData(getRealEstates);
}else{
  appendRealEstateData(filteredRealEstates());
}


let filterRealEstates = ()=>{
  filteredDataIds.clear();

  filterByRegion(getRealEstates);
  filterByPrice(getRealEstates);
  filterByArea(getRealEstates);
  filterByBedrooms(getRealEstates);
  
  localStorage.setItem('filteredDataIds', JSON.stringify([...filteredDataIds]));

  if(filteredDataIds.size === 0){
    $('.realEstatesList').empty()
    $('.realEstatesList').append($('<p>აღნიშნული მონაცემებით განცხადება არ იძებნება</p>'))
    return
  }
  appendRealEstateData(filteredRealEstates())
}


$('#filterByRegionBtn').on('click', ()=>{
  filterRealEstates();
})

$('#filterByPriceBtn').on('click', ()=>{
  localStorage.setItem('minPrice', $('#minPriceInput').val())
  localStorage.setItem('maxPrice', $('#maxPriceInput').val())
  filterRealEstates();
})

$('#fartobiBtnArcheva').on('click', ()=>{
  localStorage.setItem('minArea', $('#minFartobiInput').val())
  localStorage.setItem('maxArea', $('#maxFartobiInput').val())
  filterRealEstates();
})

$('#bedroomsQntBtn').on('click', ()=>{
  localStorage.setItem('bedroomsQuantity', $('#sadzInput').val())
  filterRealEstates();
})

$('#emptyFilter').on('click', ()=>{
  selectedRegions.clear()
  $('input[region_id]').each((index, element) => {
    $(element).prop('checked', false);
  });
  localStorage.setItem('selectedRegions', JSON.stringify([...selectedRegions])) 
  localStorage.setItem('maxArea', '');
  localStorage.setItem('minArea', '');
  localStorage.setItem('maxPrice', '');
  localStorage.setItem('bedroomsQuantity', '');
  localStorage.setItem('minPrice', '');
  localStorage.setItem('filteredDataIds', '[]');

  appendRealEstateData(getRealEstates);

});

$('.realEstateCard').on('click', function() {
  const id = $(this).data('id');
  window.location.href = `assets/pages/singlepage.html?id=${id}`;
});