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

$('.imgUploadDiv').on('click', function() {
  $('#imageUpload').click();
});

$('#imageUpload').on('change', function() {
  const file = this.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    $('#previewImage').attr('src', e.target.result).show();
    $('#deleteImgBtn').show();
    $('#addImgSvg').hide();
  };
  reader.readAsDataURL(file);
});


// post agent
$('#agentForm').on('submit', function(event) {
  event.preventDefault(); 

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
});

// add agent validations

const $form = $('#form');
const $submitBtn = $('#submitBtn');



//get all regions
$(document).ready(() => {
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
});