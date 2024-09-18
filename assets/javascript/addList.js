// get all cities
$.ajax({
  url: 'https://api.real-estate-manager.redberryinternship.ge/api/cities',
  type: 'GET',
  success: function(cities) {
    
    // get all regions
    $.ajax({
        url: 'https://api.real-estate-manager.redberryinternship.ge/api/regions',
        type: 'GET',
        success: function(data) {
          let regions = data;
          regions.forEach(item => {
            let newOption = $(`<option value = "${item.id}">${item.name}</option>`);
            $('#regionsSelect').append(newOption);
            if(Number(localStorage.getItem('addlistRegion')) === item.id){
              $('#regionsSelect').val(item.id)
              console.log(localStorage.getItem('addlistRegion'))
            }
          })

          $('#regionsSelect').on('change', (e)=>{
            const selectedRegionId = $('#regionsSelect').val();
            console.log(selectedRegionId)
            $('#citiesSelect').empty();
            cities.forEach(citie => {
              if(citie.region_id === selectedRegionId){
                let newCitieOption = $(`<option data-region-id = "${citie.region_id}" value = "${citie.name}">${citie.name}</option>`);
                $('#citiesSelect').append(newCitieOption)
              }
            })
          })
    
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log('Error:', textStatus, errorThrown);
        }
    });

  },
  error: function(jqXHR, textStatus, errorThrown) {
    console.log('Error:', textStatus, errorThrown);
  }
});

// get all agents

$.ajax({
  url: 'https://api.real-estate-manager.redberryinternship.ge/api/agents', 
  type: 'GET',
  headers: {
      'Authorization': 'Bearer 9cfbfa11-2b4d-4396-9ac7-b8c3770ebb44' 
  },
  success: function(response) {
    let agents = response;
    agents.forEach(agent => {
      // console.log(agent)
      let newAgentOption = $(`<option data-agent-id = "${agent.id}" value = "${agent.name} ${agent.surname}">${agent.name} ${agent.surname}</option>`);
      $('#agentSelectfield').append(newAgentOption);
    })
  },
  error: function(xhr, status, error) {
    console.log('Error:', error); 
  }
});

// upload image

if(localStorage.getItem('addlistImg')){
  $('#previewImageListing').attr('src', localStorage.getItem('addlistImg'));
  $('.imgPreviewDiv').show();
  $('.imgUploadDivListing').hide();
}

$('.imgUploadDivListing').on('click', function() {
  $('#imageInput').click();
});

$('#imageInput').on('change', function() {
  const file = this.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    $('#previewImageListing').attr('src', e.target.result);
    $('.imgPreviewDiv').show();
    $('.imgUploadDivListing').hide();
    localStorage.setItem('addlistImg', e.target.result)
  };
  reader.readAsDataURL(file);
});

$('#deleteImgLIsting').on('click', function() {
  $('#previewImageListing').empty();
  $('#imageInput').val('');
  $('#previewImageListing').attr('src', '');
  $('.imgUploadDivListing').show();
  $('.imgPreviewDiv').hide();
  localStorage.setItem('addlistImg', '')
});

// add listing validations

const form = $('#addlistingForm');
const submitBtn = $('#submitBtn');

let addressInput = $('#address');
let zipcodeInput = $('#zip_code');
let regionInput = $('#regionsSelect');
let citieInput = $('#citiesSelect');
let priceInput = $('#price');
let areaInput = $('#area');
let bedroomsInput = $('#bedrooms');
let descriptionInput = $('#aboutInput');
let addlistImgInput = $('#imageInput');
let agentInput = $('#agentSelectfield');

let isAddressValid;
let isZipcodeValid;
let isRegionValid;
let iscitieValid;
let isPriceValid;
let isAreaValid;
let isBedroomsValid;
let isDescriptionValid;
let isImgValid;
let isAgentValid;


// get data from localstorage
addressInput.val(localStorage.getItem('addlistAddress'))
zipcodeInput.val(localStorage.getItem('addlistZipcode'))

// address validation
let validateAddress = ()=>{
  if(addressInput.val().length === 0){
    $('#requiredAddress').css('color', 'red');
    addressInput.css('border-color', 'red');
    isAddressValid = false;
  }else{
    $('#requiredAddress').css('color', 'green');
    addressInput.css('border-color', '#808A93');
    isAddressValid = true;
  }

  if(addressInput.val().length < 2){
    $('#minAddress').css('color', 'red');
    addressInput.css('border-color', 'red');
    isAddressValid = false;
  }else{
    $('#minAddress').css('color', 'green');
    addressInput.css('border-color', '#808A93');
    isAddressValid = true;
  }
  localStorage.setItem('addlistAddress', addressInput.val())
}
addressInput.on('input', validateAddress);

// zipcode validattion
let validateZipcode = ()=>{
  if(zipcodeInput.val().length === 0){
    $('#requiredZipCode').css('color', 'red');
    zipcodeInput.css('border-color', 'red');
    isZipcodeValid = false;
  }else{
    $('#requiredZipCode').css('color', 'green');
    zipcodeInput.css('border-color', '#808A93');
    isZipcodeValid = true;
  }
  
  if(/[^0-9]/.test(zipcodeInput.val()) || zipcodeInput.val().length === 0){
    $('#numZipCode').css('color', 'red');
    zipcodeInput.css('border-color', 'red');
    isZipcodeValid = false;
  }else{
    $('#numZipCode').css('color', 'green');
    zipcodeInput.css('border-color', '#808A93');
    isZipcodeValid = true;
  }
  localStorage.setItem('addlistZipcode', zipcodeInput.val())
}
zipcodeInput.on('input', validateZipcode)

// region validation
let validateRegion = ()=>{
  if(regionInput.val() === null){
    $('#requiredRegion').css('color', 'red');
    regionInput.css('border-color', 'red');
    isRegionValid = false;
  }else{
    $('#requiredRegion').css('color', 'green');
    regionInput.css('border-color', '#808A93');
    isRegionValid = true;
  }
  localStorage.setItem('addlistRegion', regionInput.val())
}

// BUG 
regionInput.on('change', validateRegion)
// BUG 

let isAddlistFormValid = ()=>{
  validateRegion();
}

// post addlist
submitBtn.on('click', function(event) {
  event.preventDefault(); 
  isAddlistFormValid();
})