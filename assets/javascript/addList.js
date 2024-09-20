let isAddressValid;
let isZipcodeValid;
let isRegionValid;
let iscitieValid;
let isPriceValid;
let isAreaValid;
let isBedroomsValid;
let isDescriptionValid;
let isAgentValid;


// Load saved radio inputs
const isrentalLocalstrg = localStorage.getItem('addlistIsrental');
if (isrentalLocalstrg) {
  $(`input[name="is_rental"][value="${isrentalLocalstrg}"]`).prop('checked', true);
}

$('input[name="is_rental"]').on('change', function() {
  const selectedRadioBtn = $(this).val();
  localStorage.setItem('addlistIsrental', selectedRadioBtn);
});


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
              $('#regionsSelect').val(item.id);
            }
          })

          $('#regionsSelect').on('change', (e)=>{
            const selectedRegionId = $('#regionsSelect').val();
            $('#citiesSelect').empty();
            cities.forEach(citie => {
              if(Number(citie.region_id) == selectedRegionId){
                let newCitieOption = $(`<option value = "${citie.id}">${citie.name}</option>`);
                $('#citiesSelect').append(newCitieOption);
              }
            })
            $('#citiesSelect').val('')
          })
          // onload cities selectfield
          if(localStorage.getItem('addlistCity')){
            const selectedRegionId = $('#regionsSelect').val();
            $('#citiesSelect').empty();
            cities.forEach(citie => {
            if(Number(citie.region_id) == selectedRegionId){
              let newCitieOption = $(`<option value = "${citie.id}">${citie.name}</option>`);
              $('#citiesSelect').append(newCitieOption);
              if(Number(localStorage.getItem('addlistCity')) === citie.id && localStorage.getItem('addlistCity')){
                $('#citiesSelect').val(citie.id)
              }
              }
            })
          }
          
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
      let newAgentItem = $(`<div class='agentItem'>${agent.name} ${agent.surname}</div>`);
      newAgentItem.on('click', ()=>{
        localStorage.setItem('addlistAgent', JSON.stringify({
          'agentId': agent.id,
          'agentName': agent.name + ' ' + agent.surname
        }));
        $('.airchieAgent').hide();
        $('#selectedAgent').text(`${agent.name} ${agent.surname}`)
        $('#selectedAgent').show();
        $('#requiredAgent').css('color', 'green');
        $('#agentSelectfield').css('border-color', '#808A93');
        isAgentValid = true;
      })
      $('#agentsList').append(newAgentItem);
    })
  },
  error: function(xhr, status, error) {
    console.log('Error:', error); 
  }
});

// agents selectfield js
$('#agentSelectfield').on('click', ()=>{
  $('#agentsList').toggle();
})

// upload image

let uploadedFile;

const validImageTypes = ['image/jpeg', 'image/png'];
let isImgValid;

// if(localStorage.getItem('fileMetadata')){
//   uploadedFile = JSON.parse(localStorage.getItem('fileMetadata'));
// }

if(localStorage.getItem('addlistImg')){
  $('#previewImageListing').attr('src', localStorage.getItem('addlistImg'));
  $('.imgPreviewDiv').show();
  $('.imgUploadDivListing').hide();
}

$('.imgUploadDivListing').on('click', function() {
  $('#imageInput').click();
});

$('#imageInput').on('change', function() {

  if(!validImageTypes.includes(this.files[0].type)){
    uploadedFile = ''
  }else{
    uploadedFile = this.files[0];
  }
  if(validImageTypes.includes(uploadedFile.type)){
    const reader = new FileReader();
    reader.onload = function(e) {
      $('#previewImageListing').attr('src', e.target.result);
      $('.imgPreviewDiv').show();
      $('.imgUploadDivListing').hide();
      const fileMetadata = {
        name: uploadedFile.name,
        size: uploadedFile.size,
        type: uploadedFile.type
      };
      localStorage.setItem('fileMetadata', JSON.stringify(fileMetadata));

    };
    reader.readAsDataURL(uploadedFile);
  }
  
});

$('#deleteImgLIsting').on('click', function() {
  $('#previewImageListing').empty();
  $('#imageInput').val('');
  $('#previewImageListing').attr('src', '');
  $('.imgUploadDivListing').show();
  $('.imgPreviewDiv').hide();
  localStorage.setItem('addlistImg', '');
  localStorage.setItem('fileMetadata', '');
  
  $('#requiredImg').css('color', 'red');
  $('#typeImg').css('color', 'red');
  $('#sizeImg').css('color', 'red');
  $('.imgBackgroundDiv').css('border-color', 'red');
  uploadedFile = ''
  isImgValid = false;

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



// get data from localstorage
addressInput.val(localStorage.getItem('addlistAddress'));
zipcodeInput.val(localStorage.getItem('addlistZipcode'));
priceInput.val(localStorage.getItem('addlistPrice'));
areaInput.val(localStorage.getItem('addlistArea'));
bedroomsInput.val(localStorage.getItem('addlistBedrooms'));
descriptionInput.val(localStorage.getItem('addlistDescription'));

//get agent from localstorage
let agentLocalstrg = JSON.parse(localStorage.getItem('addlistAgent'));
if(agentLocalstrg){
  $('.airchieAgent').hide();
  $('#selectedAgent').text(agentLocalstrg.agentName)
  $('#selectedAgent').show();
}

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
  if(regionInput.val().length !== 0){
    localStorage.setItem('addlistRegion', regionInput.val());
  }
}
regionInput.on('change', validateRegion);

// city validation
let validateCity = ()=>{
  if(citieInput.val() === null){
    $('#requiredCity').css('color', 'red');
    citieInput.css('border-color', 'red');
    iscitieValid = false;
  }else{
    $('#requiredCity').css('color', 'green');
    citieInput.css('border-color', '#808A93');
    iscitieValid = true;
  }
  if(citieInput.val().length !== 0){
    localStorage.setItem('addlistCity', citieInput.val());
  }
}
citieInput.on('change', validateCity)


// price validation
let validatePrice = ()=>{
  if(priceInput.val().length === 0){
    $('#requiredPrice').css('color', 'red');
    priceInput.css('border-color', 'red');
    isPriceValid = false;
  }else{
    $('#requiredPrice').css('color', 'green');
    priceInput.css('border-color', '#808A93');
    isPriceValid = true;
  }
  
  if(/[^0-9.,]/.test(priceInput.val()) || priceInput.val().length === 0){
    $('#numPrice').css('color', 'red');
    priceInput.css('border-color', 'red');
    isPriceValid = false;
  }else{
    $('#numPrice').css('color', 'green');
    priceInput.css('border-color', '#808A93');
    isPriceValid = true;
  }
  localStorage.setItem('addlistPrice', priceInput.val())
}
priceInput.on('input', validatePrice);

// area validation
let validateArea = ()=>{
  if(areaInput.val().length === 0){
    $('#requiredArea').css('color', 'red');
    areaInput.css('border-color', 'red');
    isAreaValid = false;
  }else{
    $('#requiredArea').css('color', 'green');
    areaInput.css('border-color', '#808A93');
    isAreaValid = true;
  }
  
  if(/[^0-9.,]/.test(areaInput.val()) || areaInput.val().length === 0){
    $('#numArea').css('color', 'red');
    areaInput.css('border-color', 'red');
    isAreaValid = false;
  }else{
    $('#numArea').css('color', 'green');
    areaInput.css('border-color', '#808A93');
    isAreaValid = true;
  }
  localStorage.setItem('addlistArea', areaInput.val());
}
areaInput.on('input', validateArea);

// bedrooms validation
let validateBedrooms = ()=>{
  if(bedroomsInput.val().length === 0){
    $('#requiredBedrooms').css('color', 'red');
    bedroomsInput.css('border-color', 'red');
    isBedroomsValid = false;
  }else{
    $('#requiredBedrooms').css('color', 'green');
    bedroomsInput.css('border-color', '#808A93');
    isBedroomsValid = true;
  }

  if(/[^0-9.,]/.test(bedroomsInput.val()) || bedroomsInput.val().length === 0){
    $('#numBedrooms').css('color', 'red');
    bedroomsInput.css('border-color', 'red');
    isBedroomsValid = false;
  }else{
    $('#numBedrooms').css('color', 'green');
    bedroomsInput.css('border-color', '#808A93');
    isBedroomsValid = true;
  }

  if(!/^-?\d*(\.\d+)?$/.test(bedroomsInput.val()) || bedroomsInput.val().includes('.') || bedroomsInput.val().length === 0){
    $('#notfloatBedrooms').css('color', 'red');
    bedroomsInput.css('border-color', 'red');
    isBedroomsValid = false;
  }else{
    $('#notfloatBedrooms').css('color', 'green');
    bedroomsInput.css('border-color', '#808A93');
    isBedroomsValid = true;
  }

  localStorage.setItem('addlistBedrooms', bedroomsInput.val());
}
bedroomsInput.on('input', validateBedrooms);

// description validation
// function to count words
let countWords = (text)=> {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
let validateDescription = ()=>{
  if(descriptionInput.val().length === 0){
    $('#requiredDescription').css('color', 'red');
    descriptionInput.css('border-color', 'red');
    isDescriptionValid = false;
  }else{
    $('#requiredDescription').css('color', 'green');
    descriptionInput.css('border-color', '#808A93');
    isDescriptionValid = true;
  }

  if(countWords(descriptionInput.val()) < 5){
    $('#minDescription').css('color', 'red');
    descriptionInput.css('border-color', 'red');
    isDescriptionValid = false;
  }else{
    $('#minDescription').css('color', 'green');
    descriptionInput.css('border-color', '#808A93');
    isDescriptionValid = true;
  }
  localStorage.setItem('addlistDescription', descriptionInput.val());
}
descriptionInput.on('input', validateDescription);

// image validation
let validateAddlistImg = ()=>{
  
  if(uploadedFile === undefined || uploadedFile === ''){
    $('.imgBackgroundDiv').css('border-color', 'red');
    $('#requiredImg').css('color', 'red');
    $('#typeImg').css('color', 'red');
    $('#sizeImg').css('color', 'red');

    isImgValid = false;
    return
  }

  if(uploadedFile.name === ''){
    $('#requiredImg').css('color', 'red');
    $('.imgBackgroundDiv').css('border-color', 'red');
    isImgValid = false;
  }else{
    $('#requiredImg').css('color', 'green');
    $('.imgBackgroundDiv').css('border-color', '#808A93');
    isImgValid = true;
  }

  if(!validImageTypes.includes(uploadedFile.type)){
    $('#typeImg').css('color', 'red');
    $('.imgBackgroundDiv').css('border-color', 'red');
    isImgValid = false;
  }else{
    $('#typeImg').css('color', 'green');
    $('.imgBackgroundDiv').css('border-color', '#808A93');
    isImgValid = true;
  }

  const maxSizeInBytes = 1 * 1024 * 1024;

  if(uploadedFile.size > maxSizeInBytes || !uploadedFile.size ){
    $('#sizeImg').css('color', 'red');
    $('.imgBackgroundDiv').css('border-color', 'red');
    isImgValid = false;
  }else{
    $('#sizeImg').css('color', 'green');
    $('.imgBackgroundDiv').css('border-color', '#808A93');
    isImgValid = true;
  }

}
addlistImgInput.on('change', validateAddlistImg);

// agents validation
let validateAgent = ()=>{
  agentLocalstrg = JSON.parse(localStorage.getItem('addlistAgent'))
  if(!agentLocalstrg){
    $('#requiredAgent').css('color', 'red');
    $('#agentSelectfield').css('border-color', 'red');
    isAgentValid = false;
  }else{
    $('#requiredAgent').css('color', 'green');
    $('#agentSelectfield').css('border-color', '#808A93');
    isAgentValid = true;
  }
}

// check form validation
let isAddlistFormValid = ()=>{
  validateAddress();
  validateZipcode();
  validateRegion();
  validateCity();
  validatePrice();
  validateArea();
  validateBedrooms();
  validateDescription();
  validateAddlistImg();
  validateAgent();

  return isAddressValid 
  && isZipcodeValid
  && isRegionValid
  && iscitieValid
  && isPriceValid
  && isAreaValid
  && isBedroomsValid
  && isDescriptionValid
  && isAgentValid
  && isImgValid;
}

// post addlist
$('#addlistForm').on('submit', function(event) {
  event.preventDefault(); 
  if(!isAddlistFormValid()){
    return
  }
  const formData = new FormData(this);

  formData.append('agent_id', JSON.parse(localStorage.getItem('addlistAgent')).agentId);

  // formData.append('image', JSON.parse(localStorage.getItem('fileMetadata')).file)
  console.log(JSON.parse(localStorage.getItem('fileMetadata')))

  // console log formdata values
  Array.from(formData.entries()).forEach(([key, value]) => {
    console.log(key, value);
  });

  const token = '9cfbfa11-2b4d-4396-9ac7-b8c3770ebb44';
  $.ajax({
    url: 'https://api.real-estate-manager.redberryinternship.ge/api/real-estates',
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    },
    success: function(response) {
      console.log('Success:', response);
    },
    error: function(xhr, status, error) {
      console.error('Error:', error);
    }
  });


})

