// Saves options to chrome.storage
function save_options() {
  var ip_address = document.getElementById('ip_addr').value;
  var ip_portnum = document.getElementById('ip_port').value;
  var password = document.getElementById('pass').value;

  chrome.storage.local.set({
    'obs_ip_address': ip_address,
    'obs_ip_portnum': ip_portnum,
    'obs_password': password
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.local.get({
    'obs_ip_address': 'localhost',
    'obs_ip_portnum': '4444',
    'obs_password': 'password'
  }, function(items) {
    document.getElementById('ip_addr').value = items.obs_ip_address;
    document.getElementById('ip_port').value = items.obs_ip_portnum;
    document.getElementById('pass').value = items.obs_password;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);