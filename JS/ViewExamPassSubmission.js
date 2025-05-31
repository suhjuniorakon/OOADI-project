document.addEventListener('DOMContentLoaded', () => {
  const lookupMatricInput = document.getElementById('lookupMatric');
  const loadBtn = document.getElementById('loadSubmissionBtn');
  const lookupError = document.getElementById('lookupError');
  const editForm = document.getElementById('editForm');
  const submissionMessage = document.getElementById('editSubmissionMessage');

  const fields = {
    fullName: document.getElementById('editFullName'),
    gender: document.getElementById('editGender'),
    matric: document.getElementById('editMatric'),
    faculty: document.getElementById('editFaculty'),
    semester: document.getElementById('editSemester'),
    level: document.getElementById('editLevel'),
    receiptFileName: document.getElementById('receiptFileName'),
    receiptInput: document.getElementById('editReceipt'),
  };

  lookupError.style.display = 'none';

  loadBtn.addEventListener('click', () => {
    const matric = lookupMatricInput.value.trim().toLowerCase();
    if (!matric) {
      alert('Please enter your matricule number.');
      return;
    }
    const storageKey = `examPassSubmission_${matric}`;
    const saved = localStorage.getItem(storageKey);

    if (!saved) {
      lookupError.style.display = 'block';
      editForm.style.display = 'none';
      submissionMessage.textContent = '';
      return;
    }

    lookupError.style.display = 'none';
    editForm.style.display = 'block';
    submissionMessage.textContent = '';

    const data = JSON.parse(saved);

    fields.fullName.value = data.name || '';
    fields.gender.value = data.gender || '';
    fields.matric.value = data.matric || matric;
    fields.faculty.value = data.faculty || '';
    fields.semester.value = data.semester || '';
    fields.level.value = data.level || '';
    fields.receiptFileName.textContent = data.receiptFileName || 'No file uploaded';

    // Clear file input
    fields.receiptInput.value = '';
  });

  editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    submissionMessage.textContent = '';
    submissionMessage.style.color = '';

    let valid = true;
    editForm.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
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

    const matric = fields.matric.value.trim().toLowerCase();
    const storageKey = `examPassSubmission_${matric}`;

    const updatedData = {
      id: Date.now(),
      name: fields.fullName.value.trim(),
      gender: fields.gender.value,
      matric: matric,
      faculty: fields.faculty.value,
      semester: fields.semester.value,
      level: fields.level.value,
      receiptFileName: fields.receiptInput.files[0]?.name || fields.receiptFileName.textContent,
      validated: false,
    };

    localStorage.setItem(storageKey, JSON.stringify(updatedData));

    submissionMessage.textContent = 'Your submission has been updated successfully.';
    submissionMessage.style.color = 'green';
  });
});
