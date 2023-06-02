const NASA_API_KEY = 'ZsZLeAaCbDiosbI2g1jiI3BYahv2btDZIAnP8jVT'
const ASTRO_APP_ID = '849f222f-933a-45cd-9aaf-c0537236161c'
const ASTRO_APP_SECRET =
  '40440e9fd6ed0c7e6b13acc3d9c64a9ef4ebd52b12c1157006bf04bdc2f1a9e7bd6ea762fb1eef3709685551ea62fa5b72af0cde46cb1b23de55e71f249cefbb926208b3ff72732ae8b29197ba8a02ad2e83338ad5d9c81894c81362e5ef5c3837c1f0b9922f54c7b32cb27bb3dc5ac8'
const authString = btoa(`${ASTRO_APP_ID}:${ASTRO_APP_SECRET}`)
const date = document.getElementById('date')
const form = document.getElementById('form')
const marsGallery = document.getElementById('mars-gallery')
const moonPhase = document.getElementById('moon-phase')
const moonPhaseDiv = document.getElementById('moon-phase-div')
let chosenDate
let moonPhaseImgUrl

date.onchange = (e) => {
  chosenDate = e.target.value
}

form.onsubmit = (e) => {
  e.preventDefault()
  fetch(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${chosenDate}&api_key=${NASA_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      let photo1 =
        data.photos[Math.floor(Math.random() * data.photos.length)].img_src
      let photo2 =
        data.photos[Math.floor(Math.random() * data.photos.length)].img_src
      let photo3 =
        data.photos[Math.floor(Math.random() * data.photos.length)].img_src
      let photo4 =
        data.photos[Math.floor(Math.random() * data.photos.length)].img_src
      let photo5 =
        data.photos[Math.floor(Math.random() * data.photos.length)].img_src
      let photo6 =
        data.photos[Math.floor(Math.random() * data.photos.length)].img_src
      marsGallery.classList.remove('hidden')

      marsGallery.innerHTML = `
      <h1
      class="text-4xl text-center font-bold tracking-tight mb-12 my-3"
    >
      Mars images for ${dayjs(chosenDate).format('M/D/YYYY')}
    </h1>
      <div class="-m-1 flex flex-wrap md:-m-2">
          <div class="flex w-1/3 flex-wrap">
          <div class="w-full p-1 md:p-2">
            <p>hello</p>
            <img
              alt="gallery"
              class="block h-full w-full rounded-lg object-cover object-center hover:opacity-25"
              src="${photo1}"
            />
          </div>
        </div>
        <div class="flex w-1/3 flex-wrap">
        <div class="w-full p-1 md:p-2">
          <img
            alt="gallery"
            class="block h-full w-full rounded-lg object-cover object-center hover:opacity-25"
            src="${photo2}"
          />
        </div>
      </div>
      <div class="flex w-1/3 flex-wrap">
      <div class="w-full p-1 md:p-2">
        <img
          alt="gallery"
          class="block h-full w-full rounded-lg object-cover object-center hover:opacity-25"
          src="${photo3}"
        />
      </div>
    </div>
    <div class="flex w-1/3 flex-wrap">
    <div class="w-full p-1 md:p-2 ">
      <img
        alt="gallery"
        class="block h-full w-full rounded-lg object-cover object-center hover:opacity-25"
        src="${photo4}"
      />
    </div>
  </div>
  <div class="flex w-1/3 flex-wrap">
  <div class="w-full p-1 md:p-2">
    <img
      alt="gallery"
      class="block h-full w-full rounded-lg object-cover object-center hover:opacity-25"
      src="${photo5}"
    />
  </div>
</div>
<div class="flex w-1/3 flex-wrap">
<div class="w-full p-1 md:p-2">
  <img
    alt="gallery"
    class="block h-full w-full rounded-lg object-cover object-center hover:opacity-25"
    src="${photo6}"
  />
</div>
</div>
</div>
          `
    })
  window.scrollTo(0, document.body.scrollHeight)

  getMoonPhase()
}

const getMoonPhase = async () => {
  const data = `{"style":{"moonStyle":"default","backgroundStyle":"stars","backgroundColor":"#000000","headingColor":"#ffffff","textColor":"#e84a4a"},"observer":{"latitude":33.775867,"longitude":-84.39733,"date":"${
    chosenDate ? chosenDate : new Date().toISOString()
  }"},"view":{"type":"landscape-simple","parameters":{}}}`

  const xhr = new XMLHttpRequest()
  xhr.withCredentials = true

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      moonPhaseImgUrl = this.responseText
        .match(/\bhttps?:\/\/\S+/gi)[0]
        .replace('"}}', '')
    }
    moonPhase.setAttribute('src', moonPhaseImgUrl)
    moonPhaseDiv.classList.remove('hidden')
  })

  xhr.open('POST', 'https://api.astronomyapi.com/api/v2/studio/moon-phase')
  xhr.setRequestHeader('Authorization', `Basic ${authString}`)

  xhr.send(data)
}


    marsFactsArray = [
      "Mars is the fourth planet from the sun",
      "Mars' nickname is the Red Planet",
      "Mars is the second smallest planet in the solar system",
      "Mars' temperatures range from -166F - 95F",
      "Mars has two small moons named Phobos and Deimos"
    ]