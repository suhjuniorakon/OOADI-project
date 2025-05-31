document.addEventListener('DOMContentLoaded', () => {
  const lookupEmailInput = document.getElementById('lookupEmail');
  const loadBtn = document.getElementById('loadSubmissionBtn');
  const lookupError = document.getElementById('lookupError');
  const editForm = document.getElementById('editForm');
  const submissionMessage = document.getElementById('editSubmissionMessage');

  const fields = {
    fullName: document.getElementById('editFullName'),
    gender: document.getElementById('editGender'),
    email: document.getElementById('editEmail'),
    faculty: document.getElementById('editFaculty'),
    semester: document.getElementById('editSemester'),
    studentPhotoName: document.getElementById('studentPhotoName'),
    receiptFileName: document.getElementById('receiptFileName'),
    studentPhotoInput: document.getElementById('editStudentPhoto'),
    receiptInput: document.getElementById('editReceipt'),
  };

  // Hide error message initially
  lookupError.style.display = 'none';

  loadBtn.addEventListener('click', () => {
    const email = lookupEmailInput.value.trim().toLowerCase();

    if (!email) {
      alert('Please enter your email.');
      return;
    }

    const storageKey = `gatePassSubmission_${email}`;
    const saved = localStorage.getItem(storageKey);

    if (!saved) {
      // No submission found: show error, hide form and clear messages
      lookupError.style.display = 'block';
      editForm.style.display = 'none';
      submissionMessage.textContent = '';
      return;
    }

    // Submission found: hide error, show form, clear messages
    lookupError.style.display = 'none';
    editForm.style.display = 'block';
    submissionMessage.textContent = '';

    // Parse saved data and populate form fields
    const data = JSON.parse(saved);

    fields.fullName.value = data.name || '';
    fields.gender.value = data.gender || '';
    fields.email.value = data.email || email;
    fields.faculty.value = data.faculty || '';
    fields.semester.value = data.semester || '';
    fields.studentPhotoName.textContent = data.studentPhotoFileName || 'No file uploaded';
    fields.receiptFileName.textContent = data.receiptFileName || 'No file uploaded';

    // Clear file inputs so user can upload new files if desired
    fields.studentPhotoInput.value = '';
    fields.receiptInput.value = '';
  });

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    submissionMessage.textContent = '';
    submissionMessage.style.color = '';

    let valid = true;

    // Hide all error messages initially
    editForm.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

    // Validate required inputs
    editForm.querySelectorAll('input, select').forEach(input => {
      if (input.required && !input.value) {
        valid = false;
        const error = input.parentElement.querySelector('.error-message');
        if (error) error.style.display = 'block';
      }
    });

    if (!valid) {
      submissionMessage.textContent = 'Please complete all required fields correctly before updating.';
      submissionMessage.style.color = 'red';
      return;
    }

    // Save updated data back to localStorage
    const email = fields.email.value.trim().toLowerCase();
    const storageKey = `gatePassSubmission_${email}`;

    const updatedData = {
      id: Date.now(),
      name: fields.fullName.value.trim(),
      gender: fields.gender.value,
      email: email,
      faculty: fields.faculty.value,
      semester: fields.semester.value,
      // Use new uploaded file names if any, else keep old file names
      studentPhotoFileName: fields.studentPhotoInput.files[0]?.name || fields.studentPhotoName.textContent,
      receiptFileName: fields.receiptInput.files[0]?.name || fields.receiptFileName.textContent,
      validated: false,
    };

    localStorage.setItem(storageKey, JSON.stringify(updatedData));

    submissionMessage.textContent = 'Your submission has been updated successfully.';
    submissionMessage.style.color = 'green';
  });
});
