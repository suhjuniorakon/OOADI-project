// This script assumes data is passed via URL parameters or other methods.
// For demonstration, it reads from URLSearchParams.

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  // Helper to safely decode URI components
  function decodeParam(key) {
    return params.has(key) ? decodeURIComponent(params.get(key)) : '';
  }

  // Populate receipt fields
  document.getElementById('fullName').textContent = decodeParam('name') || 'N/A';
  document.getElementById('gender').textContent = decodeParam('gender') || 'N/A';
  document.getElementById('email').textContent = decodeParam('email') || 'N/A';
  document.getElementById('faculty').textContent = decodeParam('faculty') || 'N/A';
  document.getElementById('level').textContent = decodeParam('level') || 'N/A';

  const semester = decodeParam('semester') || 'N/A';
  const semesterEl = document.getElementById('semester');
  semesterEl.textContent = semester;

  // Apply semester color class
  semesterEl.classList.remove('semester-fall', 'semester-spring', 'semester-summer');
  switch (semester.toLowerCase()) {
    case 'fall':
      semesterEl.classList.add('semester-fall');
      break;
    case 'spring':
      semesterEl.classList.add('semester-spring');
      break;
    case 'summer':
      semesterEl.classList.add('semester-summer');
      break;
  }

  // Set student photo
  const photoData = decodeParam('photo'); // Expect base64 data URL encoded in param
  const photoEl = document.getElementById('studentPhoto');
  if (photoData) {
    photoEl.src = photoData;
  } else {
    photoEl.alt = 'No student photo provided';
  }

  // Set generation date
  const dateEl = document.getElementById('generatedDate');
  dateEl.textContent = new Date().toLocaleString();
});
