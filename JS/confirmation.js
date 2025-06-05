document.addEventListener('DOMContentLoaded', () => {
  const confirmationMessage = document.getElementById('confirmationMessage');
  const backHomeBtn = document.getElementById('backHomeBtn');

  // Show confirmation message
  confirmationMessage.innerHTML = `
    <p>Your form has been submitted successfully and is awaiting finance approval.</p>
    <p>You may <a href="viewSubmission.html">view</a> or <a href="editSubmission.html">edit</a> your submission if needed.</p>
  `;

  backHomeBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
