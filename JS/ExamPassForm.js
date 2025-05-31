document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('passForm');
  const submissionMessage = document.getElementById('submissionMessage');
  const fileInput = document.getElementById('receipts');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    submissionMessage.textContent = '';
    submissionMessage.style.color = '';
    let valid = true;

    form.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    form.querySelectorAll('input, select').forEach(input => {
      if (!input.checkValidity()) {
        valid = false;
        const error = input.parentElement.querySelector('.error-message');
        if (error) error.style.display = 'block';
      }
    });

    // Validate file upload count: exactly one file
    if (!fileInput.files || fileInput.files.length !== 1) {
      valid = false;
      const error = fileInput.parentElement.querySelector('.error-message');
      if (error) error.style.display = 'block';
    } else {
      const error = fileInput.parentElement.querySelector('.error-message');
      if (error) error.style.display = 'none';
    }

    if (!valid) {
      submissionMessage.textContent = 'Please complete all required fields correctly before submitting the request.';
      submissionMessage.style.color = 'red';
      return;
    }

    // Save submission in localStorage (simulate backend)
    let submissions = JSON.parse(localStorage.getItem('examPassSubmissions') || '[]');
    const formData = {
      id: Date.now(),
      name: form.name?.value.trim() || '',
      gender: form.gender?.value || '',
      faculty: form.faculty?.value || '',
      matric: form.matric?.value.trim() || '',
      semester: form.semester?.value || '',
      level: form.level?.value || '',
      receiptFile: {
        name: fileInput.files[0].name,
        size: fileInput.files[0].size,
        type: fileInput.files[0].type
      },
      validated: false,
    };
    submissions.push(formData);
    localStorage.setItem('examPassSubmissions', JSON.stringify(submissions));

    // Hide the form and redirect to confirmation page
    form.style.display = 'none';
    localStorage.setItem('formSubmissionSuccess', 'true');
    setTimeout(() => {
      window.location.href = 'confirmation.html?type=exam';
    }, 1000);
  });
});
