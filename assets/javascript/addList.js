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
      console.log(agent)
      let newAgentOption = $(`<option data-agent-id = "${agent.id}" value = "${agent.name} ${agent.surname}">${agent.name} ${agent.surname}</option>`);
      $('#agentSelectfield').append(newAgentOption);
    })
  },
  error: function(xhr, status, error) {
    console.log('Error:', error); 
  }
});
