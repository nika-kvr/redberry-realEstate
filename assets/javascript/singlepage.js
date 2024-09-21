// get id from url
const urlParams = new URLSearchParams(window.location.search);
realEstateId = urlParams.get('id')

// get single real estate
$.ajax({
  url: `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${realEstateId}`,
  headers: {
    'Authorization': 'Bearer 9d109656-71bc-4a80-9b93-22607c5e61fd' 
  },
  type: 'GET',
  async: false,
  success: function(data) {
    let isRentalText = data.is_rental === 0 ? 'იყიდება' : 'ქირავდება';
    $('.realestateInfo').append(`
      <div class="backBtnDiv">
        <img id="backBtn" src="../images/backBtn.svg" alt="">
      </div>
      <div class="imgDateDiv">
        <div class="isRentalDiv">${isRentalText}</div>
        <img class="singleImg" src="${data.image}" alt="">
        <p class="aboutDate">გამოქვეყნების თარიღი  ${data.created_at.slice(0, 10)}</p>
      </div>
      <div class="aboutDiv">
        <p class="singlePrice">${data.price} ₾</p>
        <div class="addressDiv">
          <img class="singleAddressImg" src="../images/addressSvg.svg" alt="">
          <p class="aboutText">${data.address}</p>
        </div>
        <div class="addressDiv">
          <img src="../images/area.svg" alt="">
          <p class="aboutText">ფართი ${data.area} მ²</p>
        </div>
        <div class="addressDiv">
          <img src="../images/bed.svg" alt="">
          <p class="aboutText">საძინებელი ${data.bedrooms}</p>
        </div>
        <div class="addressDiv">
          <img src="../images/zipCOde.svg" alt="">
          <p class="aboutText">საფოსტო ინდექსი ${data.zip_code}</p>
        </div>
        <div class="addressDiv">
          <p class="aboutDescription aboutText">
          ${data.description}
          </p>
        </div>
        <div class="agentDiv">
          <div class="imgNameDiv">
            <img class="agentImg" src="${data.agent.avatar}" alt="">
            <div class="agentNameDiv">
              <p class="agentName">${data.agent.name} ${data.agent.surname}</p>
              <p class="aboutText agent">აგენტი</p>
            </div>
          </div>
          <div class="mailDiv">
            <img src="../images/mail.svg" alt="">
            <p class="aboutMail">${data.agent.email}</p>
          </div>
          <div class="phoneDiv">
            <img src="../images/phone.svg" alt="">
            <p class="aboutMail">${data.agent.phone}</p>
          </div>
        </div>
        <div class="deleteListingBtn">
          <p class="dltListingText">ლისტინგის წაშლა</p>
        </div>
      </div>
    `)
    console.log(data)
  },
  error: function(jqXHR, textStatus, errorThrown) {
    console.log('Error:', textStatus, errorThrown);
  }
});

$('#backBtn').on('click', ()=>{
  window.location.href = '../../';
})


$('.dltListingText').on('click', ()=>{
  $('#myModal').show()

})

$(window).on('click', (event) => {
  if ($(event.target).is('#myModal')) {
    $('#myModal').fadeOut();
  }
});


$('#closeModalBtn').on('click', () => {
  $('#myModal').fadeOut();
});

$('#deleteRealestateBtn').on('click', ()=>{
  $.ajax({
    url: `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${realEstateId}`,
    headers: {
      'Authorization': 'Bearer 9d109656-71bc-4a80-9b93-22607c5e61fd' 
    },
    type: 'DELETE',
    success: function(data) {
      window.location.href = '../../';
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Error:', textStatus, errorThrown);
    }
  });
})

// const itemWidth = 384; 
// const carouselInner = $('.carousel-inner');
// const items = $('.carousel-item');
// let index = 0;

// $('.next').on('click', () => {
//     index++;
//     if (index >= items.length) {
//         index = 0;
//     }
//     const offset = -(itemWidth * index);
//     carouselInner.css('transform', `translateX(${offset}px)`);
// });