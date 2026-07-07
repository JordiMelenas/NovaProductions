document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// Lightbox
const galleryItems = Array.from(document.querySelectorAll('#galleryGrid .g-item'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentIndex = 0;

function openLightbox(index){
  currentIndex = index;
  lightboxImg.src = galleryItems[currentIndex].dataset.full;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showDelta(delta){
  currentIndex = (currentIndex + delta + galleryItems.length) % galleryItems.length;
  lightboxImg.src = galleryItems[currentIndex].dataset.full;
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => showDelta(-1));
lightboxNext.addEventListener('click', () => showDelta(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showDelta(-1);
  if (e.key === 'ArrowRight') showDelta(1);
});
