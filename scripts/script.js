  const header = document.querySelector('.header');
  const darkSection = document.querySelector('.banner.dark-bg');

  function updateHeaderClass() {
    const sectionRect = darkSection.getBoundingClientRect();

    const sectionVisible =
      sectionRect.top <= 70 && sectionRect.bottom > 0;

    if (sectionVisible) {
      header.classList.add('light-text');
      header.classList.remove('dark-text');
    } else {
      header.classList.add('dark-text');
      header.classList.remove('light-text');
    }
  }

  ['scroll', 'resize', 'load'].forEach(event =>
    window.addEventListener(event, updateHeaderClass)
  );
