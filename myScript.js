let cat_images_link = [
    'https://s.udemycdn.com/home/top-categories/lohp-category-design-v2.jpg',
    'https://s.udemycdn.com/home/top-categories/lohp-category-development-v2.jpg',
    'https://s.udemycdn.com/home/top-categories/lohp-category-marketing-v2.jpg',
    'https://s.udemycdn.com/home/top-categories/lohp-category-it-and-software-v2.jpg',
    'https://s.udemycdn.com/home/top-categories/lohp-category-personal-development-v2.jpg',
    'https://s.udemycdn.com/home/top-categories/lohp-category-business-v2.jpg',
    'https://s.udemycdn.com/home/top-categories/lohp-category-photography-v2.jpg',
    'https://s.udemycdn.com/home/top-categories/lohp-category-music-v2.jpg'
];
let cat_titles = ['Design', 'Development', 'Marketing', 'IT and Software', 'Personal Development', 'Business', 'Photography', 'Music'];
const tabsIds = ['python-cat-button', 'Excel-cat-button', 'Web-cat-button', 'JavaScript-cat-button', 'Data-cat-button', 'AWS-cat-button', 'Drawing-cat-button'];
const fields = ['Python', 'Excel', 'Web-Development', 'JavaScript', 'Data-Science', 'AWS-Certification', 'Drawing'];
let field_index = 0;
let courses = {};
let titles = {};
let headers = {};
let descriptions = {};
let text_in_search_bar = "";
let state = 3, lst_state = 0;
let number_of_carts = 4;

// build categories sectoin
function build_categories() {
    let rows;
    if(number_of_carts == 1){
        rows = cat_images_link.length;
    }else if(number_of_carts == 2){
        rows = Math.floor((cat_images_link.length+1)/2);
    }else if(number_of_carts == 3){
        rows = 3;
    }else{
        rows = 2;
    }
    let cols = Math.floor((cat_images_link.length+rows-1) / rows);

    let box = document.getElementById('categories-col');
    box.innerHTML = '';
    for(let i = 0, k = 0; i < rows; ++i){
        if(k == cat_images_link.length) break;
        let new_row = document.createElement('div');
        new_row.classList.add('row');
        for(let j = 0; j < cols; ++j){
            if(k == cat_images_link.length) break;
            let new_image = document.createElement('img');
            new_image.src = cat_images_link[k];
            new_image.alt = cat_titles[k];
            let title = document.createElement('span');
            title.append(cat_titles[k++]);
            title.classList.add('title-cart');

            let new_cart = document.createElement('div');
            new_cart.classList.add('image-cart');
            new_cart.append(new_image, title);
            new_cart.classList.add('categories')
            new_row.appendChild(new_cart);
        }
        box.appendChild(new_row);
    }
}
build_categories();

// build star rating design
function suitableStar(rating, i_th){
    let star = '<i class="fa fa-star" style="font-size:12px; margin: 1px; color:#ebb252"></i>';
    let star_half_empty = '<i class="fa fa-star-half-empty" style="font-size:12px; margin: 1px; color:#ebb252"></i>';
    let star_o = '<i class="fa fa-star-o" style="font-size:12px; margin: 1px; color:#ebb252"></i>';
    let newIcon = document.createElement("span");
    newIcon.innerHTML = rating >= i_th+.8 ? star : rating >= i_th+.3 ? star_half_empty : star_o;
    return newIcon;
}
function buildStars(rating) {
    stars = [];
    stars.push(suitableStar(rating, 0));
    stars.push(suitableStar(rating, 1));
    stars.push(suitableStar(rating, 2));
    stars.push(suitableStar(rating, 3));
    stars.push(suitableStar(rating, 4));
    return stars;
}

function createImage(src, alt, h, w){
    let newImg = document.createElement("img");
    newImg.src = src;
    newImg.alt = alt;
    newImg.height = h;
    newImg.width = w;
    return newImg;
}
function createH3(title, className){
    let newH3 = document.createElement("h3");
    newH3.classList.add(className);
    if(title.length > 41) title = title.substring(0, 40) + "...";
    newH3.append(title);
    return newH3;
}
function createP(text, className, color){
    let newP = document.createElement("p");
    newP.classList.add(className);
    newP.style.color = color;
    if(text.length > 40){
        text = text.substring(0, 39);
        text += "...";
    }
    newP.append(text);
    return newP;
}
function createInlineP(text, color){
    let newP = document.createElement("p");
    newP.style.cssText = "display: inline; margin: 5px; font-size: 12px;";
    newP.style.color = color;
    newP.append(text);
    return newP;
}
function buildCart(i, item) {
    let newImg = createImage(item["image"], fields[i], "150", "260");
    let CourseName = createH3(item["title"], 'title-cart');
    let instructorName = createP(item["author"], "coures-grid-item-description", "#876f89");
    let rating = createInlineP(item["rating"] + " ", "#ce810e");
    let stars = buildStars(parseFloat(item["rating"]));
    // adding random number of people
    let retedBy = createInlineP(" (" + (Math.floor(Math.random()*10)+1) + "," + (Math.floor(Math.random()*900)+100) + ")", "#738abb")
    let price = createH3("E€ " + item["price"], "price");

    let newHeader = document.createElement("header");
    newHeader.style.cssText = "padding-left: 12px;";
    newHeader.append(CourseName);
    newHeader.appendChild(instructorName);
    newHeader.appendChild(rating);
    for(star of stars) newHeader.appendChild(star);
    newHeader.appendChild(retedBy);
    newHeader.appendChild(price);

    let newCart = document.createElement("article");
    newCart.classList.add("courses-grid-item");
    newCart.appendChild(newImg);
    newCart.appendChild(newHeader);
    return newCart;
}

// show courses cards in field 'field' and they title must match with 'match'
function showField (i, match) {
    document.getElementById('courses-field-header').textContent = headers[fields[i]];
    document.getElementById('courses-field-description').textContent = descriptions[fields[i]];
    document.getElementById('courses-field-button').textContent = "Explore " + fields[i];

    let div_carousel = document.getElementById('courses-grid-carousel-inner');
    div_carousel.innerHTML = ''; // remove all its children

    let div_of_carts = document.createElement('div');
    div_of_carts.classList.add('box-of-carts');
    let carts_added = 0;
    let flag_active = true;
    for(item of courses[fields[i]]){
        // check first if the title match the 'match' (it is guaranteed that 'match' is lower case)
        let tmpTitle = item["title"];
        tmpTitle = tmpTitle.toLowerCase();
        if(!tmpTitle.includes(match)) continue;
        
        newCart = buildCart(i, item);
        div_of_carts.appendChild(newCart);
        ++carts_added;
        if(carts_added == number_of_carts){
            carts_added = 0;
            let carousel_item = document.createElement('div');
            carousel_item.classList.add('carousel-item');
            if(flag_active){
                carousel_item.classList.add("active");
                flag_active = false;
            }
            carousel_item.appendChild(div_of_carts);
            div_of_carts = document.createElement('div');
            div_of_carts.classList.add('box-of-carts');
            div_carousel.appendChild(carousel_item);
        }
    }
    if(carts_added !== 0){
        carts_added = 0;
        let carousel_item = document.createElement('div');
        carousel_item.classList.add('carousel-item');
        if(flag_active){
            carousel_item.classList.add("active");
            flag_active = false;
        }
        carousel_item.appendChild(div_of_carts);
        div_carousel.appendChild(carousel_item);
    }
}

function showFieldRegardsToWindowWitdh() {
    let newWidth = this.window.innerWidth;
    if(newWidth <= 780){
        number_of_carts = 1;
        state = 0;
    }else if(newWidth <= 1025){
        number_of_carts = 2;
        state = 1;
    }else if(newWidth <= 1410){
        number_of_carts = 3;
        state = 2;
    }else{
        number_of_carts = 4;
        state = 3;
    }
    // refactoring data shown in fields only on state change
    if(lst_state != state){
        showField(field_index, text_in_search_bar);
        build_categories();
        lst_state = state;
    }
}

// load specialization data
async function loadData(branch) {
    // using json server
    let response = await fetch("http://localhost:3000/" + branch);
    let json = await response.json();
    return json;
}

// load all data
function loadAllData(i = 0){
    if(i === fields.length){
        showFieldRegardsToWindowWitdh();
        return;
    }
    loadData(fields[i]).then((res) => {
        courses[fields[i]] = res["courses"];
        titles[fields[i]] = res["title"];
        headers[fields[i]] = res["header"];
        descriptions[fields[i]] = res["description"];
    }).then(() => {
        loadAllData(i+1);
    })
}
// call load all data
loadAllData();



// add events for tabs
for(let i = 0; i < tabsIds.length; ++i){
    document.getElementById(tabsIds[i]).addEventListener("click", () => {
        field_index = i;
        showField(i, "");
        document.getElementById(tabsIds[i]).style.color = "black";
        for(let j = 0; j < tabsIds.length; ++j){
            if(i === j) continue;
            document.getElementById(tabsIds[j]).style.color = "#6a6f73";
        }
    })
}

// add event to search bar
document.getElementById('search-submit').addEventListener("click", () => {
    text_in_search_bar = document.getElementById('search-input').value;
    text_in_search_bar = text_in_search_bar.toLowerCase();
    showField(field_index, text_in_search_bar);
});

// when window size changes
window.addEventListener('resize', showFieldRegardsToWindowWitdh);

// stop form from reloading page
document.getElementById('search-form').addEventListener('submit', function handleForm(event) {
    event.preventDefault();
});

