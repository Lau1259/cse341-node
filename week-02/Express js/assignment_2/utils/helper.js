let hidden = false;

function toggleHidden() {
  document.getElementById('hidden').classList.toggle('hide');
  setTimeout(() => {
    document.getElementById('hidden').classList.toggle('hidden');
    hidden = true;
  }, 1000)
  let btn = document.getElementById('btn01');
  if (!hidden) {
    btn.innerText = "Now you dont...";
    btn.style.color = '#fff';
  }
  setTimeout(() => {
    btn.innerText = "Curious?";
    btn.style.color = "goldenrod";
    hidden = false;
  }, 2500);
}