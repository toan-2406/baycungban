const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const infoSchedule = $("#info-schedule");
const modalChangeFlight = $("#modal-change-flight");
const closeBtn = $(".close-btn");

const flightInfo = JSON.parse(localStorage.getItem("flightInfo"));
console.log("🚀 ~ file: flightSchedule.js:5 ~ flightInfo:", flightInfo);
if (!flightInfo) {
  infoSchedule.style.display = "none";
} else {
  infoSchedule.style.display = "block";

  let text = flightInfo.typeTicket;
  let arrayToSplited = text?.split(" ");
  const arrayStr = arrayToSplited?.filter((item) => isNaN(item));
  const arrayNumber = arrayToSplited?.filter((item) => parseFloat(item));
  infoSchedule.innerHTML = `<div class="flex flex-wrap md:gap-0 gap-3 lg:max-w-[1260px] lg:px-[30px] px-4 mx-auto">
    <div class="flex md:flex-1 items-center justify-between gap-x-2">
      <div class="flex flex-col items-start">
        <div class="text-md font-semibold text-[#4D46FA]">
          ${flightInfo.fromPlace}
        </div>
        <div class="font-light text-xs">${flightInfo.fromDate}</div>
      </div>
      <div>
        <svg
          width="26"
          height="14"
          viewBox="0 0 26 14"
          fill="gray"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.35712 5.28091H17.531V2.27258H6.35712V0L0 3.67016L6.35712 7.34037V5.28091Z"
            fill="gray"
          />
          <path
            d="M7.64636 11.7274H18.8203V14L25.1773 10.3298L18.8203 6.65964V8.71905H7.64636V11.7274Z"
            fill="gray"
          />
        </svg>
      </div>
      <div class="flex flex-col items-start">
        <div class="text-md font-semibold text-[#4D46FA]">
        ${flightInfo.toPlace}
        </div>
        <div class="font-light text-xs">${flightInfo.toDate}</div>
      </div>
    </div>
    <div class="flex md:flex-1 items-center gap-x-2 order-last sm:order-none">
      <div class="font-semibold text-sm px-4 border-r-2 border-gray-500">
      ${flightInfo.direct === true ? "Round Trip" : "One Way"}
      </div>
      <div class="font-semibold text-sm passenger-count px-4">
        <p>
          <span style="color: #4d46fa">${arrayNumber[0]}</span> ${arrayStr[0]}
          <span style="color: #4d46fa">${isNaN(arrayNumber[1]) ? 0 : arrayNumber[1]}</span> ${arrayStr[1]}
        </p>
      </div>
      <div class="font-semibold text-sm px-4 border-l-2 border-gray-500">
         ${flightInfo.typeSeat}
      </div>
    </div>
    <div class="btn-change bg-[#F06336] w-full md:w-fit justify-center order-last flex items-center gap-x-2 cursor-pointer py-1 px-2 rounded-md">
      <p class="text-sm font-semibold text-white ">Change Flights</p>
      <span
        ><svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_42_537)">
            <path
              d="M13.5528 13.2518L10.2208 9.78631C11.0775 8.76788 11.5469 7.48648 11.5469 6.15249C11.5469 3.03576 9.01117 0.5 5.89444 0.5C2.7777 0.5 0.241943 3.03576 0.241943 6.15249C0.241943 9.26923 2.7777 11.805 5.89444 11.805C7.0645 11.805 8.17952 11.4521 9.13282 10.7821L12.4902 14.2739C12.6305 14.4196 12.8192 14.5 13.0215 14.5C13.2129 14.5 13.3946 14.427 13.5324 14.2943C13.8254 14.0124 13.8347 13.545 13.5528 13.2518ZM5.89444 1.97456C8.1982 1.97456 10.0724 3.84873 10.0724 6.15249C10.0724 8.45625 8.1982 10.3304 5.89444 10.3304C3.59068 10.3304 1.71651 8.45625 1.71651 6.15249C1.71651 3.84873 3.59068 1.97456 5.89444 1.97456Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_42_537">
              <rect
                width="14"
                height="14"
                fill="white"
                transform="translate(0 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </span>
    </div>
    </div>`;
}
const changeFlightBtn = $(".btn-change");
changeFlightBtn.addEventListener("click", (e) => {
  modalChangeFlight.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});
closeBtn.addEventListener("click", (e) => {
  modalChangeFlight.classList.add("hidden");
  document.body.style.overflow = "scroll";
});
const chooseBtn = Array.from($$(".btn-choose"));
const tabs = Array.from($$(".tab"));
const tabContents = Array.from($$(".tab-body"));
chooseBtn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    btn.classList.add("active");
  });
});
// Xử lý sự kiện click cho từng tab
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabContents.forEach((content) => {
      content.style.display = "none";
    });

    tabContents[index].style.display = "flex";

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
  });
});
tabContents[0].style.display = "flex";
tabs[0].classList.add("active");
tabContents[2].style.display = "flex";
tabs[3].classList.add("active");
