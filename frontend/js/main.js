document.getElementById('searchForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
  
    // Simulate API response
    const buses = [
      { id: 1, name: 'Bus A', time: '9:00 AM', price: 20 },
      { id: 2, name: 'Bus B', time: '10:00 AM', price: 25 }
    ];
  
    const resultsDiv = document.getElementById('busResults');
    resultsDiv.innerHTML = `<h3>Available Buses from ${source} to ${destination}</h3>`;
    buses.forEach(bus => {
      resultsDiv.innerHTML += `
        <div class="bus-card">
          <p><strong>${bus.name}</strong> - ${bus.time}</p>
          <p>Price: ₹${bus.price}</p>
          <a href="book-ticket.html?busId=${bus.id}">Book Now</a>
        </div>
      `;
    });
  });
  