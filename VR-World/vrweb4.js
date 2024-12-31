let modal;

function showModal() {
    modal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
    modal.show();
}
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(showModal, 2000);
    const signInFormWrapper = document.getElementById('signInFormWrapper');
    const createAccountFormWrapper = document.getElementById('createAccountFormWrapper');
    const showCreateAccountForm = document.getElementById('showCreateAccountForm');
    const showSignInForm = document.getElementById('showSignInForm');

    showCreateAccountForm.addEventListener('click', function(event) {
        event.preventDefault();
        signInFormWrapper.classList.add('hidden');
        createAccountFormWrapper.classList.remove('hidden');
    });

    showSignInForm.addEventListener('click', function(event) {
        event.preventDefault();
        createAccountFormWrapper.classList.add('hidden');
        signInFormWrapper.classList.remove('hidden');
    });

    const createAccountForm = document.getElementById('createAccountForm');
    createAccountForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(createAccountForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch('https://gorest.co.in/public-api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 38fa9c944b353dd67b63b66fb81df905b202f930ebefad91a86b87826cc91ad0'
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            console.log('Account created successfully:', responseData);

            alert('Account created successfully!');
            createAccountForm.reset();

            // After successful account creation, switch back to sign-in form
            createAccountFormWrapper.classList.add('hidden');
            signInFormWrapper.classList.remove('hidden');
        } catch (error) {
            console.error('Error creating account:', error);
            alert('Error creating account. Please try again.');
        }
    });

    const signInForm = document.getElementById('signInForm');
    signInForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const signInEmail = document.getElementById('signInEmail').value;
        const signInPassword = document.getElementById('signInPassword').value;

        try {
            const response = await fetch(`https://gorest.co.in/public-api/users?email=${signInEmail}`, {
                headers: {
                    'Authorization': 'Bearer 38fa9c944b353dd67b63b66fb81df905b202f930ebefad91a86b87826cc91ad0'
                },
            });
            const userData = await response.json();
            console.log('User data:', userData);

            if (userData.data.length > 0) {
                const user = userData.data[0];
                console.log('Fetched user:', user);

                // Compare email and name fetched from server with input values
                if (user.email === signInEmail && user.name === signInPassword) {
                    console.log('Sign In Successful:', user);
                    alert('Sign In Successful!');
                    signInForm.reset();
                    modal.hide();
                } else {
                    alert('Incorrect email or password. Please try again.');
                }
            } else {
                alert('User not found. Please check your email.');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            alert('Error signing in. Please try again.');
        }
    });

    const blogData = [{
            image: 'https://img.freepik.com/free-vector/gaming-devices-panoramic-banner-header-vr_1441-3664.jpg?t=st=1720438964~exp=1720442564~hmac=c12d5f0b550c5033b48d0ab9f132f03abd874369f54282da5ac91a5d0978f6be&w=826',
            title: 'Gaming',
            body: 'Explore the beauty of gaming through immersive virtual reality experiences.'
        },
        {
            image: 'https://img.freepik.com/free-vector/vr-virtual-reality-glasses-banner_1441-3567.jpg?t=st=1720438928~exp=1720442528~hmac=985ebfbe145efb95ee994d746d6403287243ce1567b2ee319b514248b5329911&w=826',
            title: 'Technology',
            body: 'Stay updated with the latest advancements in technology with virtual reality.'
        },
        {
            image: 'https://img.freepik.com/premium-vector/ai-virtual-reality-technology-new-futuristic-technology-graphic-design-concept-vector-illustration_436759-113.jpg?semt=ais_hybrid',
            title: 'Cyber Sport',
            body: 'Join the world of cyber sports and compete with gamers around the globe.'
        },
        {
            image: 'https://img.freepik.com/free-photo/man-enjoying-vr-headset_53876-129659.jpg?semt=ais_hybrid',
            title: 'Virtual Travel',
            body: 'Travel to different places around the world without leaving your home.'
        },
        {
            image: 'https://img.freepik.com/premium-vector/virtual-game-social-media-facebook-cover-template_544063-24.jpg?semt=ais_hybrid',
            title: 'Entertainment',
            body: 'Experience movies, music, and more in a whole new way with virtual reality.'
        }
    ];



    const viewAllBtn = document.getElementById("viewAllBtn");
    const blogRowContainer = document.getElementById("blogRowContainer");
    let added = false; // Flag to track if blogs are added

    // Function to create and append blog post elements
    function createAndAppendBlogPost(post) {
        const {
            image,
            title,
            body
        } = post;

        // Create blog post container
        const blogPostContainer = document.createElement("div");
        blogPostContainer.classList.add("shadow", "mt-3", "col-12", "col-md-6", "dynamic-blog-post");
        const containers = document.createElement("div");
        containers.classList.add("p-3");
        // Create image element
        const imgElement = document.createElement("img");
        imgElement.src = image;
        imgElement.classList.add("w-100");
        blogPostContainer.appendChild(imgElement);

        // Create title element
        const titleElement = document.createElement("p");
        titleElement.classList.add("vr_tren_blo_heading", "mb-0");
        titleElement.textContent = title;
        containers.appendChild(titleElement);

        // Create body element
        const bodyElement = document.createElement("p");
        bodyElement.classList.add("vr_tren_blo_paragraph");
        bodyElement.textContent = body;
        containers.appendChild(bodyElement);

        // Create link element (assuming same link for all)
        const linkElement = document.createElement("a");
        linkElement.href = "#"; // Replace with actual link if needed
        linkElement.classList.add("vr_tren_blo_link");
        linkElement.innerHTML = "READ MORE <i class='fas fa-arrow-right fa-xs'></i>"; // Adding right arrow using Font Awesome

        // Append link element to blog post container
        containers.appendChild(linkElement);
        blogPostContainer.appendChild(containers);
        // Append blog post container to row container
        blogRowContainer.appendChild(blogPostContainer);
    }

    // Function to remove dynamically added blog posts
    function removeDynamicBlogPosts() {
        const dynamicPosts = document.querySelectorAll('.dynamic-blog-post');
        dynamicPosts.forEach(post => post.remove());
    }

    // Event listener for appending and removing blog posts
    viewAllBtn.addEventListener("click", function() {
        if (!added) {
            // Loop through blog data and create blog posts
            blogData.forEach(post => createAndAppendBlogPost(post));
            added = true;
            viewAllBtn.textContent = "View Less";
            viewAllBtn.classList.add('view-less-btn');
        } else {
            // Remove dynamically added blog posts
            removeDynamicBlogPosts();
            added = false;
            viewAllBtn.textContent = "View All";
            viewAllBtn.classList.remove('view-less-btn');
        }
    });

    const products = [{
            backgroundClass: 'vr_prod_background3',
            title: 'VR Headset Pro',
            price: 'Rs 85,000'
        },
        {
            backgroundClass: 'vr_prod_background4',
            title: 'VR Headset and Advanced Controllers',
            price: 'Rs 95,000'
        },
        {
            backgroundClass: 'vr_prod_background5',
            title: 'VR Complete Set',
            price: 'Rs 1,20,000'
        }
    ];

    const container = document.getElementById('productRowContainer');
    const toggleBtn = document.getElementById('toggleBtn');
    let productsAdded = false;

    function createProductElement(product) {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-12', 'col-md-6', 'd-flex', 'flex-row', 'justify-content-center');

        const productDiv = document.createElement('div');
        productDiv.classList.add(product.backgroundClass, 'd-flex', 'flex-column', 'justify-content-end', 'p-3', 'mb-3');

        const titleElement = document.createElement('h1');
        titleElement.classList.add('vr_prod_heading');
        titleElement.textContent = product.title;

        const priceElement = document.createElement('p');
        priceElement.classList.add('vr_prod_paragraph');
        priceElement.textContent = product.price;

        const buttonElement = document.createElement('button');
        buttonElement.classList.add('vr_prod_custom_btn');
        buttonElement.textContent = 'Buy Now';

        productDiv.appendChild(titleElement);
        productDiv.appendChild(priceElement);
        productDiv.appendChild(buttonElement);

        colDiv.appendChild(productDiv);
        container.appendChild(colDiv);
    }

    toggleBtn.addEventListener('click', function() {
        if (!productsAdded) {
            products.forEach(product => createProductElement(product));
            productsAdded = true;
            toggleBtn.textContent = 'View Less';
        } else {
            const addedProducts = document.querySelectorAll('#productRowContainer .col-12.col-md-6.d-flex.flex-row.justify-content-center:not(:first-child):not(:nth-child(2))');
            addedProducts.forEach(product => product.remove());
            productsAdded = false;
            toggleBtn.textContent = 'View All';
        }
    });



});