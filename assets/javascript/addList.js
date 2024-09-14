$(document).ready(() => {
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
              let newOption = $(`<option data-region-id = "${item.id}"  value = "${item.name}">${item.name}</option>`);
              $('#regionsSelect').append(newOption)
            })
            $('#regionsSelect').on('change', (e)=>{
              const selectedRegionId = $(e.target).find('option:selected').data('region-id');
              // console.log(selectedRegionId)
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
});
// get all cities
