const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const transferBtn = $("#transfer-btn");
const fromInput = $("#from");
const toInput = $("#to");
const chooseTypeTicket = $(".choose-type-ticket");
const dropdown = $(".dropdown-type-ticket");
const adultInput = $("#adult-input");
const childInput = $("#child-input");
const submitBtn = $("#submit-btn");
const passengerCount = $(".passenger-count");
const seatClass = $("#seat-class");
const searchFlight = $("#search-flight");
const subAddressFrom = $(".sub-address-from")
const subAddressTo = $(".sub-address-to")
// Handle transfer
console.log(transferBtn);
transferBtn.addEventListener("click", () => {
  const temp = fromInput.value;
  fromInput.value = toInput.value;
  toInput.value = temp;
});
//Handle form fighter
const items = [
  {
    location: "Tuy hoa ",
    address: "Phu yen, Viet Nam",
  },
  {
    location: "Tan Son Nhat ",
    address: "Ho Chi Minh, Viet Nam",
  },
  {
    location: "Noi bai ",
    address: "Ha Noi, Viet Nam",
  },
  {
    location: "Phu Quoc ",
    address: "Kien Giang, Viet Nam",
  },
  {
    location: "Nha Trang ",
    address: "Khanh Hoa, Viet Nam",
  },
];
fromInput.value = items[0].location;
toInput.value = items[1].location;
fromInput.addEventListener("focus", function (e) {
  e.stopPropagation();
  const dropdown = createDropdown();
  fromInput.parentNode.appendChild(dropdown);
});

toInput.addEventListener("focus", function (e) {
  e.stopPropagation();
  const dropdown = createDropdown();
  toInput.parentNode.appendChild(dropdown);
});

function createDropdown() {
  const dropdown = document.createElement("div");
  
  dropdown.classList.add("dropdown-list");

  for (const item of items) {
    const option = document.createElement("div");
    option.textContent = item.location;

    option.classList.add("dropdown-item");
    option.addEventListener("click", function () {
      if (dropdown.parentNode.contains(fromInput)) {
        fromInput.value = item.location;
        subAddressFrom.textContent=item.address
      } else if (dropdown.parentNode.contains(toInput)) {
        toInput.value = item.location;
        subAddressTo.textContent=item.address
      }
      dropdown.remove();
    });
    dropdown.appendChild(option);
  }

  return dropdown;
}
//Handle datetimepicker
const startDateInput = $("#departure-date");
const endDateInput = $("#return-date");
const startDatePicker = flatpickr(startDateInput, {
  dateFormat: "D, d F, Y",
  defaultDate: "today",
});
const endDatePicker = flatpickr(endDateInput, {
  dateFormat: "D, d F, Y",
  defaultDate: "today",
  onClose: function (selectedDates, dateStr, instance) {
    if (
      startDateInput.value &&
      new Date(dateStr) <= new Date(startDateInput.value)
    ) {
      alert("Ngày trở về không được nhỏ hơn ngày đi!");
      instance.clear();
    }
  },
});
// khi nhấn nút
const prevButton = $(".prev");
const nextButton = $(".next");

prevButton.addEventListener("click", function () {
  const currentDate = startDatePicker.selectedDates[0];
  const newDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
  startDatePicker.setDate(newDate);
  endDatePicker.setDate(newDate);
});

nextButton.addEventListener("click", function () {
  const currentDate = startDatePicker.selectedDates[0];
  const newDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  startDatePicker.setDate(newDate);
  endDatePicker.setDate(newDate);
});
//Show return date when checked roundtrip
const roundTripCheckbox = $(".round-trip");
const returnDateDiv = $("#return-date-div");

roundTripCheckbox.addEventListener("click", function () {
  if (roundTripCheckbox.checked) {
    returnDateDiv.style.visibility = "visible";
  } else {
    returnDateDiv.style.visibility = "hidden";
  }
});
//Chosse type ticket
chooseTypeTicket.addEventListener("click", function (e) {
  dropdown.classList.remove("hidden");
});

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let adultCount = adultInput.value;
  let childCount = childInput.value;
  if (adultCount >= 10 || childCount >= 10) {
    alert("Vượt quá số lượng vé được mua");
  } else {
    if (isNaN(adultCount) || !adultCount) {
      adultCount = 0;
      adultInput.value = 0;
    }
    if (isNaN(childCount) || !childCount) {
      childCount = 0;
      childInput.value = 0;
    }
    passengerCount.innerHTML = `<p><span style="color:#4D46FA">${adultCount}</span> Adult, <span style="color:#4D46FA">${childCount}</span> Child</p>`;
    dropdown.classList.add("hidden");
  }
});
searchFlight.addEventListener("click", () => {
  const oneWay = roundTripCheckbox.checked;
  const fromPlace = fromInput.value;
  const toPlace = toInput.value;
  const fromDate = startDateInput.value;
  const toDate = endDateInput.value;
  const typeTicket = passengerCount.textContent || "1 Adult, 1 Child";
  const typeSeat = seatClass.value;
  const flightInfo = {
    direct: oneWay,

    fromPlace: fromPlace,

    toPlace: toPlace,

    fromDate: fromDate,

    toDate: toDate,

    typeTicket: typeTicket,

    typeSeat: typeSeat,
  };

  localStorage.setItem("flightInfo", JSON.stringify(flightInfo));
  window.location.href = "flight-schedule.html";
});
