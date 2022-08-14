const tabsIds = ['python-cat-button', 'Excel-cat-button', 'Web-cat-button', 'JavaScript-cat-button', 'Data-cat-button', 'AWS-cat-button', 'Drawing-cat-button']
const fields = ['Python', 'Excel', 'Web-Development', 'JavaScript', 'Data-Science', 'AWS-Certification', 'Drawing']
let field_index = 0;
let courses = {}
let titles = {}
let headers = {}
let descriptions = {}
let number_of_carts = 4

// build star rating design
const build_stars = (rating) => {
    stars = [];
    let rem = 5;
    while(parseFloat(rating, 10) >= .7){
        let newIcon = document.createElement("span")
        newIcon.innerHTML = '<i class="fa fa-star" style="font-size:12px; margin: 1px; color:#ebb252"></i>'
        stars.push(newIcon)
        rating -= 1
        --rem;
    }
    if(parseFloat(rating, 10) >= 0.3){
        let newIcon = document.createElement("span")
        newIcon.innerHTML = '<i class="fa fa-star-half-empty" style="font-size:12px; margin: 1px; color:#ebb252"></i>'
        stars.push(newIcon)
        --rem;
    }
    while(rem > 0){
        let newIcon = document.createElement("span")
        newIcon.innerHTML = '<i class="fa fa-star-o" style="font-size:12px; margin: 1px; color:#ebb252"></i>'
        stars.push(newIcon)
        --rem;
    }
    return stars
}

const buildCart = (i, item) => {
    let newImg = document.createElement("img")
    newImg.src = item["image"]
    newImg.alt = fields[i]
    newImg.height = "150"
    newImg.width = "260"

    let CourseName = document.createElement("h3");
    CourseName.style.cssText = "margin: 5px; font-size: 15px;"
    let title = item["title"]
    if(title.length > 41) title = title.substring(0, 40) + "..."
    CourseName.append(title)

    let instructorName = document.createElement("p")
    instructorName.classList.add("coures-grid-item-description")
    instructorName.style.cssText = "color: #876f89;"
    let authors = "";
    for(str of item["instructors"]) authors += str["name"] + ", "
    authors = authors.substring(0, authors.length-2)
    if(authors.length > 40){
        authors = authors.substring(0, 39)
        authors += "..."
    }
    instructorName.append(authors)

    let rating = document.createElement("p")
    rating.style.cssText = "display: inline; margin: 5px; font-size: 12px; color: #ce810e;"
    rating.append(item["rating"] + " ")

    let stars = build_stars(parseFloat(item["rating"]))

    // adding random number of people
    let retedby = document.createElement("p")
    retedby.style.cssText = "display: inline; margin: 5px; font-size: 12px; color: #738abb;"
    retedby.append(" (" + (Math.floor(Math.random()*10)+1) + "," + (Math.floor(Math.random()*900)+100) + ")")

    let price = document.createElement("h3");
    price.style.cssText = "margin: 5px; font-size: 18px; display: block;"
    price.append("E€ " + item["price"])

    let newHeader = document.createElement("header");
    newHeader.style.cssText = "padding-left: 12px;"
    newHeader.append(CourseName)
    newHeader.appendChild(instructorName)
    newHeader.appendChild(rating)
    for(star of stars) newHeader.appendChild(star)
    newHeader.appendChild(retedby)
    newHeader.appendChild(price)

    let newCart = document.createElement("article")
    newCart.classList.add("courses-grid-item")
    newCart.appendChild(newImg)
    newCart.appendChild(newHeader)
    return newCart
}

// show courses cards in field 'field' and they title must match with 'match'
const showField = (i, match) => {
    document.getElementById('courses-field-header').textContent = headers[fields[i]]
    document.getElementById('courses-field-description').textContent = descriptions[fields[i]]
    document.getElementById('courses-field-button').textContent = "Explore " + fields[i]

    let div_carousel = document.getElementById('courses-grid-carousel-inner')
    div_carousel.innerHTML = '' // remove all its children

    let div_of_carts = document.createElement('div')
    div_of_carts.classList.add('box-of-carts')
    let carts_added = 0;
    let flag_active = true;
    for(item of courses[fields[i]]){
        // check first if the title match the 'match' (it is guaranteed that 'match' is lower case)
        let tmpTitle = item["title"]
        tmpTitle = tmpTitle.toLowerCase()
        if(!tmpTitle.includes(match)) continue
        
        newCart = buildCart(i, item)
        div_of_carts.appendChild(newCart)
        ++carts_added
        if(carts_added == number_of_carts){
            carts_added = 0
            let carousel_item = document.createElement('div');
            carousel_item.classList.add('carousel-item')
            if(flag_active){
                carousel_item.classList.add("active")
                flag_active = false
            }
            carousel_item.appendChild(div_of_carts)
            div_of_carts = document.createElement('div')
            div_of_carts.classList.add('box-of-carts')
            div_carousel.appendChild(carousel_item)
        }
    }
    if(carts_added !== 0){
        carts_added = 0
        let carousel_item = document.createElement('div');
        carousel_item.classList.add('carousel-item')
        if(flag_active){
            carousel_item.classList.add("active")
            flag_active = false
        }
        carousel_item.appendChild(div_of_carts)
        div_carousel.appendChild(carousel_item)
    }
}

// load specialization data
const loadData = async (branch) => {
    let response = await fetch("http://localhost:3000/" + branch)
    let json = await response.json()
    return json
}

// load all data
function loadAllData(i = 0){
    if(i === fields.length){
        showField(0, "");
        return;
    }
    loadData(fields[i]).then((res) => {
        courses[fields[i]] = res["courses"]
        titles[fields[i]] = res["title"]
        headers[fields[i]] = res["header"]
        descriptions[fields[i]] = res["description"]
    }).then(() => {
        loadAllData(i+1)
    })
}



loadAllData()
// add events for tabs
for(let i = 0; i < tabsIds.length; ++i){
    document.getElementById(tabsIds[i]).addEventListener("click", () => {
        field_index = i;
        showField(i, "")
        document.getElementById(tabsIds[i]).style.color = "black"
        for(let j = 0; j < tabsIds.length; ++j){
            if(i === j) continue
            document.getElementById(tabsIds[j]).style.color = "#6a6f73"
        }
    })
}

// add event to search bar
document.getElementById('search-submit').addEventListener("click", () => {
    let text = document.getElementById('search-input').value;
    text = text.toLowerCase()
    showField(field_index, text)
})

// stop form from reloading page
document.getElementById('search-form').addEventListener('submit', function handleForm(event) {
    event.preventDefault();
})
