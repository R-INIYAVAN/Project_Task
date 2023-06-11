const searchbar_contents = document.querySelector(".searchbar");
const navbar_contents = document.querySelector(".navbar");
const product_contents = document.querySelector(".product-content");
const product_description_container = document.querySelector(".product-description-container");
const you_may_like =document.querySelector(".you-may-like");
const related_products = document.querySelector(".related-products")
const ad =document.querySelector(".ad-container");
const footer = document.querySelector(".footer-container")

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
        // console.log(index);
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
                    <div class="search-brand-logo-container h-fit w-fit flex-shrink-0">
                        <img src="${searchbar_data['searchbar-logo']['logo-url']}" class=" bg-white" h-[40px] w-auto>
                    </div>
                    <div class="overall-search-container flex justify-center w-[46.5%] ml-[60px] ">
                        <input type="text" placeholder="Search" class="search-bar border-t-[3px] border-b-[3px] border-l-[3px] border-[#127FFF] rounded-s-lg h-[44px] w-full max-w-[420px] min-w-[320px] text-[18px] pl-[10px]">
                        <select name="" id="" class="categories border-t-[3px] border-b-[3px] border-r-[3px] border-l-[1px] border-[#127FFF] pl-[8px] text-[18px] h-[44px] w-full max-w-[180px] min-w-[148px]">
                            ${searchbar_data['category'].map(info => `
                            <option>${info['category-type']}</option>`).join()}
                        </select>
                        <button class="search-button bg-[#127FFF] text-white rounded-e-lg text-[18px] h-[44px] w-[100px]">Search</button>
                    </div>
                    <div class="search-user-profile-container flex gap-[18px] ml-[100px]">
                        ${template_user_profile_cards}
                    </div>`;


    //Navbar contents

    //Navbar contents left
    navbar_contents_left = '';

    navbar_data['navbar-left'].forEach((info,index) => {
        
        content_string='';
        if (index===0){
            content_string += `
                <img src="${info['icon-first']}" class="menubar mr-[5px] h-[18px] w-[18px]">
                <div class="text-[18px] mr-[23px]">${info['content']}</div>`;

        }else if(index===navbar_data['navbar-left'].length-1){
            content_string += `
                <div class="text-[18px]">${info['content']}</div>
                <img src="${info['icon-second']}" class="dropdown ml-2 h-[10px] w-[10px]">`;
        }else{
            content_string += `
                <div class="text-[18px] mr-[27px]">${info['content']}</div>
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
        <div class="navbar-container-left flex bg-white ml-[136px] mr-[290px]">
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
            <div class="directory flex font-sans">
                <div>${info.directory_category_name}</div>
            </div>
        `; 
        }else{
            template_product_container_directory += `
            <div class="directory flex gap-[5px] font-sans items-center">
                <div class="text-[16px]">${info.directory_category_name}</div>
                <img src="${product_data['directory']["directory-arrow-img"]}">
            </div>
        `; 
        }
    });

    template_product_container_directory_whole += `
    <div class="directory-container flex gap-[19px]">
        ${template_product_container_directory}
    </div>
    `;

    //Product main container
    template_product_main_container = `
    <div class="flex bg-[#ffffff] gap-[25px] ml-auto mr-auto border-[1px] border-[#dee2e7] rounded-[6px] w-fit px-[20px] pt-[20px] pb-[45px]">
        <div class="product-sample-container">
            <div class="product-images-container flex flex-col w-fit">
                <div class="product-main-image-container flex w-[380px] h-[380px] justify-center items-center mb-3 bg-[#ffffff] border-solid border-[1px] border-[#DEE2E7] rounded-[6px]">
                    <img src="${product_data['product-sample-container']['product-images']['product-main-image']}" class="product-main-image h-[378px] w-auto">
                </div>
                <div class="product-other-images-container flex w-fit gap-[9px]">
                    <div class="product-other-image-container flex w-[56px] h-[56px] justify-center items-center border-solid border-[1px] border-[#DEE2E7] rounded-[4px]">
                        <img src="${product_data['product-sample-container']['product-images']['product-other-image'][0]['image']}" class="product-other-image" id="product-image-1" onclick="change_image('product-image-1')">
                    </div>
                    <div class="product-other-image-container flex w-[56px] h-[56px] justify-center items-center border-solid border-[1px] border-[#DEE2E7] rounded-[4px]">
                        <img src="${product_data['product-sample-container']['product-images']['product-other-image'][1]['image']}" class="product-other-image" id="product-image-2" onclick="change_image('product-image-2')">
                    </div>
                    <div class="product-other-image-container flex w-[56px] h-[56px] justify-center items-center border-solid border-[1px] border-[#DEE2E7] rounded-[4px]">
                        <img src="${product_data['product-sample-container']['product-images']['product-other-image'][2]['image']}" class="product-other-image" id="product-image-3" onclick="change_image('product-image-3')">
                    </div>
                    <div class="product-other-image-container flex w-[56px] h-[56px] justify-center items-center border-solid border-[1px] border-[#DEE2E7] rounded-[4px]">
                        <img src="${product_data['product-sample-container']['product-images']['product-other-image'][3]['image']}" class="product-other-image" id="product-image-4" onclick="change_image('product-image-4')">
                    </div>
                    <div class="product-other-image-container flex w-[56px] h-[56px] justify-center items-center border-solid border-[1px] border-[#DEE2E7] rounded-[4px]">
                        <img src="${product_data['product-sample-container']['product-images']['product-other-image'][4]['image']}" class="product-other-image" id="product-image-5" onclick="change_image('product-image-5')">
                    </div>
                    <div class="product-other-image-container flex w-[56px] h-[56px] justify-center items-center border-solid border-[1px] border-[#DEE2E7] rounded-[4px]">
                        <img src="${product_data['product-sample-container']['product-images']['product-other-image'][5]['image']}" class="product-other-image" id="product-image-6" onclick="change_image('product-image-6')">
                    </div>
                </div>
            </div>
        </div>
        <div class="product-about-price flex w-[430px] flex-col">
            <div class="product-price flex flex-col border-b-[1px] border-[#E0E0E0] pb-[16px] mb-[16px]">
                <div class="product-in-stock flex gap-[5px] mb-[5px]">
                    <img src="../images/product_container/product_info/icons/Tick.svg">
                    <div class="text-[#00B517]">In stock</div>
                </div>
                <div class="product-name flex font-sans font-[600] text-[20px] leading-[28px] tracking-[-0.2px] text-[#1c1c1c] mb-[10px]">
                    Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle
                </div>
                <div class="product-rating-review-sold flex mb-[10px]">
                    <div class="product-rating flex items-center gap-[10px]">
                        <div class="product-rating-stars flex">
                            <img src="../images/product_container/product_info/icons/star.svg">
                            <img src="../images/product_container/product_info/icons/star.svg">
                            <img src="../images/product_container/product_info/icons/star.svg">
                            <img src="../images/product_container/product_info/icons/star.svg">
                            <img src="../images/product_container/product_info/icons/star.svg">
                        </div>
                        <div class="product-rating-value font-sans flex font-[400] text-[16px] text-[#787A80]">
                            9.3
                        </div>
                    </div>
                    <img src="../images/product_container/product_info/icons/Dot.svg" class="mr-[10px] ml-[10px]">
                    <div class="product-review flex gap-[10px] font-sans font-[400] text-[16px] text-[#787A80]">
                        <img src="../images/product_container/product_info/icons/reviews.svg">
                        <div>32 reviews</div>
                    </div>
                    <img src="../images/product_container/product_info/icons/Dot.svg" class="mr-[10px] ml-[10px]">
                    <div class="product-sold flex gap-[10px] font-sans font-[400] text-[16px] text-[#787A80]">
                        <img src="../images/product_container/product_info/icons/sold.svg">
                        <div>154 sold</div>
                    </div>
                </div>
                <div class="product-price-piece flex bg-[#FFF0DF] pl-[15px] py-[15px] gap-[10px] h-[72px] mb-[20px]">
                    <div class="product-price-1 flex flex-col pr-[42px] border-r-[1px] border-[#BDC1C8]">
                        <div class="font-sans font-[600] text-[18px] leading-[22px] text-[#FA3434]">$98.00</div>
                        <div class="font-sans font-[400] text-[13px] leading-[16px] text-[#606060]">50 - 100 pcs</div>
                    </div>
                    <div class="product-price-2 flex flex-col pr-[42px] border-r-[1px] border-[#BDC1C8]">
                        <div class="font-sans font-[600] text-[18px] leading-[22px] text-[#1c1c1c]">$90.00</div>
                        <div class="font-sans font-[400] text-[13px] leading-[16px] text-[#606060]">100 - 700 pcs</div>
                    </div>
                    <div class="product-price-3 flex flex-col pr-[42px]">
                        <div class="font-sans font-[600] text-[18px] leading-[22px] text-[#1c1c1c]">$78.00</div>
                        <div class="font-sans font-[400] text-[13px] leading-[16px] text-[#606060]">700+ pcs</div>
                    </div>
                </div>
                <div class="product-price-description flex gap-[100px]">
                    <div class="product-price-heading flex text-[#8B96A5]">
                        Price:
                    </div>
                    <div class="product-price-value flex text-[#505050]">
                        Negotiable
                    </div>
                </div>
            </div>

            <div>
                <div class="product-price-description flex gap-[74px] pb-[16px] border-b-[1px] border-[#E0E0E0] mb-[16px]">
                    <div class="product-price-heading flex flex-col w-fit gap-[16px] text-[#8B96A5]">
                        <div>Type:</div>
                        <div>Material:</div>
                        <div>Design:</div>
                    </div>
                    <div class="product-price-value flex flex-col gap-[16px] text-[#505050]">
                        <div>Classic Shoes</div>
                        <div>Plastic Material</div>
                        <div>Modern nice</div>
                    </div>
                </div>
            </div>

            <div>
                <div class="product-price-description flex gap-[27px] pb-[16px] border-b-[1px] border-[#E0E0E0] mb-[16px]">
                    <div class="product-price-heading flex flex-col w-fit gap-[16px] text-[#8B96A5]">
                        <div class="mb-[23px]">Customization:</div>
                        <div>Protection:</div>
                        <div>Warranty:</div>
                    </div>
                    <div class="product-price-value flex flex-col gap-[16px] text-[#505050]">
                        <div>Customized logo and design custom packages</div>
                        <div>Refund Policy</div>
                        <div>2 years full warranty</div>
                    </div>
                </div>
            </div>
        </div>


        <div class="overall-buy-container flex flex-col w-fit">
            <div class="buy-container flex flex-col bg-[#ffffff] border-solid border-[#DEE2E7] rounded-[6px] mb-[25px]" style="box-shadow:0px 1px 2px rgba(56,56,56,0.35) ;">
                <div class="supplier flex mt-[19px] ml-[16px] gap-[11px] border-b border-b-[#E0E0E0] pb-[20px] mr-[16px] w-[248px]">
                    <div class="supplier-logo-container flex bg-[#C6F3F1] w-[48px] h-[48px] justify-center items-center">
                        <div>R</div>
                    </div>
                    <div class="supplier-name flex flex-col justify-center font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] color-[#1C1C1C]">
                        <div class="supplier-heading">Supplier</div>
                        <div class="supplier-name">Guanjoi Trading LLC</div>
                    </div>
                </div>
                <div class="supplier-details flex row ml-[16px] mt-[16px] gap-[17px] mb-[30px]">
                    <div class="supplier-detail-icon flex flex-col justify-between w-[21px] items-center">
                        <img src="../images/product_container/product_buy/flag.svg">
                        <img src="../images/product_container/product_buy/verified.svg" class="verified-icon w-[15px]">
                        <img src="../images/product_container/product_buy/globe.svg" class="globe-icon w-[16px]">
                    </div>
                    <div class="supplier-detail-information flex flex-col font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] color-[#8B96A5] gap-[10px]">
                        <div>Germany, Berlin</div>
                        <div>Verified Seller</div>
                        <div>Worldwide shipping</div>
                    </div>
                </div>
                <div class="buy-buttons flex flex-col ml-[16px] mr-[16px] gap-[5px] mb-[21px] w-[248px]">
                    <div class="buy-now-button w-full flex justify-center items-center bg-[#0067FF] py-[9px] rounded-[6px] font-sans font-[500] text-[16px] text-[#ffffff]">Buy Now</div>
                    <div class="add-to-cart w-full flex justify-center items-center text-[#0067FF] py-[9px] rounded-[6px] font-sans font-[500] text-[16px] bg-[#ffffff] border-solid border-[1px]">Add to Cart</div>
                </div>
            </div>
            <div class="save-for-later flex justify-center gap-[10px] font-sans font-[500] text-[16px] leading-[24px] tracking-[-0.1px] text-[#0D6EFD]">
                <img src="../images/product_container/product_buy/Vector.svg" onclick="">
                <div>Save for later</div>
            </div>      
        </div>
    </div>
    `;

    // console.log(template_product_main_container);

    let template_product_container = `
        ${template_product_container_directory_whole}
        ${template_product_main_container}
    `;

    //Product description

    let template_product_description = ``;

    template_product_description += `
    <div class="product-description-heading-container flex border-b-solid border-b-[1px] border-[#DEE2E7] mt-[15px] gap-[20px]">
        <div class="product-description-heading flex font-sans font-[500] text-[16px] leading-[19px] text-[#8b96a5] pb-[10px] pl-[10px] pr-[10px]" onclick="change_container('Description','Des')" id="Des">Description</div>
        <div class="product-description-heading flex font-sans font-[500] text-[16px] leading-[19px] text-[#8b96a5] pb-[10px] pl-[10px] pr-[10px]" onclick="change_container('Reviews','Rev')" id="Rev">Reviews</div>
        <div class="product-description-heading flex font-sans font-[500] text-[16px] leading-[19px] text-[#8b96a5] pb-[10px] pl-[10px] pr-[10px]" onclick="">Shipping</div>
        <div class="product-description-heading flex font-sans font-[500] text-[16px] leading-[19px] text-[#8b96a5] pb-[10px] pl-[10px] pr-[10px]" onclick="">About Seller</div>
    </div>
    <div class="product-description-data-container flex flex-col" id="Description">
        <div class="product-description font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] w-[800px] h-[170px] ml-[20px] mt-[20px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        </div>
        <div class="product-grid grid  border-solid border-[0.5px] border-[#E0E7E9] ml-[20px] w-fit" style="grid-template-columns: 205px 410px; grid-template-rows: repeat(5, 35px);">
            <div class="grid-item heading bg-[#EFF2F4] border-solid border-[0.5px] border-[#E0E7E9] pl-[10px] font-sans font-[400] text-16px leading-[24px] tracking-[-0.2px] text-[#505050] flex items-center">Model</div>
            <div class="grid-item value bg-[#ffffff] border-solid border-[0.5px] border-[#E0E7E9] pl-[10px] font-sans font-[400] text-16px leading-[24px] tracking-[-0.2px] text-[#505050] flex items-center">#8786867</div>
            <div class="grid-item heading bg-[#EFF2F4] border-solid border-[0.5px] border-[#E0E7E9] pl-[10px] font-sans font-[400] text-16px leading-[24px] tracking-[-0.2px] text-[#505050] flex items-center">Style</div>
            <div class="grid-item value bg-[#ffffff] border-solid border-[0.5px] border-[#E0E7E9] pl-[10px] font-sans font-[400] text-16px leading-[24px] tracking-[-0.2px] text-[#505050] flex items-center">Classic style</div>
            <div class="grid-item heading bg-[#EFF2F4] border-solid border-[0.5px] border-[#E0E7E9] pl-[10px] font-sans font-[400] text-16px leading-[24px] tracking-[-0.2px] text-[#505050] flex items-center">Certificate</div>
            <div class="grid-item value bg-[#ffffff] border-solid border-[0.5px] border-[#E0E7E9] pl-[10px] font-sans font-[400] text-16px leading-[24px] tracking-[-0.2px] text-[#505050] flex items-center">ISO-898921212</div>
            <div class="grid-item heading bg-[#EFF2F4] border-solid border-[0.5px] border-[#E0E7E9] pl-[10px] font-sans font-[400] text-16px leading-[24px] tracking-[-0.2px] text-[#505050] flex items-center">Size</div>
            <div class="grid-item value bg-[#ffffff] border-solid border-[0.5px] border-[#E0E7E9] pl-[10px] font-sans font-[400] text-16px leading-[24px] tracking-[-0.2px] text-[#505050] flex items-center">34mm x 450mm x 19mm</div>
            <div class="grid-item heading bg-[#EFF2F4] border-solid border-[0.5px] border-[#E0E7E9] pl-[10px] font-sans font-[400] text-16px leading-[24px] tracking-[-0.2px] text-[#505050] flex items-center">Memory</div>
            <div class="grid-item value bg-[#ffffff] border-solid border-[0.5px] border-[#E0E7E9] pl-[10px] font-sans font-[400] text-16px leading-[24px] tracking-[-0.2px] text-[#505050] flex items-center">36GB RAM</div>
        </div>

        <div class="feature-container flex flex-col mt-[33px] gap-[10px] mb-[30px]">
            <div class="feature flex gap-[10px] ml-[20px] font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] color-[#505050]">
                <img src="../images/product_description/grey tick.svg">
                <div>Some great feature name here</div>
            </div>
            <div class="feature flex gap-[10px] ml-[20px] font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] color-[#505050]">
                <img src="../images/product_description/grey tick.svg">
                <div>Lorem ipsum dolor sit amet, consectetur</div>
            </div>
            <div class="feature flex gap-[10px] ml-[20px] font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] color-[#505050]">
                <img src="../images/product_description/grey tick.svg">
                <div>Duis aute irure dolor in reprehenderit</div>
            </div>
            <div class="feature flex gap-[10px] ml-[20px] font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] color-[#505050]">
                <img src="../images/product_description/grey tick.svg">
                <div>Some great feature name here</div>
            </div>
        </div>
    </div>


    <div class="user-reviews hidden flex-col ml-[15px] mt-[15px] gap-[20px] pb-[20px]" id="Reviews">
        <div class="user-review font-sans text-[14px] font-bold w-fit">
            <div class="user flex items-center w-[15%] gap-[10px] mb-[5px]">
                <img src="../images/product_description/user-132.svg" class="user-pfp w-[35px]">
                <div class="user-id font-sans text-[16px] font-[500] color-[#505050]">ANIL</div>
            </div>
            <div class="product-rating flex gap-[10px] items-center mb-[5px]">
                <div class="rating-stars flex">
                    <img src="../images/product_container/product_info/icons/star.svg">
                    <img src="../images/product_container/product_info/icons/star.svg">
                    <img src="../images/product_container/product_info/icons/star.svg">
                    <img src="../images/product_container/product_info/icons/star.svg">
                    <img src="../images/product_container/product_info/icons/star.svg">
                </div>
                <div class="user-review font-sans text-[14px] font-bold w-fit">Good product</div>
            </div>
            <div class="user-review-comment flex font-normal mb-[5px]">Good in looks,a little doubt about durability of the product.</div>
            <div class="bought-on flex font-sans font-light text-[12px]">bought on 19 April 2019</div>
        </div>

        <div class="user-review font-sans text-[14px] font-bold w-fit">
            <div class="user flex items-center w-[15%] gap-[10px] mb-[5px]">
                <img src="../images/product_description/user-132.svg" class="user-pfp w-[35px]">
                <div class="user-id font-sans text-[16px] font-[500] color-[#505050]">ANIL</div>
            </div>
            <div class="product-rating flex gap-[10px] items-center mb-[5px]">
                <div class="rating-stars flex">
                    <img src="../images/product_container/product_info/icons/star.svg">
                    <img src="../images/product_container/product_info/icons/star.svg">
                    <img src="../images/product_container/product_info/icons/star.svg">
                    <img src="../images/product_container/product_info/icons/star.svg">
                    <img src="../images/product_container/product_info/icons/star.svg">
                </div>
                <div class="user-review font-sans text-[14px] font-bold w-fit">Good product</div>
            </div>
            <div class="user-review-comment flex font-normal mb-[5px]">Good in looks,a little doubt about durability of the product.</div>
            <div class="bought-on flex font-sans font-light text-[12px]">bought on 19 April 2019</div>
        </div>

        <div class="user-review font-sans text-[14px] font-bold w-fit">
            <div class="user flex items-center w-[15%] gap-[10px] mb-[5px]">
                <img src="../images/product_description/user-132.svg" class="user-pfp w-[35px]">
                <div class="user-id font-sans text-[16px] font-[500] color-[#505050]">ANIL</div>
            </div>
            <div class="product-rating flex gap-[10px] items-center mb-[5px]">
                <div class="rating-stars flex ">
                    <img src="../images/product_container/product_info/icons/star.svg">
                    <img src="../images/product_container/product_info/icons/star.svg">
                    <img src="../images/product_container/product_info/icons/star.svg">
                    <img src="../images/product_container/product_info/icons/star.svg">
                    <img src="../images/product_container/product_info/icons/star.svg">
                </div>
                <div class="user-review font-sans text-[14px] font-bold w-fit">Good product</div>
            </div>
            <div class="user-review-comment flex font-normal mb-[5px]">Good in looks,a little doubt about durability of the product.</div>
            <div class="bought-on flex font-sans font-light text-[12px]">bought on 19 April 2019</div>
        </div>

        <div class="user-review font-sans text-[14px] font-bold w-fit">
            <div class="user flex items-center w-[15%] gap-[10px] mb-[5px]">
                <img src="../images/product_description/user-132.svg" class="user-pfp w-[35px]">
                <div class="user-id font-sans text-[16px] font-[500] color-[#505050]">ANIL</div>
            </div>
            <div class="product-rating flex gap-[10px] items-center mb-[5px]">
                <div class="rating-stars flex">
                    <img src="../images/product_container/product_info/icons/star.svg">
                    <img src="../images/product_container/product_info/icons/star.svg">
                    <img src="../images/product_container/product_info/icons/star.svg">
                    <img src="../images/product_container/product_info/icons/star.svg">
                    <img src="../images/product_container/product_info/icons/star.svg">
                </div>
                <div class="user-review font-sans text-[14px] font-bold w-fit">Good product</div>
            </div>
            <div class="user-review-comment flex font-normal mb-[5px]">Good in looks,a little doubt about durability of the product.</div>
            <div class="bought-on flex font-sans font-light text-[12px]">bought on 19 April 2019</div>
        </div>
    </div>
    `;


    //You may like  
    let template_you_may_like = '';
    template_you_may_like += `
    <div class="you-may-like-heading flex font-sans font-[600] text-[16px] leading-[19px] ml-[15px] mt-[20px]">
        <div>You may like</div>
    </div>
    <div class="you-may-like-contents flex flex-col gap-[16px] mt-[15px] ml-[15px] mr-[22px] mb-[35px]">
        <div class="content-card flex gap-[16px]">
            <div class="content-image-container flex h-[70px] w-[95px] bg-[#ffffff] justify-center items-center border-solid border-[1px] border-[#e0e0e0] rounded-[6px]">
                <img src="../images/you may like/2 1.svg" class="content-image h-[50px] w-[50px]">
            </div>
            <div class="content-card-info flex flex-col gap-[5px] justify-center">
                <div class="content-name font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#1c1c1c]">Men Blazers Sets Elegant Formal</div>
                <div class="content-price font-sans font-[400] text-[16px] tracking-[-0.2px] text-[#8b96a5]">$7.00 - $99.50</div>
            </div>
        </div>
        <div class="content-card flex gap-[16px]">
            <div class="content-image-container flex h-[70px] w-[95px] bg-[#ffffff] justify-center items-center border-solid border-[1px] border-[#e0e0e0] rounded-[6px]">
                <img src="../images/you may like/Bitmap.svg" class="content-image h-[50px] w-[50px]">
            </div>
            <div class="content-card-info flex flex-col gap-[5px] justify-center">
                <div class="content-name font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#1c1c1c]">Men Blazers Sets Elegant Formal</div>
                <div class="content-price font-sans font-[400] text-[16px] tracking-[-0.2px] text-[#8b96a5]">$7.00 - $99.50</div>
            </div>
        </div>
        <div class="content-card flex gap-[16px]">
            <div class="content-image-container flex h-[70px] w-[95px] bg-[#ffffff] justify-center items-center border-solid border-[1px] border-[#e0e0e0] rounded-[6px]">
                <img src="../images/you may like/image 25.svg" class="content-image h-[50px] w-[50px]">
            </div>
            <div class="content-card-info flex flex-col gap-[5px] justify-center">
                <div class="content-name font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#1c1c1c]">Men Blazers Sets Elegant Formal</div>
                <div class="content-price font-sans font-[400] text-[16px] tracking-[-0.2px] text-[#8b96a5]">$7.00 - $99.50</div>
            </div>
        </div>
        <div class="content-card flex gap-[16px]">
            <div class="content-image-container flex h-[70px] w-[95px] bg-[#ffffff] justify-center items-center border-solid border-[1px] border-[#e0e0e0] rounded-[6px]">
                <img src="../images/you may like/image 26.svg" class="content-image h-[50px] w-[50px]">
            </div> 
            <div class="content-card-info flex flex-col gap-[5px] justify-center">
                <div class="content-name font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#1c1c1c]">Men Blazers Sets Elegant Formal</div>
                <div class="content-price font-sans font-[400] text-[16px] tracking-[-0.2px] text-[#8b96a5]">$7.00 - $99.50</div>
            </div>
        </div>
        <div class="content-card flex gap-[16px]">
            <div class="content-image-container flex h-[70px] w-[95px] bg-[#ffffff] justify-center items-center border-solid border-[1px] border-[#e0e0e0] rounded-[6px]">
                <img src="../images/you may like/image 30.svg" class="content-image h-[50px] w-[50px]">
            </div>
            <div class="content-card-info flex flex-col gap-[5px] justify-center">
                <div class="content-name font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#1c1c1c]">Men Blazers Sets Elegant Formal</div>
                <div class="content-price font-sans font-[400] text-[16px] tracking-[-0.2px] text-[#8b96a5]">$7.00 - $99.50</div>
            </div>
        </div>
    </div>
    `;

    //Related_products
    template_related_products = `
        <div class="related-products-heading font-sans font-[600] text-[20px] leading-[28px] tracking-[-0.2px] color-[#1c1c1c] mt-[20px] ml-[22px]">
            <div>Related products</div>
        </div>
        <div class="related-products-contents flex gap-[27px] mt-[25px] ml-[22px] mb-[35px] mr-[25px]">
            <div class="related-product-card flex flex-col gap-[15px]">
                <div class="related-product-image-container bg-[#eeeeee] rounded-[6px] w-[172px] h-[172px] flex justify-center items-center">
                    <img src="../images/related products/Bitmap.svg" class="related-product-image bg-[#eeeeee]">
                </div>
                <div class="related-product-info flex flex-col gap-[10px]">
                    <div class="related-product-name font-sans font-[400] text-[16px] leading-[19px] text-[#505050]">Xiaomi Redmi 8 Original</div>
                    <div class="related-product-price font-sans font-[400] text-[16px] leading-[19px] text-[#8b96a5]">$32.00 - $40.00</div>
                </div>
            </div>
            <div class="related-product-card flex flex-col gap-[15px]">
                <div class="related-product-image-container bg-[#eeeeee] rounded-[6px] w-[172px] h-[172px] flex justify-center items-center">
                    <img src="../images/related products/image 24.svg" class="related-product-image bg-[#eeeeee]">
                </div>
                <div class="related-product-info flex flex-col gap-[10px]">
                    <div class="related-product-name font-sans font-[400] text-[16px] leading-[19px] text-[#505050]">Xiaomi Redmi 8 Original</div>
                    <div class="related-product-price font-sans font-[400] text-[16px] leading-[19px] text-[#8b96a5]">$32.00 - $40.00</div>
                </div>
            </div>
            <div class="related-product-card flex flex-col gap-[15px]">
                <div class="related-product-image-container bg-[#eeeeee] rounded-[6px] w-[172px] h-[172px] flex justify-center items-center">
                    <img src="../images/related products/image 35.svg" class="related-product-image bg-[#eeeeee]">
                </div>
                <div class="related-product-info flex flex-col gap-[10px]">
                    <div class="related-product-name font-sans font-[400] text-[16px] leading-[19px] text-[#505050]">Xiaomi Redmi 8 Original</div>
                    <div class="related-product-price font-sans font-[400] text-[16px] leading-[19px] text-[#8b96a5]">$32.00 - $40.00</div>
                </div>
            </div>
            <div class="related-product-card flex flex-col gap-[15px]">
                <div class="related-product-image-container bg-[#eeeeee] rounded-[6px] w-[172px] h-[172px] flex justify-center items-center">
                    <img src="../images/related products/image 85.svg" class="related-product-image bg-[#eeeeee]">
                </div>
                <div class="related-product-info flex flex-col gap-[10px]">
                    <div class="related-product-name font-sans font-[400] text-[16px] leading-[19px] text-[#505050]">Xiaomi Redmi 8 Original</div>
                    <div class="related-product-price font-sans font-[400] text-[16px] leading-[19px] text-[#8b96a5]">$32.00 - $40.00</div>
                </div>
            </div>
            <div class="related-product-card flex flex-col gap-[15px]">
                <div class="related-product-image-container bg-[#eeeeee] rounded-[6px] w-[172px] h-[172px] flex justify-center items-center">
                    <img src="../images/related products/image 86.svg" class="related-product-image bg-[#eeeeee]">
                </div>
                <div class="related-product-info flex flex-col gap-[10px]">
                    <div class="related-product-name font-sans font-[400] text-[16px] leading-[19px] text-[#505050]">Xiaomi Redmi 8 Original</div>
                    <div class="related-product-price font-sans font-[400] text-[16px] leading-[19px] text-[#8b96a5]">$32.00 - $40.00</div>
                </div>
            </div>
            <div class="related-product-card flex flex-col gap-[15px]">
                <div class="related-product-image-container bg-[#eeeeee] rounded-[6px] w-[172px] h-[172px] flex justify-center items-center">
                    <img src="../images/related products/rasm.svg" class="related-product-image bg-[#eeeeee]">
                </div>
                <div class="related-product-info flex flex-col gap-[10px]">
                    <div class="related-product-name font-sans font-[400] text-[16px] leading-[19px] text-[#505050]">Xiaomi Redmi 8 Original</div>
                    <div class="related-product-price font-sans font-[400] text-[16px] leading-[19px] text-[#8b96a5]">$32.00 - $40.00</div>
                </div>
            </div>
        </div>
    `;

    //Ad

    let template_ad = '';
    template_ad = `
    <div class="ad-description flex bg-[#237cff] h-full justify-center flex-col rounded-s-[8px] pl-[30px] pr-[260px]">
        <div class="ad-description-main font-sans font-[600] text-[24px] leading-[32px] text-[#ffffff] tracking-[-0.2px]">Super discount on more than 100 USD</div>
        <div class="ad-description-sub font-sans font-[400] text-[16px] leading-[19px] text-[#ffffff]">Have you ever finally just write dummy info</div>
    </div>
    <div class="ad-button-container flex items-center rounded-e-[8px] pr-[45px] pl-[280px]">
        <button class="ad-button border-hidden py-[11px] px-[16px] rounded-[6px] bg-[#ff9017] font-sans font-[500] text-[16px] leading-[19px] text-[#ffffff]">Shop now</button>
    </div>
    `;

    //Footer

    let template_footer = '';

    template_footer += `
    <div class="footer-container-main flex mb-[43px]">
        <div class="footer-logo-container flex flex-col mt-[45px] ml-[130px] mr-[60px] w-[276px]">
            <div class="footer-logo-box mb-[20px]">
                <img src="../images/searchbar/logo-colored.svg" class="footer-logo w-[160px] h-auto">
            </div>
            <div class="footer-logo-description flex font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#505050] mb-[20px]">
                Best information about the company gies here but now lorem ipsum is 
            </div>
            <div class="footer-logo-icons flex gap-[12px]">
                <img src="../images/footer/footer_icons/Combined Shape.svg">
                <img src="../images/footer/footer_icons/Combined Shape_1.svg">
                <img src="../images/footer/footer_icons/Fill 183.svg">
                <img src="../images/footer/footer_icons/Fill 184.svg">
                <img src="../images/footer/footer_icons/Fill 209.svg">
            </div>
        </div>
        <div class="footer-lists flex mt-[40px]">
            <div class="footer-list flex flex-col About mr-[65px]">
                <div class="footer-list-heading font-sans font-[500] text-[16px] leading-[22px] mb-[10px]">About</div>
                <div class="footer-list-options flex flex-col gap-[5px]">
                    <div class="footer-list-option font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#8b96a5]">About Us</div>
                    <div class="footer-list-option font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#8b96a5]">Find store</div>
                    <div class="footer-list-option font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#8b96a5]">Categories</div>
                    <div class="footer-list-option font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#8b96a5]">Blogs</div>
                </div>
            </div>
            <div class="footer-list flex flex-col Partnership mr-[65px]">
                <div class="footer-list-heading font-sans font-[500] text-[16px] leading-[22px] mb-[10px]">Partnership</div>
                <div class="footer-list-options flex flex-col gap-[5px]">
                    <div class="footer-list-option font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#8b96a5]">About Us</div>
                    <div class="footer-list-option font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#8b96a5]">Find store</div>
                    <div class="footer-list-option font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#8b96a5]">Categories</div>
                    <div class="footer-list-option font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#8b96a5]">Blogs</div>
                </div>
            </div>
            <div class="footer-list flex flex-col Information mr-[90px]">
                <div class="footer-list-heading font-sans font-[500] text-[16px] leading-[22px] mb-[10px]">Information</div>
                <div class="footer-list-options flex flex-col gap-[5px]">
                    <div class="footer-list-option font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#8b96a5]">Help center</div>
                    <div class="footer-list-option font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#8b96a5]">Money refund</div>
                    <div class="footer-list-option font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#8b96a5]">Shipping</div>
                    <div class="footer-list-option font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#8b96a5]">Contact us</div>
                </div>
            </div>
            <div class="footer-list flex flex-col For-users mr-[95px]">
                <div class="footer-list-heading font-sans font-[500] text-[16px] leading-[22px] mb-[10px]">For users</div>
                <div class="footer-list-options flex flex-col gap-[5px]">
                    <div class="footer-list-option font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#8b96a5]">Login</div>
                    <div class="footer-list-option font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#8b96a5]">Register</div>
                    <div class="footer-list-option font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#8b96a5]">Settings</div>
                    <div class="footer-list-option font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#8b96a5]">My Orders</div>
                </div>
            </div>
            <div class="footer-list flex flex-col">
                <div class="footer-list-heading font-sans font-[500] text-[16px] leading-[22px] mb-[10px]">Get app</div>
                <div class="footer-list-images flex flex-col gap-[10px]">
                    <div class="footer-list-image flex bg-[#1c1c1c] px-[11px] py-[8px] rounded-[6px]">
                        <img src="../images/footer/Subtract.svg">
                    </div>
                    <div class="footer-list-image flex bg-[#1c1c1c] px-[11px] py-[8px] rounded-[6px]">
                        <img src="../images/footer/Logo.svg">
                    </div>
                </div>
            </div>  
        </div>
    </div>
    <div class="footer-container-sub flex h-[70px] bg-[#eff2f4] items-center">
        <div class="footer-container-sub-left flex font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#606060] ml-[128px]">
            @ 2023 Ecommerce
        </div>
        <div class="footer-container-sub-right flex gap-[5px] font-sans font-[400] text-[16px] leading-[24px] tracking-[-0.2px] text-[#606060] ml-[910px]">
            <img src="../images/footer/footer_icons/US@2x.svg">
            <div>English</div>
            <img src="../images/footer/footer_icons/Vector.svg">
        </div>
    </div>
    `;
    

    product_description_container.innerHTML = template_product_description;
    searchbar_contents.innerHTML = template_searchbar;
    navbar_contents.innerHTML = template_navbar;
    product_contents.innerHTML = template_product_container;
    you_may_like.innerHTML = template_you_may_like;
    related_products.innerHTML =template_related_products;
    ad.innerHTML = template_ad;
    footer.innerHTML  = template_footer;
    

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

function change_container(id,id2){
    var x = document.getElementById(id);
    var y = document.getElementById(id2);
    var ids2 = ['Des','Rev'];
    ids2.forEach(info=>{
        if(info===id2){
            y.style.color = "#0D6EFD";
            y.style.borderBottom = "2px solid #0D6EFD";
        }else{
            document.getElementById(info).style.color = '#8b96a5';
            document.getElementById(info).style.borderBottom = 'none';
        }
    });

    var ids1 = ['Description','Reviews'];
    ids1.forEach(info => {
        if(info===id){
            x.style.display = 'flex';
            // x.style.flexDirection = "coloumn";
        }else{
            document.getElementById(info).style.display = 'none';
        }
    });
}

