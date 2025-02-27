import './style.css'

// Form validation and submission
$(document).ready(function() {
  $('#tour-form').on('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    let isValid = true;
    const firstName = $('#first-name').val().trim();
    const lastName = $('#last-name').val().trim();
    const email = $('#email').val().trim();
    const phone = $('#phone').val().trim();
    
    if (!firstName) {
      $('#first-name').css('border-color', 'red');
      isValid = false;
    } else {
      $('#first-name').css('border-color', '#ddd');
    }
    
    if (!lastName) {
      $('#last-name').css('border-color', 'red');
      isValid = false;
    } else {
      $('#last-name').css('border-color', '#ddd');
    }
    
    if (!email || !isValidEmail(email)) {
      $('#email').css('border-color', 'red');
      isValid = false;
    } else {
      $('#email').css('border-color', '#ddd');
    }
    
    if (!phone || !isValidPhone(phone)) {
      $('#phone').css('border-color', 'red');
      isValid = false;
    } else {
      $('#phone').css('border-color', '#ddd');
    }
    
    if (isValid) {
      // In a real application, this would submit the form data to a server
      // For this demo, we'll just show an alert
      alert('Form submitted successfully! You would now proceed to step 2 to select a time.');
      
      // Reset the form
      this.reset();
    }
  });
  
  // Book a tour button functionality
  $('.book-tour-btn').on('click', function(e) {
    e.preventDefault();
    // Scroll to the form
    $('html, body').animate({
      scrollTop: $('.form-container').offset().top - 50
    }, 800);
    
    // Focus on the first input
    $('#first-name').focus();
  });
  
  // Gallery image click to enlarge (simple lightbox)
  $('.gallery-image').on('click', function() {
    const imgSrc = $(this).find('img').attr('src');
    
    // Create lightbox elements
    const lightbox = $('<div class="lightbox"></div>');
    const imgContainer = $('<div class="lightbox-content"></div>');
    const img = $('<img src="' + imgSrc + '" alt="Enlarged image">');
    const closeBtn = $('<span class="lightbox-close">&times;</span>');
    
    // Append elements to the DOM
    imgContainer.append(img);
    lightbox.append(imgContainer);
    lightbox.append(closeBtn);
    $('body').append(lightbox);
    
    // Close lightbox when clicking the close button or outside the image
    closeBtn.on('click', function() {
      lightbox.remove();
    });
    
    lightbox.on('click', function(e) {
      if (e.target === this) {
        lightbox.remove();
      }
    });
  });
});

// Helper functions for validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  // Basic phone validation - allows various formats
  const phoneRegex = /^[\d\s\-\(\)\.]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}