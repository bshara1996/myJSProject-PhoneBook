"use strict";

// Contacts Array
const contacts = [
  {
    imageUrl: "./images/bruno_feitosa.png",
    name: "John Doe",
    phone: "123-456-7890",
    address: "123 Main St",
    email: "john.doe@example.com",
    age: 30,
    message: "Hello!"
  },
  {
    imageUrl: "./images/gabriel_miller.png",
    name: "Jane Smith",
    phone: "987-654-3210",
    address: "456 Elm St",
    email: "jane.smith@example.com",
    age: 25,
    message: "Hi There"
  }
];


// Sort contacts array by name alphabetic
function sortContactsByName() {
  contacts.sort((a, b) => {
    // Convert names to lowercase to ensure case-insensitive sorting
    let nameA = a.name.toLowerCase();
    let nameB = b.name.toLowerCase();

    // Compare
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0; // names must be equal
  });
}

// Render, Update contacts in HTML To ul - Creates li from array Calling this func 
function renderContacts() {
  const contactList = document.getElementById('contactList');
  contactList.innerHTML = '';

  sortContactsByName();  // Sort the contacts array by name

  contacts.forEach((contact, index) => {
    const liElem = document.createElement('li');
    liElem.className = 'contact-item'; // Adding the class for style
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

    // Add class for hover effect
    liElem.onmouseover = function () {
      this.classList.add('bg-hover');
    };
    // Remove class on mouseout
    liElem.onmouseout = function () {
      this.classList.remove('bg-hover');
    };

    contactList.appendChild(liElem);
  });
  document.getElementById('peopleAmount').textContent = `${contacts.length} people`;
}

renderContacts(); // First Render, Update


// Open Popups
function openPopup(id) {
  document.getElementById(id).style.display = 'flex';
}


// Close Popups
function closePopup(event, id) {
  if (event.target === document.getElementById(id) || event.target.classList.contains('close-btn')) {
    document.getElementById(id).style.display = 'none';
  }
}


// Function shows contact details from array - This function called by renderContacts func, INFO BTN
function showContactDetails(index) {
  const container = document.getElementById('userDetailsContainer');
  container.innerHTML = `
  <div class="user-details">
    <div class="user-image">
      <img src="${contacts[index].imageUrl}" alt="${contacts[index].name} image">
    </div>
    <div class="user-info">
      <p><strong>Name:</strong> ${contacts[index].name}</p>
      <p><strong>Phone:</strong> ${contacts[index].phone}</p>
      <p><strong>Address:</strong> ${contacts[index].address}</p>
      <p><strong>Email:</strong> ${contacts[index].email}</p>
      <p><strong>Age:</strong> ${contacts[index].age}</p>
      <p><strong>Message:</strong> ${contacts[index].message}</p>
    </div>
  </div>
  `;
  openPopup('infoContactModal'); // To show on the popup window make it flex
}


// Delete All Contacts By Array
function deleteAllContacts() {
  let question = confirm("Delete All Contacts?")
  if (question === true) {
    contacts.splice(0, contacts.length); // Empty the array
  }
  renderContacts(); // To Update HTML 
}
/*
/* Delete All Contacts By HTML
  function deleteAllContacts() {
    const contactList = document.querySelector('.contact-list');
contactList.innerHTML = ''; // Clears the contact list
document.querySelector('.people-amount').textContent = '0 people'; // Updates people count
  }*/


// Deletes contact, li - This function called by renderContacts func, DELETE BTN
function deleteContact(index) {
  let question = confirm(`Delete ${contacts[index].name}?`)
  if (question === true) {
    contacts.splice(index, 1); // Delete contact from the array
  }
  renderContacts(); // To Update HTML
}


// Toggle Dark Mode Effect
function toggleMode() {
  // Body Bg
  const body = document.body;
  body.classList.toggle('blackBg');

  // The Btn Action  
  const btn = document.querySelector('.toggleDarktBtn');
  btn.classList.toggle('whiteBg');
  btn.classList.toggle('black');

  // The btn Text 
  if (btn.textContent === "Dark Mode") {
    btn.textContent = "Color Mode";
  } else {
    btn.textContent = "Dark Mode";
  }

  // Popup Bg
  const popupBg = document.querySelectorAll('.window-style');
  popupBg.forEach(element => {
    element.classList.toggle('silverBg');
  });

  // OutSide popup Bg
  const popupLight = document.querySelectorAll('.popup');
  popupLight.forEach(element => {
    element.classList.toggle('gray');
  });

  // Header
  const header = document.querySelector('header');
  header.classList.toggle('white');

  // Footer
  const footer = document.querySelector('footer');
  footer.classList.toggle('white');
}






//-------------------------------------------------------------------------------------------------------//
// Function to save new contact
function saveNewContact() {
  const name = document.getElementById('newContactName').value.trim();
  const phone = document.getElementById('newContactPhone').value.trim();
  const address = document.getElementById('newContactAddress').value.trim();
  const email = document.getElementById('newContactEmail').value.trim();
  const age = document.getElementById('newContactAge').value.trim();
  const imageUrl = 'https://i.pravatar.cc/300';
  const message = document.getElementById('newContactMessage').value.trim();
  contacts.push({ name, phone, address, email, age, imageUrl, message });
  renderContacts();
}


// Function to Edit contact
let currentEditIndex;
function editContact(index) {
  currentEditIndex = index;
  const contact = contacts[index];
  document.getElementById('editContactName').value = contact.name;
  document.getElementById('editContactPhone').value = contact.phone;
  document.getElementById('editContactAddress').value = contact.name;
  document.getElementById('editContactEmail').value = contact.phone;
  document.getElementById('editContactAge').value = contact.age;
  document.getElementById('editContactMessage').value = contact.message;

  openPopup('editContactModal');
}

function saveEditedContact() {

}
//-------------------------------------------------------------------------------------------------------//


