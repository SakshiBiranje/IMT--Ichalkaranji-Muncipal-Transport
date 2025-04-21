document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const user = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    };
    alert(`Logged in as ${user.username}`);
    window.location.href = 'user-dashboard.html';
  });
  
  document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const user = {
      username: document.getElementById('regUsername').value,
      email: document.getElementById('regEmail').value,
      password: document.getElementById('regPassword').value
    };
    alert(`Registered successfully as ${user.username}`);
    window.location.href = 'login.html';
  });
  