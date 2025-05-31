document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('passForm');
  const submissionMessage = document.getElementById('submissionMessage');
  const receiptInput = document.getElementById('receipts');

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

    // Validate exactly one receipt file uploaded
    if (!receiptInput.files || receiptInput.files.length !== 1) {
      valid = false;
      const error = receiptInput.parentElement.querySelector('.error-message');
      if (error) error.style.display = 'block';
    } else {
      const error = receiptInput.parentElement.querySelector('.error-message');
      if (error) error.style.display = 'none';
    }

    if (!valid) {
      submissionMessage.textContent = 'Please complete all required fields correctly before submitting the request.';
      submissionMessage.style.color = 'red';
      return;
    }

    // Save submission keyed by email (lowercase)
    const email = form.email.value.trim().toLowerCase();
    const storageKey = `gatePassSubmission_${email}`;

    const formData = {
      id: Date.now(),
      name: form.name.value.trim(),
      gender: form.gender.value,
      email: email,
      faculty: form.faculty.value,
      semester: form.semester.value,
      studentPhotoFileName: form.studentPhoto.files[0]?.name || '',
      receiptFileName: receiptInput.files[0].name,
      validated: false,
    };

    localStorage.setItem(storageKey, JSON.stringify(formData));

    submissionMessage.textContent = 'Your submission has been saved successfully.';
    submissionMessage.style.color = 'green';

    // Optionally clear form or keep data for editing
    // form.reset();
  });
});
