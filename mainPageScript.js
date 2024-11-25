let sizeValue = null;
let cartAmount = 0;

function setupDropdown(menuButtonSelector, dropdownMenuSelector) {
    const menuButton = document.querySelector(menuButtonSelector);
    const dropdownMenu = document.querySelector(dropdownMenuSelector);

    if (!menuButton || !dropdownMenu) {
        console.error("Menu button or dropdown menu not found.");
        return;
    }

    // Toggle dropdown menu visibility
    menuButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });

    // Close dropdown menu if clicking outside
    document.addEventListener('click', (e) => {
        if (!menuButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
}

function setupSelectableButtons(buttonSelector, sizeCaptionSelector) {
    const buttons = document.querySelectorAll(buttonSelector);
    const sizeCaption = document.querySelector(sizeCaptionSelector);
    

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const isAlreadySelected = button.classList.contains('selected');

            // Clear the selection if the button is already selected
            if (isAlreadySelected) {
                button.classList.remove('selected');
                sizeValue = null;
                console.log("Deselected");
                // Hide size caption
                sizeCaption.style.visibility = 'hidden';
            } else {
                buttons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                sizeValue = button.innerText;
                console.log("Size value:", sizeValue);
                // Show size caption
                sizeCaption.innerText = `${sizeValue}`;
                sizeCaption.style.visibility = 'visible';
            }
        });
    });
}

// Check for duplicate items in the cart and add or update those items
function addOrUpdateDropdownItem(dropdownMenu, productName, priceTag, cartButton) {
    // Check if the item already exists
    const existingItem = Array.from(dropdownMenu.children).find(
        item => {
            const child = item.querySelector('.desc-container-mini').querySelector('.size-heading'); // Adjust the selector to target the child element
            return child && child.textContent === `Size: ${sizeValue}`;
        }
    );

    if (existingItem) {
        // Update the existing cart item
        let itemAmount = existingItem
            .querySelector('.container')
            .querySelector('.desc-container-mini')
            .querySelector('.price-tag').innerText.charAt(0);
        itemAmount = Number(itemAmount) + 1;

        existingItem.querySelector('.container')
            .querySelector('.desc-container-mini')
            .querySelector('.price-tag').innerText = `${itemAmount}x ${priceTag}`
        cartAmount += 1;
        cartButton.innerText = `My Cart ( ${cartAmount} )`;
        console.log(`Updated existing item ${productName} ${sizeValue}: "${itemAmount}x"`);
    } else {
        // Create a new cart item
        const newItem = document.createElement('a');
        newItem.href = "#";
        newItem.innerHTML = `
        <div class="container">
            <div>
                <img src="shirtImage.png" alt="T-Shirt" class="display-image-mini" width=100px>
            </div>
            <div class="desc-container-mini"> 
                <p class="product-name">${productName}</p> 
                <p class="price-tag">1x ${priceTag}</p> 
                <p class="size-heading">Size: ${sizeValue}</p>
            </div>
        </div>
        `;
        dropdownMenu.appendChild(newItem);
        cartAmount += 1;
        cartButton.innerText = `My Cart ( ${cartAmount} )`
        console.log(`Added a ${productName} in size ${sizeValue} to the cart.`);
    }
}

function setupAddToCartButton(addButtonSelector, dropdownMenuSelector, productNameSelector, priceSelector, cartButtonSelector) {
    const addButton = document.querySelector(addButtonSelector);
    const dropdownMenu = document.querySelector(dropdownMenuSelector);
    const productName = document.querySelector(productNameSelector).innerText;
    const priceTag = document.querySelector(priceSelector).innerText;
    const cartButton = document.querySelector(cartButtonSelector);

    if (!addButton || !dropdownMenu) {
        console.error("Add button or dropdown menu not found.");
        return;
    }

    addButton.addEventListener('click', () => {
        if (sizeValue) {
            addOrUpdateDropdownItem(dropdownMenu, productName, priceTag, cartButton)
        } else {
            alert("Please select a size before adding it to the cart.");
        }
    });
}

// Initialize the dropdown cart menu
setupDropdown('.cart-button', '.cart-dropdown-menu');

// Initialize the selectable size buttons
setupSelectableButtons('.size-button', '.size-caption');

// Initialize the add item to cart button
setupAddToCartButton('.add-to-cart-button', '.cart-dropdown-menu', '.product-name', '.price-tag', '.cart-button');