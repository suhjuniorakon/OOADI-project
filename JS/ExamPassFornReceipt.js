document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  // Populate student info fields
  document.getElementById("studentName").textContent = params.get("name") || "N/A";
  document.getElementById("studentGender").textContent = params.get("gender") || "N/A";
  document.getElementById("studentEmail").textContent = params.get("email") || "N/A";
  document.getElementById("studentFaculty").textContent = params.get("faculty") || "N/A";
  document.getElementById("studentMatric").textContent = params.get("matric") || "N/A";
  document.getElementById("studentSemester").textContent = params.get("semester") || "N/A";
  document.getElementById("studentLevel").textContent = params.get("level") || "N/A";

  // Set current date as payment date
  document.getElementById("paymentDate").textContent = new Date().toLocaleDateString();

  // Semester color mapping and display
  const semesterColors = {
    Fall: 'fall-pass',
    Spring: 'spring-pass',
    Summer: 'summer-pass'
  };
  const semester = params.get("semester") || "N/A";
  const semesterTitleEl = document.getElementById("semesterTitle");
  semesterTitleEl.textContent = semester + " Semester";

  // Apply semester color to card and info section
  const receiptCard = document.getElementById("receiptCard");
  receiptCard.classList.remove('fall-pass', 'spring-pass', 'summer-pass');
  if (semesterColors[semester]) {
    receiptCard.classList.add(semesterColors[semester]);
  }
  const studentInfoSection = document.querySelector('.student-info');
  studentInfoSection.classList.remove('fall-pass', 'spring-pass', 'summer-pass');
  if (semesterColors[semester]) {
    studentInfoSection.classList.add(semesterColors[semester]);
  }

  // QR code text for verification
  const qrText = `ICTU Exam Pass\nName: ${params.get("name")}\nMatric: ${params.get("matric")}\nStatus: Finance Office Approved`;

  // Generate QR code as image for compatibility with html2canvas
  function generateQRCode() {
    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = ""; // Clear previous QR code

    new QRCode(qrContainer, {
      text: qrText,
      width: 150,
      height: 150,
      colorDark: "#ffffff",
      colorLight: "#003366",
      correctLevel: QRCode.CorrectLevel.H,
    });

    // Wait for canvas to render, then convert to image
    setTimeout(() => {
      const qrCanvas = qrContainer.querySelector("canvas");
      if (!qrCanvas) {
        console.error("QR code canvas not found!");
        return;
      }
      const img = new Image();
      img.src = qrCanvas.toDataURL("image/png");
      qrContainer.innerHTML = "";
      qrContainer.appendChild(img);

      // Enable download button
      document.getElementById("downloadBtn").disabled = false;
    }, 300);
  }

  generateQRCode();

  // Download pass as PNG using html2canvas
  document.getElementById("downloadBtn").addEventListener("click", () => {
    setTimeout(() => {
      html2canvas(receiptCard, { scale: 2, useCORS: true }).then(canvas => {
        const link = document.createElement("a");
        link.download = "ICTU_Exam_Pass.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }, 200);
  });
});
