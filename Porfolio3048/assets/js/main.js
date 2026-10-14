/**
 * ==============================================================================
 * PORTFOLIO JAVASCRIPT - NITIPAT SUPAKDEE (AUTO)
 * Creative Media (สื่อนฤมิต) Portfolio Website
 * Handles: Active navigation, Portfolio Filtering, Modal Previews, Contact Form
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. AUTO-HIGHLIGHT ACTIVE NAVIGATION LINK (ตรวจจับหน้าปัจจุบันและใส่ active)
  // --------------------------------------------------------------------------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // --------------------------------------------------------------------------
  // 2. PORTFOLIO FILTERING (ระบบกรองผลงาน All, Art, 3D Model, Graphics)
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // อัปเดตปุ่ม active
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        // กรองการแสดงผลของการ์ดผลงาน
        portfolioItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');

          if (filterValue === 'all' || itemCategory === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. PORTFOLIO MODAL PREVIEW (เปิด Modal แสดงรายละเอียดผลงาน)
  // --------------------------------------------------------------------------
  const projectModalElement = document.getElementById('projectPreviewModal');
  if (projectModalElement) {
    const projectModal = new bootstrap.Modal(projectModalElement);
    const modalImage = document.getElementById('modalProjectImg');
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalCategory = document.getElementById('modalProjectCategory');
    const modalDesc = document.getElementById('modalProjectDesc');

    document.querySelectorAll('.btn-preview-project').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.portfolio-card');
        if (card) {
          const title = card.querySelector('.portfolio-title')?.textContent || 'Project Showcase';
          const cat = card.querySelector('.portfolio-category-tag')?.textContent || 'Creative Media';
          const desc = card.querySelector('.portfolio-desc')?.textContent || 'Detailed description of the creative artwork.';
          const imgSrc = card.querySelector('.portfolio-img-container img')?.getAttribute('src') || '';

          if (modalTitle) modalTitle.textContent = title;
          if (modalCategory) modalCategory.textContent = cat;
          if (modalDesc) modalDesc.textContent = desc;
          if (modalImage) modalImage.src = imgSrc;

          projectModal.show();
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. CONTACT FORM SUBMISSION (จำลองการส่งข้อความติดต่อ)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const messageInput = document.getElementById('contactMessage');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Please fill in all required fields.');
        return;
      }

      // แสดงการแจ้งเตือนส่งข้อความสำเร็จ
      if (formSuccessAlert) {
        formSuccessAlert.classList.remove('d-none');
        formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // รีเซ็ตแบบฟอร์ม
      contactForm.reset();

      // ซ่อนข้อความแจ้งเตือนอัตโนมัติหลังจาก 5 วินาที
      setTimeout(() => {
        if (formSuccessAlert) {
          formSuccessAlert.classList.add('d-none');
        }
      }, 5000);
    });
  }

  // --------------------------------------------------------------------------
  // 5. STATS ANIMATED COUNTERS (เอฟเฟกต์ตัวเลขนับสถิติหน้า Home)
  // --------------------------------------------------------------------------
  const counterElements = document.querySelectorAll('.stat-number[data-target]');
  if (counterElements.length > 0) {
    counterElements.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      let count = 0;
      const step = Math.ceil(target / 40);

      const updateCounter = () => {
        count += step;
        if (count < target) {
          counter.textContent = count + suffix;
          setTimeout(updateCounter, 30);
        } else {
          counter.textContent = target + suffix;
        }
      };
      updateCounter();
    });
  }

  // --------------------------------------------------------------------------
  // 6. BACK TO TOP BUTTON (ปุ่มเลื่อนกลับขึ้นบนสุดอย่างนุ่มนวล)
  // --------------------------------------------------------------------------
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

