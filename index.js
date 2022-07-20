const colorModeSelect = document.getElementById("color-mode")
const colorSchemeBtn = document.getElementById("color-btn")
const colorPicker = document.getElementById("color-picker")
const mainEl = document.querySelector("main")
const footerEl = document.querySelector("footer")
const snackbar = document.getElementById("snackbar")
const baseUrl = "https://www.thecolorapi.com/scheme"
let schemes

getColors()

colorSchemeBtn.addEventListener("click", () => {
    getColors()
})

function getColors() {
    fetch(`${baseUrl}?hex=${colorPicker.value.slice(1)}&${colorModeSelect.value}`)
        .then(res => res.json())
        .then(data => {
            printColors(data.colors)
            console.log(data.colors.map((color)=> color.name.value))
            if (!schemes) {
                schemes = data._links.schemes
                makeSchemes()
            }
        })
}

function makeSchemes() {
        Object.entries(schemes).forEach(
            ([name, value]) => {
                colorModeSelect.add( 
                    new Option( name.charAt(0).toUpperCase() + name.slice(1), value )
                )
        })
}

function printColors(colorsArray) {
    mainEl.innerHTML = colorsArray.map(color => {
        return `
            <div class="colors" style="background-color: ${color.hex.value}">
                <div class="color-name">${color.name.value}</div>
                <p class="color-hex">${color.hex.value}</p>
            </div>
        `
    }).join("")
}