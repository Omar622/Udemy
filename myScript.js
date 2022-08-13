let courses = {}

// build star rating design
const build_stars = (rating) => {
    stars = [];
    let rem = 5;
    while(parseFloat(rating, 10) >= .7){
        let newIcon = document.createElement("span")
        newIcon.innerHTML = '<i class="fa fa-star" style="font-size:12px;color:#ebb252"></i>'
        stars.push(newIcon)
        rating -= 1
        --rem;
    }
    if(parseFloat(rating, 10) >= 0.3){
        let newIcon = document.createElement("span")
        newIcon.innerHTML = '<i class="fa fa-star-half-empty" style="font-size:12px;color:#ebb252"></i>'
        stars.push(newIcon)
        --rem;
    }
    while(rem > 0){
        let newIcon = document.createElement("span")
        newIcon.innerHTML = '<i class="fa fa-star-o" style="font-size:12px;color:#ebb252"></i>'
        stars.push(newIcon)
        --rem;
    }
    return stars
}

// load specialization data
const loadData = async (branch) => {
    let response = await fetch("http://localhost:3000/" + branch)
    let json = await response.json()
    return json
}

// show courses cards in field 'field' and they title must match with 'match'
const showCourses = (field, match) => {
    match = match.toLowerCase()
    let course_gird = document.querySelector('.courses-grid')
    course_gird.innerHTML = '' // remove all its children
    for(item of courses[field]){
        let tmpTitle = item["title"]
        tmpTitle = tmpTitle.toLowerCase()
        // check first if the title match the 'match'
        if(!tmpTitle.includes(match)) continue
        
        let newImg = document.createElement("img")
        newImg.src = item["image"]
        newImg.alt = "python"
        newImg.height = "150"
        newImg.width = "260"

        let CourseName = document.createElement("h3");
        CourseName.style.cssText = "margin: 5px"
        let title = item["title"]
        if(title.length > 45) title = title.substring(0, 44) + "..."
        CourseName.append(title)

        let instructorName = document.createElement("p")
        instructorName.classList.add("coures-grid-item-description")
        instructorName.style.cssText = "color: #876f89;"
        instructorName.append(item["author"])

        let rating = document.createElement("p")
        rating.style.cssText = "display: inline; font-size: 12px; color: #ce810e;"
        rating.append(item["rating"] + " ")

        let retedby = document.createElement("p")
        retedby.style.cssText = "display: inline; font-size: 12px; color: #738abb;"
        retedby.append("(" + item["people"] + ")")

        let price = document.createElement("h3");
        price.style.cssText = "margin: 5px"
        price.append("E€ " + item["price"])

        stars = build_stars(parseFloat(item["rating"]))

        let newHeader = document.createElement("header");
        newHeader.style.cssText = "padding-left: 12px;"
        newHeader.append(CourseName)
        newHeader.appendChild(instructorName)
        newHeader.appendChild(rating)
        for(star of stars) newHeader.appendChild(star)
        newHeader.appendChild(retedby)
        newHeader.appendChild(price)

        let newCart = document.createElement("section")
        newCart.classList.add("courses-grid-item")
        newCart.appendChild(newImg)
        newCart.appendChild(newHeader)
        
        course_gird.appendChild(newCart)
    }
}

// load data
loadData("python").then((res) => {
    courses["python"] = res
}).then(() => {
    showCourses("python", "")
})

// stop form from reloading page
document.getElementById('search-form').addEventListener('submit', function handleForm(event) {
    event.preventDefault();
})

// add event to search bar
document.getElementById('search-submit').addEventListener("click", () => {
    let text = document.getElementById('search-input').value;
    showCourses("python", text)
})