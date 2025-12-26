document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const backToTop = document.querySelector(".back-to-top");
  const sections = document.querySelectorAll("section[id]");
  const bookingForm = document.getElementById("booking-form");

  /* =========================
     BURGER MENU
  ========================= */
  hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
  });

  // Закрытие меню при клике на пункт
  navLinks.forEach(link => {
      link.addEventListener("click", () => {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
          document.body.classList.remove("no-scroll");
      });
  });

  /* =========================
     SCROLL: HEADER + BACK TO TOP
  ========================= */
  window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;

      // Кнопка "вверх"
      if (scrollY > 600) {
          backToTop.classList.add("visible");
      } else {
          backToTop.classList.remove("visible");
      }

      // Скрытие/появление header
      if (scrollY > 100) {
          header.classList.add("scrolled");
      } else {
          header.classList.remove("scrolled");
      }

      setActiveMenuItem();
  });

  /* =========================
     АКТИВНЫЙ ПУНКТ МЕНЮ
  ========================= */
  function setActiveMenuItem() {
      let currentSection = "";

      sections.forEach(section => {
          const sectionTop = section.offsetTop - 120;
          const sectionHeight = section.offsetHeight;

          if (
              window.scrollY >= sectionTop &&
              window.scrollY < sectionTop + sectionHeight
          ) {
              currentSection = section.getAttribute("id");
          }
      });

      navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentSection}`) {
              link.classList.add("active");
          }
      });
  }

  /* =========================
     ФИЛЬТР ПОРТФОЛИО
  ========================= */
  const filterInputs = document.querySelectorAll('.portfolio-filter input[type="radio"]');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterInputs.forEach(input => {
      input.addEventListener('change', function() {
          const filterValue = this.id.replace('filter-', '');
          
          portfolioItems.forEach(item => {
              if (filterValue === 'all') {
                  item.classList.remove('hidden');
                  item.classList.add('visible');
              } else {
                  if (item.dataset.category === filterValue) {
                      item.classList.remove('hidden');
                      item.classList.add('visible');
                  } else {
                      item.classList.remove('visible');
                      item.classList.add('hidden');
                  }
              }
          });
      });
  });

  /* =========================
     КАРУСЕЛЬ ФОТО
  ========================= */
  const carousel = document.querySelector('.photo-carousel');
  if (carousel) {
      const slides = document.querySelectorAll('.carousel-slide');
      const dots = document.querySelectorAll('.dot');
      const prevBtn = document.querySelector('.prev-btn');
      const nextBtn = document.querySelector('.next-btn');
      
      let currentSlide = 0;
      let autoPlayInterval;

      function initCarousel() {
          slides[0].classList.add('active');
          dots[0].classList.add('active');
          startAutoPlay();
      }

      function goToSlide(n, direction = 'next') {
          slides[currentSlide].classList.remove('active');
          dots[currentSlide].classList.remove('active');
          
          currentSlide = (n + slides.length) % slides.length;
          
          slides[currentSlide].classList.add('active');
          dots[currentSlide].classList.add('active');
      }

      function nextSlide() {
          goToSlide(currentSlide + 1);
      }

      function prevSlide() {
          goToSlide(currentSlide - 1);
      }

      function startAutoPlay() {
          autoPlayInterval = setInterval(nextSlide, 5000);
      }

      function stopAutoPlay() {
          clearInterval(autoPlayInterval);
      }

      if (prevBtn) {
          prevBtn.addEventListener('click', function() {
              stopAutoPlay();
              prevSlide();
          });
      }

      if (nextBtn) {
          nextBtn.addEventListener('click', function() {
              stopAutoPlay();
              nextSlide();
          });
      }

      dots.forEach(dot => {
          dot.addEventListener('click', function() {
              stopAutoPlay();
              const slideIndex = parseInt(this.dataset.slide);
              goToSlide(slideIndex);
          });
      });

      carousel.addEventListener('mouseenter', stopAutoPlay);
      carousel.addEventListener('mouseleave', startAutoPlay);

      initCarousel();
  }

  /* =========================
     ПАСХАЛКИ И ЭФФЕКТЫ
  ========================= */
  // 1. Создаем волшебную кнопку
  const magicBtn = document.createElement('div');
  magicBtn.className = 'secret-magic-btn';
  magicBtn.innerHTML = '✨';
  magicBtn.title = 'Нажми для волшебства!';
  document.body.appendChild(magicBtn);

  // 2. Создаем кота-помощника
  const catHelper = document.createElement('div');
  catHelper.className = 'cat-helper';
  document.body.appendChild(catHelper);

  // 3. Активация кота при наведении на логотип
  const logo = document.querySelector('.nav-brand');
  logo.addEventListener('mouseenter', () => {
      catHelper.classList.add('active');
      setTimeout(() => {
          catHelper.classList.remove('active');
      }, 2000);
  });

  // 4. Функция создания сердечек
  function createHearts(count) {
      const container = document.createElement('div');
      container.className = 'falling-hearts';
      document.body.appendChild(container);
      
      for (let i = 0; i < count; i++) {
          const heart = document.createElement('div');
          heart.className = 'heart';
          heart.innerHTML = '❤️';
          heart.style.left = Math.random() * 100 + 'vw';
          heart.style.animationDuration = (Math.random() * 2 + 1) + 's';
          heart.style.fontSize = (Math.random() * 15 + 12) + 'px';
          container.appendChild(heart);
          
          setTimeout(() => {
              heart.remove();
          }, 3000);
      }
      
      setTimeout(() => {
          container.remove();
      }, 3000);
  }

  // 5. Волшебная кнопка - только сердечки
  magicBtn.addEventListener('click', function() {
      createHearts(20);
      showNotification('Волшебство! ✨');
  });

  // 6. Волшебный луч при клике на логотип
  logo.addEventListener('click', function() {
      const beam = document.createElement('div');
      beam.className = 'magic-beam';
      document.body.appendChild(beam);
      
      setTimeout(() => {
          beam.remove();
      }, 800);
  });

  // 7. Уведомления
  function showNotification(text) {
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = text;
      notification.style.cssText = `
          position: fixed;
          top: 100px;
          right: 20px;
          background: rgba(166, 122, 91, 0.95);
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          z-index: 10000;
          animation: slideInRight 0.3s ease;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          max-width: 250px;
          font-size: 0.9rem;
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
          notification.style.animation = 'slideOutRight 0.3s ease';
          setTimeout(() => notification.remove(), 300);
      }, 2000);
  }

  /* =========================
     ОБРАБОТКА ФОРМЫ ЗАПИСИ
  ========================= */
  if (bookingForm) {
      // Маска для телефона
      const phoneInput = bookingForm.querySelector('input[type="tel"]');
      if (phoneInput) {
          phoneInput.addEventListener('input', function(e) {
              let value = e.target.value.replace(/\D/g, '');
              
              if (value.length > 0) {
                  value = '+375 (' + value;
                  
                  if (value.length > 9) {
                      value = value.substring(0, 9) + ') ' + value.substring(9);
                  }
                  if (value.length > 14) {
                      value = value.substring(0, 14) + '-' + value.substring(14);
                  }
                  if (value.length > 17) {
                      value = value.substring(0, 17) + '-' + value.substring(17);
                  }
              }
              
              e.target.value = value;
          });
      }

      // Устанавливаем минимальную дату сегодня
      const dateInput = bookingForm.querySelector('input[type="date"]');
      if (dateInput) {
          const today = new Date().toISOString().split('T')[0];
          dateInput.min = today;
      }

      // Отправка формы
      bookingForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          
          // Сбор данных формы
          const formData = {
              name: this.querySelector('input[type="text"]').value.trim(),
              phone: this.querySelector('input[type="tel"]').value.trim(),
              service: this.querySelector('select').value,
              date: this.querySelector('input[type="date"]').value,
              time: this.querySelector('input[type="time"]').value,
              message: this.querySelector('textarea').value.trim(),
              timestamp: new Date().toLocaleString('ru-RU')
          };
          
          // Валидация
          if (!formData.name || !formData.phone || !formData.service) {
              showMessage('Пожалуйста, заполните обязательные поля', 'error');
              return;
          }
          
          // Анимация отправки
          const submitBtn = this.querySelector('.submit-btn');
          const originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
          submitBtn.disabled = true;
          
          try {
              // Отправка на почту через Formspree
              const response = await sendToEmail(formData);
              
              if (response.ok) {
                  showMessage('Заявка успешно отправлена! Я свяжусь с вами в ближайшее время.', 'success');
                  
                  // Конфетти эффект
                  createConfetti();
                  
                  // Сброс формы
                  bookingForm.reset();
              } else {
                  showMessage('Ошибка при отправке. Пожалуйста, позвоните по телефону.', 'error');
              }
          } catch (error) {
              showMessage('Ошибка соединения. Проверьте интернет и попробуйте еще раз.', 'error');
          } finally {
              // Возвращаем кнопку в исходное состояние
              submitBtn.innerHTML = originalText;
              submitBtn.disabled = false;
          }
      });

      // Валидация в реальном времени
      const requiredInputs = bookingForm.querySelectorAll('[required]');
      requiredInputs.forEach(input => {
          input.addEventListener('blur', function() {
              validateField(this);
          });
      });
  }

  /* =========================
     ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
  ========================= */
  async function sendToEmail(data) {
      // Отправляем через Formspree
      const formspreeEndpoint = 'https://formspree.io/f/xleqbdee';
      
      const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              name: data.name,
              phone: data.phone,
              service: getServiceName(data.service),
              date: data.date,
              time: data.time,
              message: data.message,
              _subject: `Новая заявка от ${data.name}`,
              _replyto: 'talashkevichdasha1@gmail.com',
              _cc: 'talashkevichdasha1@gmail.com'
          })
      });
      
      return response;
  }

  function getServiceName(value) {
      const services = {
          'wedding': 'Свадебный макияж - 100 BYN',
          'evening': 'Вечерний макияж - 100 BYN',
          'photo': 'Макияж для фотосессии - 100 BYN',
          'day': 'Дневной макияж - 90 BYN',
          'learning': 'Обучение макияжу'
      };
      return services[value] || value;
  }

  function validateField(field) {
      const value = field.value.trim();
      
      if (field.hasAttribute('required') && !value) {
          field.style.borderColor = '#ff6b6b';
          return false;
      }
      
      if (field.type === 'tel' && value) {
          const phoneRegex = /^\+375 \(\d{2}\) \d{3}-\d{2}-\d{2}$/;
          if (!phoneRegex.test(value)) {
              field.style.borderColor = '#ff6b6b';
              return false;
          }
      }
      
      field.style.borderColor = '';
      return true;
  }

  function showMessage(message, type) {
      const existingMessage = document.querySelector('.form-message');
      if (existingMessage) existingMessage.remove();
      
      const messageElement = document.createElement('div');
      messageElement.className = `form-message ${type}`;
      messageElement.textContent = message;
      
      document.body.appendChild(messageElement);
      
      setTimeout(() => {
          messageElement.style.animation = 'slideUp 0.3s ease';
          setTimeout(() => messageElement.remove(), 300);
      }, 4000);
  }

  function createConfetti() {
      const colors = ['#a67a5b', '#c89a7d', '#ffd700'];
      const confettiCount = 50;
      
      for (let i = 0; i < confettiCount; i++) {
          const confetti = document.createElement('div');
          confetti.style.cssText = `
              position: fixed;
              width: 8px;
              height: 8px;
              background: ${colors[Math.floor(Math.random() * colors.length)]};
              border-radius: 50%;
              opacity: 0;
              z-index: 9999;
              pointer-events: none;
          `;
          
          confetti.style.left = Math.random() * 100 + 'vw';
          confetti.style.top = '-10px';
          confetti.style.animation = `
              confettiFall ${Math.random() * 1.5 + 1}s ease-out forwards
          `;
          
          document.body.appendChild(confetti);
          
          setTimeout(() => confetti.remove(), 2000);
      }
  }

  // Добавляем стили для анимаций
  const style = document.createElement('style');
  style.textContent = `
      @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
      }
      
      @keyframes slideUp {
          from {
              transform: translateX(-50%) translateY(0);
              opacity: 1;
          }
          to {
              transform: translateX(-50%) translateY(-20px);
              opacity: 0;
          }
      }
      
      @keyframes confettiFall {
          to {
              transform: translateY(100vh) rotate(${Math.random() * 360}deg);
              opacity: 0;
          }
      }
      
      .fa-spinner {
          animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
      }
      
      .notification {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      
      .form-message {
          position: fixed;
          top: 100px;
          left: 50%;
          transform: translateX(-50%);
          padding: 20px 30px;
          border-radius: 10px;
          color: white;
          font-weight: 500;
          z-index: 10000;
          animation: slideDown 0.3s ease;
          backdrop-filter: blur(10px);
          max-width: 90%;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .form-message.success {
          background: rgba(40, 167, 69, 0.95);
      }
      
      .form-message.error {
          background: rgba(220, 53, 69, 0.95);
      }
      
      @keyframes slideDown {
          from {
              transform: translateX(-50%) translateY(-20px);
              opacity: 0;
          }
          to {
              transform: translateX(-50%) translateY(0);
              opacity: 1;
          }
      }
      
      /* Простая анимация для иконок в услугах */
      .service-card:hover .service-icon {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
      }
      
      /* Простая анимация для цен */
      .service-price:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
      }
  `;
  document.head.appendChild(style);
});
// ===== FEEDBACK FORM HANDLER =====
document.addEventListener('DOMContentLoaded', function() {
  const feedbackForm = document.getElementById('feedback-form');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');
  
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Показать индикатор загрузки
      const submitBtn = feedbackForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
      submitBtn.disabled = true;
      
      try {
        // Собрать данные формы
        const formData = new FormData(feedbackForm);
        
        // Отправить данные на getform.io
        const response = await fetch(feedbackForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Успешная отправка
          showMessage(successMessage);
          feedbackForm.reset();
        } else {
          // Ошибка при отправке
          throw new Error('Ошибка отправки формы');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        showMessage(errorMessage);
      } finally {
        // Восстановить кнопку
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
  
  function showMessage(messageElement) {
    messageElement.style.display = 'block';
    messageElement.style.animation = 'slideDown 0.3s ease';
    
    // Скрыть сообщение через 5 секунд
    setTimeout(() => {
      messageElement.style.animation = 'slideUp 0.3s ease';
      setTimeout(() => {
        messageElement.style.display = 'none';
      }, 300);
    }, 5000);
  }
});
