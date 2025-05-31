document.addEventListener('DOMContentLoaded', () => {
  window.openExamPassForm = function () {
    window.location.href = 'ExamPassForm.html';
  };
  window.openGatePassForm = function () {
    window.location.href = 'GatePassForm.html';
  };

  const successFlag = localStorage.getItem('formSubmissionSuccess');
  if (successFlag === 'true') {
    const msgDiv = document.getElementById('success-message');
    if (msgDiv) {
      msgDiv.textContent = 'Your form has been submitted successfully and is awaiting finance approval. You may view or edit your submission if needed.';
      msgDiv.style.display = 'block';
    } else {
      alert('Your form has been submitted successfully and is awaiting finance approval.');
    }
    localStorage.removeItem('formSubmissionSuccess');
  }
});
