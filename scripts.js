"use strict";

// Array with contacts informations
const contacts = [
  {
    imageUrl: "./images/bruno_feitosa.png",
    name: "Bruno Feitosa",
    phone: "1234567890",
    address: "123 Country Street",
    email: "bruno.feitosa@example.com",
    message: "Hello!"
  },
  {
    imageUrl: "./images/gabriel_miller.png",
    name: "Gabriel Miller",
    phone: "9876543210",
    address: "456  Country Street",
    email: "gabriel.miller@example.com",
    message: "Hi There"
  },
  {
    imageUrl: "./images/heitor_verdifotos.png",
    name: "Heitor Verdifotos",
    phone: "1234565244",
    address: "789 Country Street",
    email: "heitor.verdifotos@example.com",
    message: "Busy"
  },
  {
    imageUrl: "./images/gabriel_apereir.png",
    name: "Heitor Verdifotos",
    phone: "8754566487",
    address: "257 Country Street",
    email: "gabriel.apereir@example.com",
    message: "Feel Free To Call"
  },
  {
    imageUrl: "./images/simon_robben.png",
    name: "Simon Robben",
    phone: "8754566487",
    address: "450 Country Street",
    email: "simon.robben@example.com",
    message: ""
  },
  {
    imageUrl: "./images/dan_xavier.png",
    name: "Dan Xavier",
    phone: "4579225821",
    address: "",
    email: "",
    message: ""
  },
  {
    imageUrl: "./images/hester_hogan.png",
    name: "Hester Hogan",
    phone: "2047508001",
    address: "",
    email: "hester.hogan@example.com",
    message: ""
  },
  {
    imageUrl: "./images/marcelo_chagas.png",
    name: "Marcelo Chagas",
    phone: "8728852172",
    address: "442 Country Street",
    email: "",
    message: ""
  }
];


/**
 * Sorts an array of contact objects by name in alphabetical order.
 *
 * @param {Array} contactsToSort - Array of contact objects to be sorted.
 * @returns {Array} - Sorted array of contact objects.
 */
function sortContactsByName(contactsToSort) {
  return contactsToSort.sort((a, b) => {
    let nameA = a.name.toLowerCase();
    let nameB = b.name.toLowerCase();

    // Compare names to determine the sort order
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

/**
 * Renders and updates the list of contacts in the HTML.
 * Creates list items (li) from the array and counts the number of contacts.
 *
 * @param {Array} contactsToRender - Contact array to render.
 * @param {boolean} [sortContacts=true] - Indicates if the contacts should be sorted.
 */
function renderContacts(contactsToRender, sortContacts = true) {
  const contactList = document.getElementById('contactList');
  contactList.innerHTML = ''; // Clear any existing contacts

  if (sortContacts) {
    // Sort the contacts before rendering if sortContacts is true
    contactsToRender = sortContactsByName(contactsToRender);
  }

  contactsToRender.forEach((contact, index) => {
    const liElem = document.createElement('li');
    // Hover effect for li
    liElem.onmouseover = () => {
      liElem.classList.add('bg-hover');
    };

    liElem.onmouseout = () => {
      liElem.classList.remove('bg-hover');
    };

    liElem.className = 'contact-item';
    liElem.innerHTML = `
      <div class="contact-info">
        <div class="contact-img"> <img src="${contact.imageUrl}" alt="Contact Image"> </div>
        <div class="contact-name">${contact.name}</div>
      </div>
      <div class="btns">
        <button onclick="showContactDetails(${index})"><img src="./images/info_btn.png" alt="info"></button>
        <button onclick="editContact(${index})"><img src="./images/edit_btn.png" alt="edit"></button>
        <button onclick="deleteContact(${index})"><img src="./images/delete_btn.png" alt="delete"></button>
      </div>
    `;

    contactList.append(liElem);
  });

  // Update the amount of current contacts
  document.getElementById('peopleAmount').textContent = `${contactsToRender.length} people`;
}

// First Render, Update --> to get starting contacts info from array to HTML
renderContacts(contacts);

/**
 * Searches for contacts based on the input value and renders the result.
 */
function searchContacts() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();

  // Filter contacts based on the search input
  const filteredContacts = contacts
    .map((contact, index) => ({ contact, index })) // Preserve original index
    .filter(({ contact }) => contact.name.toLowerCase().includes(searchValue));

  // Render the filtered contacts without sorting, preserving the original indices
  renderFilteredContacts(filteredContacts);
}

/**
 * Renders filtered contacts, preserving the original indices.
 *
 * @param {Array} filteredContacts - Array of filtered contacts with original indices.
 */
function renderFilteredContacts(filteredContacts) {
  const contactList = document.getElementById('contactList');
  contactList.innerHTML = ''; // Clear any existing contacts

  filteredContacts.forEach(({ contact, index }) => {
    const liElem = document.createElement('li');
    // Hover effect for li
    liElem.onmouseover = () => {
      liElem.classList.add('bg-hover');
    };

    liElem.onmouseout = () => {
      liElem.classList.remove('bg-hover');
    };

    liElem.className = 'contact-item';
    liElem.innerHTML = `
      <div class="contact-info">
        <div class="contact-img"> <img src="${contact.imageUrl}" alt="Contact Image"> </div>
        <div class="contact-name">${contact.name}</div>
      </div>
      <div class="btns">
        <button onclick="showContactDetails(${index})"><img src="./images/info_btn.png" alt="info"></button>
        <button onclick="editContact(${index})"><img src="./images/edit_btn.png" alt="edit"></button>
        <button onclick="deleteContact(${index})"><img src="./images/delete_btn.png" alt="delete"></button>
      </div>
    `;

    contactList.append(liElem);
  });

  // Update the amount of current contacts
  document.getElementById('peopleAmount').textContent = `${filteredContacts.length} people`;
}



/**
 * Opens popup window according to ID
 * 
 * @param {string} id - The ID of the popup element to be displayed.
 */
function openPopup(id) {
  document.getElementById(id).style.display = 'flex';
}

/**
 * Closes a popup window when click on close button or based on the event
 * 
 * @param {Event} event - The event when clicking outside of the popup
 * @param {string} id - The ID of the popup element to be closed.
 */
function closePopup(event, id) {
  if (event.target === document.getElementById(id) || event.target.classList.contains('close-btn')) {
    document.getElementById(id).style.display = 'none';
  }
}



/**
 * Deletes all contacts from the `contacts` array after user confirmation.
 * 
 * @returns {void} - This function does not return a value.
 * 
 */
function deleteAllContacts() {
  let question = confirm("Delete All Contacts?");
  if (question === true) {
    contacts.splice(0, contacts.length); // Remove all contacts from array
  }
  renderContacts(contacts); // Update the contact array and HTML
}

/**
 * Deletes a specific contact from the list after user confirmation
 * 
 * @param {number} index - The index of the contact to delete
 */
function deleteContact(index) {
  let question = confirm(`Delete ${contacts[index].name}?`);
  if (question === true) {
    contacts.splice(index, 1); // Remove the contact
    renderContacts(contacts); // Update the contact array + HTML 
  }
}



/**
 * Toggles between dark mode and light mode for the website.
 * 
 * @returns {void} - This function does not return a value.
 * 
 */
function toggleMode() {
  // Update body background color for dark mode
  const body = document.body;
  body.classList.toggle('blackBg');

  // Update button color based on the current mode
  const btn = document.querySelector('.toggleDarktBtn');
  btn.classList.toggle('whiteBg');
  btn.classList.toggle('black');

  // Update button text based on the current mode
  btn.textContent = btn.textContent === "Dark Mode" ? "Color Mode" : "Dark Mode";

  // Update popups inner background 
  const popupBg = document.querySelectorAll('.window-style');
  popupBg.forEach(element => element.classList.toggle('silverBg'));

  // Update popups outer background 
  const popupLight = document.querySelectorAll('.popup');
  popupLight.forEach(element => element.classList.toggle('gray'));

  // Update popups outer background 
  const header = document.querySelector('header');
  header.classList.toggle('white');
  const footer = document.querySelector('footer');
  footer.classList.toggle('white');
}


/**
 * Displays detailed information about a specific contact in popup
 * 
 * This function called by renderContacts func from INFO BTN
 * 
 * @param {number} index - The index of the contact to display details for.
 */
function showContactDetails(index) {
  const container = document.getElementById('userDetailsContainer');
  container.innerHTML = `
    <div class="user-details">
      <div class="user-image">
        <img src="${contacts[index].imageUrl}" alt="${contacts[index].name} image">
      </div>
      <div class="user-info"></div>
    </div>
  `;

  // Display only contacts (the array) feilds that has data by adding it to div with class --> user-info 
  const userInfo = container.querySelector('.user-info');

  // Add contact details to the container
  if (contacts[index].name) userInfo.innerHTML += `<p><strong>Name:</strong> ${contacts[index].name}</p>`;
  if (contacts[index].phone) userInfo.innerHTML += `<p><strong>Phone:</strong> ${contacts[index].phone}</p>`;
  if (contacts[index].address) userInfo.innerHTML += `<p><strong>Address:</strong> ${contacts[index].address}</p>`;
  if (contacts[index].email) userInfo.innerHTML += `<p><strong>Email:</strong> ${contacts[index].email}</p>`;
  if (contacts[index].message) userInfo.innerHTML += `<p><strong>Message:</strong> ${contacts[index].message}</p>`;

  // Open the popup to display contact details
  openPopup('infoContactModal');
}



/**
 * This function checks if the provided name is empty or if it already exists in the `contacts` array.
 * 
 * @param {string} name - The name to check
 * 
 * @returns {boolean} - Returns `true` if the name is invalid (either empty or already exists) - otherwise returns `false`
 * 
 */
function isInvalidName(name) {
  // Check if the name is empty
  if (!name.trim()) {
    alert('Name cannot be empty');
    return true; // Indicate that the name is invalid
  }

  // Check if the name already exists 
  const nameExists = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
  if (nameExists) {
    alert("A contact with this name already exists.");
    document.getElementById('newContactName').value = ''; // Empty name filed
    return true; // Indicate that the name already exists
  }

  return false; // Indicate that the name is valid and does not exist
}

/**
 * Validates phone number contain 10 digits
 * 
 * @param {string} phone - The phone number to check
 * 
 * @returns {boolean} - Returns `true` if the phone number is invalid (either empty, contains non-numeric characters, or is not 10 digits) - otherwise, returns `false`
 * 
 */
function isInvalidPhone(phone) {
  // Check if the phone number is empty
  if (!phone) {
    alert('Phone number is required.');
    return true; // Indicate that the phone number is invalid
  }

  // Check if the phone number contains only numeric characters
  for (let i = 0; i < phone.length; i++) {
    if (isNaN(phone[i])) {
      alert('Phone number must contain only digits.');
      document.getElementById('newContactPhone').value = '';
      return true; // Indicate that the phone number is invalid
    }
  }

  // Check if the phone number is exactly 10 digits
  if (phone.length !== 10) {
    alert('Phone number must be 10 digits long.');
    document.getElementById('newContactPhone').value = '';
    return true; // Indicate that the phone number is invalid
  }

  return false; // Indicate that the phone number is valid
}

/**
 * Clears all form fields of 'Add Contact' popup.
 * 
 * This function sets the value of each input field in the 'Add Contact' form to an empty string.
 * 
 * It used to reset the form after adding a new contact or when closing the popup.
 * 
 * @returns {void} - This function does not return a value.
 * 
 */
function ClearFormFields() {
  document.getElementById('newContactName').value = '';
  document.getElementById('newContactPhone').value = '';
  document.getElementById('newContactAddress').value = '';
  document.getElementById('newContactEmail').value = '';
  document.getElementById('new-image-url').value = '';
  document.getElementById('newContactMessage').value = '';
}



/**
 * Saves a newly added contact and updates the contact list by adding it to the array
 * 
 * It also closes the "Add Contact" popup and clears the form fields.
 * 
 * @returns {void} - This function does not return a value.
 * 
 */
function saveNewContact() {
  // Geting new contact input values
  const name = document.getElementById('newContactName').value.trim();
  const phone = document.getElementById('newContactPhone').value.trim();
  const address = document.getElementById('newContactAddress').value.trim();
  const email = document.getElementById('newContactEmail').value.trim();
  const imageUrl = document.getElementById('new-image-url').value.trim();
  const message = document.getElementById('newContactMessage').value.trim();


  // Validate the name + phone
  if (isInvalidName(name) || isInvalidPhone(phone)) {
    return; // Stop if the name or phone is invalid 
  }

  // Creating new contact
  const contact = {
    imageUrl: imageUrl || "https://picsum.photos/200",  // Default image URL if not provided
    name: name,
    phone: phone,
    address: address,
    email: email,
    message: message
  };

  contacts.push(contact); // Add new contact to the array
  renderContacts(contacts); // Update the contact list, array

  // Close the (save new contact) popup AND clear form fields
  document.getElementById('addContactModal').style.display = 'none';
  ClearFormFields();
}




let currentEditingIndex; //Store index of the currently contact being edited

/**
 * Fill up the 'Edit Contact' popup with the details of the contact to be edited
 * 
 * the `currentEditingIndex` to track the contact being edited 
 * 
 * @param {number} index - The index of the contact in the `contacts` array to be edited.
 * 
 * @returns {void} - This function does not return a value.
 * 
 */
function editContact(index) {
  // Getting current contact value to the popup
  document.getElementById('editContactName').value = contacts[index].name;
  document.getElementById('editContactPhone').value = contacts[index].phone;
  document.getElementById('editContactAddress').value = contacts[index].address;
  document.getElementById('editContactEmail').value = contacts[index].email;
  document.getElementById('edit-image-url').value = contacts[index].imageUrl;
  document.getElementById('editContactMessage').value = contacts[index].message;

  currentEditingIndex = index; // Store the index of the contact being edited to use it in 'save edit' function
  openPopup('editContactModal'); // Open the edit popup
}


/**
 * Saves the changes made to an existing contact - update contact info
 * 
 * This function retrieves the updated contact details from the 'Edit Contact' form fields, 
 * updates the corresponding contact in the `contacts` array using the stored `currentEditingIndex`,
 * and refreshes the contact list display. It also closes the 'Edit Contact' popup after saving.
 * 
 * @returns {void} - This function does not return a value.
 * 
 */
function saveEditedContact() {
  const index = currentEditingIndex; //Takes from 'edit contact' function index of  the currently contact being edited

  // Geting the edit contact input values
  const name = document.getElementById('editContactName').value.trim();
  const phone = document.getElementById('editContactPhone').value.trim();
  const address = document.getElementById('editContactAddress').value.trim();
  const email = document.getElementById('editContactEmail').value.trim();
  const imageUrl = document.getElementById('edit-image-url').value.trim();
  const message = document.getElementById('editContactMessage').value.trim();


  //Validate the name
  if (contacts[index].name !== name && isInvalidName(name)) {
    return; // Stop if the name of edited contact stays without change - Also stops  if the name invalid (empty / already exists) 
  }

  //Validate the phone number
  if (isInvalidPhone(phone)) {
    return; // Stop if the phone number is invalid 
  }


  // Update the contact with new details based on his index
  contacts[index] = {
    imageUrl: imageUrl || "https://picsum.photos/200", // Default image URL if not provided
    name: name,
    phone: phone,
    address: address,
    email: email,
    message: message
  };

  // Update the contact list AND Close the edit popup
  renderContacts(contacts);
  document.getElementById('editContactModal').style.display = 'none';
}
