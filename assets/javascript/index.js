// filter buttons func
$('#regioniBtn').click(function() {
  $('.regioniDropdown').toggle();
  $('.fasiDropdown').css('display', 'none');
  $('.fartobiDropdown').css('display', 'none');
  $('.sadzDropdown').css('display', 'none');
});

$('#fasiBtn').click(function() {
  $('.fasiDropdown').toggle();
  $('.regioniDropdown').css('display', 'none');
  $('.fartobiDropdown').css('display', 'none');
  $('.sadzDropdown').css('display', 'none');
});

$('#fartobiBtn').click(function() {
  $('.fartobiDropdown').toggle();
  $('.regioniDropdown').css('display', 'none');
  $('.fasiDropdown').css('display', 'none');
  $('.sadzDropdown').css('display', 'none');
});

$('#sadzBtn').click(function() {
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


//get regions
$(document).ready(function() {
  $.ajax({
      url: 'https://api.real-estate-manager.redberryinternship.ge/api/regions',
      type: 'GET',
      success: function(data) {
        let regions = data;
        regions.forEach(item => {
          let newLi = $(`<li><input type="checkbox"><p>${item.name}</p>`);
          $('ul').append(newLi)
        })

      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error:', textStatus, errorThrown);
      }
  });
});



