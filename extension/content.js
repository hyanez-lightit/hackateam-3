if (window.location.href.startsWith('https://securestaging.gethealthie.com/users/')) {
  const userId = window.location.href.split('/').pop();

  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.bottom = '10px';
  overlay.style.left = '10px';
  overlay.style.padding = '10px';
  overlay.style.background = '#fff';
  overlay.style.border = '1px solid #ccc';
  overlay.style.zIndex = '9999';
  overlay.textContent = `User ID: ${userId}`;

  document.body.appendChild(overlay);
}