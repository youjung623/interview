const projects = {
  'automation-law': {
    category: 'automation',
    html: `
      <div class="m-tag">Automation</div>
      <h1>법령 정보 자율 모니터링을 위한<br>알림 자동화 프로젝트</h1>
      <p class="m-subtitle">
        법제처 생활법령 업데이트 내역을 자동으로 수집·정리하여 이메일로 발송하는 시스템을
        <strong>Claude Code</strong>를 활용해 기획·구현했습니다.
      </p>

      <h2>배경 및 목적</h2>
      <p>
        커머스 플랫폼에서 온라인 MD로 근무하며 정책 변경에 대한 즉각적인 대응이 곧 리스크 관리의 핵심이라는 점을
        실무에서 직접 경험했습니다. 당시에는 관련 사이트를 수동으로 모니터링하며 대응했으나, 변경 사항을 늦게
        인지하거나 일부를 놓칠 수 있는 구조적 한계가 있었습니다.
      </p>
      <div class="highlight-box">
        <p>정책 모니터링을 자동화하면 대응 속도를 높이고, 누락 리스크를 체계적으로 줄일 수 있다고 판단하여 이 시스템을 기획했습니다.</p>
      </div>

      <h2>워크플로우</h2>
      <div class="workflow-steps">
        <div class="workflow-step">
          <div class="step-num">0</div>
          <div class="step-content">
            <strong>스케줄러 자동 실행</strong>
            <span>GitHub Actions 기반으로 매일 KST 09:00에 자동 실행</span>
          </div>
        </div>
        <div class="workflow-arrow">↓</div>
        <div class="workflow-step">
          <div class="step-num">1</div>
          <div class="step-content">
            <strong>RSS 피드 수집</strong>
            <span>법제처 국가법령정보센터 RSS/API를 통해 생활법령 개정 내역 전체 항목 수집</span>
          </div>
        </div>
        <div class="workflow-arrow">↓</div>
        <div class="workflow-step">
          <div class="step-num">2</div>
          <div class="step-content">
            <strong>필터링</strong>
            <span>생활법령 카테고리 정확 일치 항목 선별 → 커머스·통관·전자상거래 키워드 2차 필터링<br>
            (전자상거래법, 관세법, KC인증 등) → 핵심 내용 요약 처리</span>
          </div>
        </div>
        <div class="workflow-arrow">↓</div>
        <div class="workflow-step">
          <div class="step-num">3</div>
          <div class="step-content">
            <strong>이메일 알림 발송</strong>
            <span>필터링·요약된 법령 정보를 HTML + 텍스트 형식으로 담당자에게 자동 발송</span>
          </div>
        </div>
      </div>

      <h2>기대 효과</h2>
      <div class="effect-grid">
        <div class="effect-item">
          <div class="effect-icon">⚡</div>
          <p>수작업 없이 최신 법령을 자동 수신, 업무 효율성 향상</p>
        </div>
        <div class="effect-item">
          <div class="effect-icon">🎯</div>
          <p>핵심 정보만 추려 의사결정 속도 개선</p>
        </div>
        <div class="effect-item">
          <div class="effect-icon">🛡️</div>
          <p>법령 변경 누락 방지로 정책 대응력 강화</p>
        </div>
      </div>

      <h2>사용 기술</h2>
      <ul>
        <li>GitHub Actions — 스케줄 기반 자동 실행</li>
        <li>Python — RSS 파싱, 필터링 로직, 이메일 발송</li>
        <li>법제처 RSS/API — 법령 데이터 수집</li>
        <li>Claude Code — 전체 워크플로우 설계 및 코드 구현 보조</li>
      </ul>

      <h2>한계 및 보완 계획</h2>
      <div class="limit-box">
        <p>
          <strong>현재 상태:</strong> 법제처 생활법령 새소식에 인터넷 쇼핑 관련 업데이트가 없어
          테스트 이메일 수신이 불가한 상태입니다.
        </p>
      </div>
      <div class="highlight-box">
        <p>
          <strong>보완 계획:</strong> 추후 <code>title == "인터넷 쇼핑"</code> 조건의 필터링을 추가해
          인터넷 쇼핑 관련 업데이트 소식만 선별 수신할 수 있도록 개선할 예정입니다.
        </p>
      </div>
    `
  }
};

// Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Modal
const overlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementById('modalClose');

document.querySelectorAll('.card-detail-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.project;
    const project = projects[key];
    if (!project) return;
    modalContent.innerHTML = project.html;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
