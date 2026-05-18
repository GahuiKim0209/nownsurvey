/* 1. 스크롤 애니메이션 (IntersectionObserver) */
const fadeEls = document.querySelectorAll(
  '.use-item, .s-card, .feat-item, .sec-card, .fgd-feat, .simple-head, .use-inner-solo > *, .ai-card, .ai-inner > *:not(.ai-grid)'
);

fadeEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  el.style.transitionDelay = (i % 4) * 0.08 + 's';
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => fadeObserver.observe(el));


/* 2. 상단으로 이동 버튼 */
const topBtn = document.createElement('button');
topBtn.id = 'top-btn';
topBtn.innerHTML = '&#8679;';
topBtn.title = '상단으로 이동';
Object.assign(topBtn.style, {
  position: 'fixed',
  bottom: '32px',
  right: '32px',
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  background: '#ED5C23',
  color: '#fff',
  border: 'none',
  fontSize: '22px',
  cursor: 'pointer',
  opacity: '0',
  transform: 'translateY(12px)',
  transition: 'opacity 0.3s ease, transform 0.3s ease',
  zIndex: '999',
  boxShadow: '0 4px 16px rgba(237,92,35,0.35)',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
});
document.body.appendChild(topBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    topBtn.style.opacity = '1';
    topBtn.style.transform = 'translateY(0)';
    topBtn.style.pointerEvents = 'auto';
  } else {
    topBtn.style.opacity = '0';
    topBtn.style.transform = 'translateY(12px)';
    topBtn.style.pointerEvents = 'none';
  }
});

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

topBtn.addEventListener('mouseenter', () => {
  topBtn.style.background = '#C44A18';
  topBtn.style.transform = 'translateY(-2px)';
});
topBtn.addEventListener('mouseleave', () => {
  topBtn.style.background = '#ED5C23';
  topBtn.style.transform = 'translateY(0)';
});


/* 3. FGD 비교표 행 호버 시 나우앤서베이 열 강조 */
const tableRows = document.querySelectorAll('.table-wrap tbody tr');

tableRows.forEach(row => {
  const nowCell = row.querySelector('.col-now');

  row.addEventListener('mouseenter', () => {
    if (nowCell) {
      nowCell.style.transition = 'background 0.2s, box-shadow 0.2s';
      nowCell.style.background = '#FFD8C4';
      nowCell.style.boxShadow = 'inset 0 0 0 2px #ED5C23';
    }
  });

  row.addEventListener('mouseleave', () => {
    if (nowCell) {
      nowCell.style.background = '#FFF0EB';
      nowCell.style.boxShadow = 'none';
    }
  });
});


/* 4. 사용 편의성 카드 Tilt 효과 */
const tiltCards = document.querySelectorAll('.s-card');

tiltCards.forEach(card => {
  card.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease';
  card.style.willChange = 'transform';

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotX = (-dy * 6).toFixed(2);
    const rotY = (dx * 6).toFixed(2);
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px) scale(1.02)`;
    card.style.boxShadow = `0 16px 40px rgba(237,92,35,0.13)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    card.style.boxShadow = 'none';
  });
});
