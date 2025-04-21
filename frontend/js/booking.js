document.getElementById('ticketForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const seats = document.getElementById('seats').value;
  
    const ticketId = Math.floor(Math.random() * 100000);
    document.getElementById('ticketResult').innerHTML = `
      <h3>Booking Confirmed</h3>
      <p>Name: ${fullName}</p>
      <p>Seats: ${seats}</p>
      <p>Ticket ID: <strong>${ticketId}</strong></p>
      <p><a href="index.html">Back to Home</a></p>
    `;
  });
  