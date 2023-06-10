const searchbar_contents = document.querySelector(".searchbar")
const navbar_contents = document.querySelector(".navbar")
const product_contents = document.querySelector(".product-content")

const render = async() => {
    let uri = "  http://localhost:3000/overall-content";
    const res = await fetch(uri);
    const data = await res.json();

    searchbar_data = data['searchbar'];
    navbar_data = data['navbar'];
    product_data = data['product-container'];
    
    // Searchbar contents
    let template_category_dropdown_options = '';
    searchbar_data['category'].forEach(info => {
        template_category_dropdown_options += `
                <option>${info['category-type']}</option>`;
    });

    let template_user_profile_cards = '';

    searchbar_data['searchbar-icons'].forEach((info,index) => {
        console.log(index);
        if(index===0){
            template_user_profile_cards += `
                <div class="user-profile-card flex flex-col items-center mr-1 mt-[4px] gap-[3px]">
                    <img src="${info['icon-url']}" class="profile-card-image w-[21px] h-[21px]">
                    <div class="profile-card-info text-[13px]">${info['icon']}</div> 
                </div>`;
        }else if(index===1){
            template_user_profile_cards += `
                <div class="user-profile-card flex flex-col items-center mr-[1px] mt-[4px] gap-[3px]">
                    <img src="${info['icon-url']}" class="profile-card-image w-[21px] h-[21px]">
                    <div class="profile-card-info text-[13px]">${info['icon']}</div> 
                </div>`;
        }else if(index===2){
            template_user_profile_cards += `
                <div class="user-profile-card flex flex-col items-center mr-[1px] mt-[4px] gap-[3px]">
                    <img src="${info['icon-url']}" class="profile-card-image w-[21px] h-[21px]">
                    <div class="profile-card-info text-[13px]">${info['icon']}</div> 
                </div>`;
        }else{
            template_user_profile_cards += `
                <div class="user-profile-card flex flex-col items-center mt-[4px] gap-[3px]">
                    <img src="${info['icon-url']}" class="profile-card-image w-[21px] h-[21px]">
                    <div class="profile-card-info text-[13px]">${info['icon']}</div> 
                </div>`;
        }
        
    });

    let template_searchbar = `
                    <div class="search-brand-logo-container h-fit w-fit ml-[8.8%] mr-[3%] flex-shrink-0">
                        <img src="${searchbar_data['searchbar-logo']['logo-url']}" class=" bg-white" h-[40px] w-auto>
                    </div>
                    <div class="overall-search-container flex justify-center w-[46.5%] mr-[6%]">
                        <input type="text" placeholder="Search" class="search-bar border-t-[3px] border-b-[3px] border-l-[3px] border-[#127FFF] rounded-s-lg h-[44px] w-full max-w-[420px] min-w-[320px] text-[18px] pl-[10px]">
                        <div class="dropdown-container-search">
                            <select name="" id="" class="categories border-t-[3px] border-b-[3px] border-r-[3px] border-l-[1px] border-[#127FFF] pl-[8px] text-[18px] h-[44px] w-full max-w-[180px] min-w-[148px]">
                                ${searchbar_data['category'].map(info => `
                                <option>${info['category-type']}</option>`).join()}
                            </select>
                        </div>
                        <div class="button-container-search h-[45px]">
                            <button class="search-button bg-[#127FFF] text-white rounded-e-lg text-[18px] h-[44px] w-[100px]">Search</button>
                        </div>
                    </div>
                    <div class="search-user-profile-container flex gap-[18px]">
                        ${template_user_profile_cards}
                    </div>`;


    //Navbar contents

    //Navbar contents left
    navbar_contents_left = '';

    navbar_data['navbar-left'].forEach((info,index) => {
        
        content_string='';
        if (index===0){
            content_string += `
                <img src="${info['icon-first']}" class="menubar mr-[10px] h-[18px] w-[18px]">
                <div class="text-[18px] mr-[25px]">${info['content']}</div>`;

        }else if(index===navbar_data['navbar-left'].length-1){
            content_string += `
                <div class="text-[18px]">${info['content']}</div>
                <img src="${info['icon-second']}" class="dropdown ml-2 h-[10px] w-[10px]">`;
        }else{
            content_string += `
                <div class="text-[18px] mr-[30px]">${info['content']}</div>
            `;
        }

        navbar_contents_left += `
            <div class="navbar-container-left-option flex items-center font-sans">
                ${content_string}
            </div>
        `;
    });

    //Navbar contents right
    navbar_contents_right_language_options = ``;
    navbar_contents_right_country = ``;
    navbar_contents_right_country_options = ``;
    navbar_contents_right = ``;

    navbar_data['navbar-right']['language'].forEach(info => {
        navbar_contents_right_language_options += `
            <option>${info['type']}</option>
        `;
    });

    navbar_data['navbar-right']['shipment']['logo'].forEach(info =>{
        navbar_contents_right_country_options += `
            <div class="country-options flex items-center mb-1" onclick="select('${info['country']}')">
                <img src="${info['logo-img']}" class="navbar-country-icon-dropdown h-5" id="${info['country']}"><span>${info['country']}</span>
            </div>
        `;
    });

    navbar_contents_right_country += `
        <div class="navbar-country-dropdown-container flex flex-col w-fit justify-center items-center h-auto">
            <div class="navbar-country-dropdown flex items-center" onclick="dropdown()">
                <div class="navbar-country-ship-to mr-[6px] text-[18px]">${navbar_data['navbar-right']['shipment']['content']}</div>
                <img src="${navbar_data['navbar-right']['shipment']['logo'][0]['logo-img']}" class="navbar-country-icon h-[22px] w-[22px] mr-4">
                <img src="${navbar_data['navbar-right']['shipment']['dropdown-logo']}"  class="country-dropdownarrow h-2 w-2">
            </div>
            <div class="navbar-country-dropdown-options hidden flex-col w-fit mt-2 max-h-20 overflow-y-scroll absolute text-lg top-16 bg-slate-400 rounded-md">
                ${navbar_contents_right_country_options}    
            </div>
        </div>
    `;

    navbar_contents_right += `
    <div class="navbar-language-dropdown-container h-full mr-10">
        <select name="" id="" class="navbar-language-dropdown h-full border-none outline-none appearance-none text-[18px] mt-[2px] mr-[20px]">
            ${navbar_contents_right_language_options}
        </select>
    </div>
    ${navbar_contents_right_country}`;
    
    let template_navbar = `
        <div class="navbar-container-left flex bg-white ml-[136px] mr-[303px]">
            ${navbar_contents_left}  
        </div>
        <div class="navbar-container-right flex bg-white">
            ${navbar_contents_right}
        </div>
    `;

    //Product container

    //Product directory container
    let template_product_container_directory_whole = ``;
    let template_product_container_directory = ``;

    product_data['directory']['directory_category'].forEach((info,index) => {
        if(index ===  product_data['directory']['directory_category'].length-1){
            template_product_container_directory += `
            <div class="directory flex gap-1 font-sans">
                <div>${info.directory_category_name}</div>
            </div>
        `; 
        }else{
            template_product_container_directory += `
            <div class="directory flex gap-1 font-sans items-center">
                <div>${info.directory_category_name}</div>
                <img src="${product_data['directory']["directory-arrow-img"]}">
            </div>
        `; 
        }
    });

    template_product_container_directory_whole += `
    <div class="directory-container flex gap-5">
        ${template_product_container_directory}
    </div>
    `;

    //Product main container
    template_product_main_container = `
        <div class="product-sample-container">
            <div class="product-images-container flex flex-col w-52">
                <div class="product-main-image-container flex w-52 h-52 justify-center items-center mb-3 bg-orange-500">
                    <img src="${product_data['product-sample-container']['product-images']['product-main-image']}" class="product-main-image h-52 w-auto">
                </div>
                <div class="product-other-images-container flex w-fit gap-1">
                    <div class="product-other-image-container">
                        <img src="${product_data['product-sample-container']['product-images']['product-other-image'][0]['image']}" class="product-other-image" id="product-image-1" onclick="change_image('product-image-1')">
                    </div>
                    <div class="product-other-image-container">
                        <img src="${product_data['product-sample-container']['product-images']['product-other-image'][1]['image']}" class="product-other-image" id="product-image-2" onclick="change_image('product-image-2')">
                    </div>
                    <div class="product-other-image-container">
                        <img src="${product_data['product-sample-container']['product-images']['product-other-image'][2]['image']}" class="product-other-image" id="product-image-3" onclick="change_image('product-image-3')">
                    </div>
                    <div class="product-other-image-container">
                        <img src="${product_data['product-sample-container']['product-images']['product-other-image'][3]['image']}" class="product-other-image" id="product-image-4" onclick="change_image('product-image-4')">
                    </div>
                    <div class="product-other-image-container">
                        <img src="${product_data['product-sample-container']['product-images']['product-other-image'][4]['image']}" class="product-other-image" id="product-image-5" onclick="change_image('product-image-5')">
                    </div>
                    <div class="product-other-image-container">
                        <img src="${product_data['product-sample-container']['product-images']['product-other-image'][5]['image']}" class="product-other-image" id="product-image-6" onclick="change_image('product-image-6')">
                    </div>
                </div>
            </div>
            <div class="product-info-container">

            </div>
        </div>
    `;

    // console.log(template_product_main_container);

    let template_product_container = `
    <div class="product-content ml-16 mr-16 bg-gray-500">
        ${template_product_container_directory_whole}
        ${template_product_main_container}
    <div>
    `;

   


    searchbar_contents.innerHTML = template_searchbar;
    navbar_contents.innerHTML = template_navbar;
    product_contents.innerHTML = template_product_container;

}

window.addEventListener('DOMContentLoaded',() => render());

//functions
function dropdown(){
    var x = document.querySelector(".navbar-country-dropdown-options")
    if (x.style.display === "none"){
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}

function select(country){
    var x = document.getElementById(country);
    var img = x.getAttribute("src");
    var icon = document.querySelector(".navbar-country-icon")
    icon.setAttribute("src",img)
}

function change_image(id){
    var x = document.getElementById(id);
    var img = x.getAttribute("src");
    var main_img = document.querySelector(".product-main-image");
    main_img.setAttribute("src",img);

    let str = "product-image-"
    for(var i=1;i<7;i++){
        str += i;
        y = document.getElementById(str)
        if(id === str){
            y.parentNode.style.border = "1px solid black";
        }else{
            y.parentNode.style.border = "1px solid #ccc";
        }
        str = "product-image-"
    }
}

