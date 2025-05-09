const isGithubHost = window.location.origin.includes('github.io');
const repositoryName = window.location.pathname.split('/').filter(Boolean)[0];

// updateURLs();

window.addEventListener('DOMContentLoaded', () => {
  const navbarUrl = (isGithubHost ? window.location.origin + '/' + repositoryName : '') + '/navbar.html?' + new Date().getTime();

  fetch(navbarUrl)
    .then(response => response.text())
    .then(html => {
      document.getElementById('navbar').innerHTML = html;
    })
    .then(updateURLs)
    .then(setNavigationBarActive)
    .then(setUpNavigationBarDropDown)
    .then(setUpBackToTopBtn)
    .then(() => {
      const pathParts = window.location.pathname.split('/').filter(Boolean);
      if(pathParts.length <= 0) return;
      const currentPage = pathParts[pathParts.length - 1].toLowerCase();
      if (currentPage === "photography") {
        if(isGithubHost){
          photographyPhotos.forEach((element, index, array) => {
            array[index] = element.replace('/Images', `/${repositoryName}/Images`);
          });
        }
        setupDynamicGallery(photographyPhotos);
      }else if (["illustration", "crazy8", "unleashedlove", "heartofthejungle", "arcards", "acedemo", "goswim"].includes(currentPage)) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (img.id === "lightbox" || img.hasAttribute("data-ignore")) return;
          img.style.cursor = "pointer"; 
          img.addEventListener('click', () => {
            const src = img.src;
            openLightbox(src);
          });
        });
      }
    });
});

function updateURLs(){
  if (isGithubHost) {
    const basePath = window.location.origin + '/' + repositoryName;

    document.querySelectorAll('img, link[rel="stylesheet"], link[rel="icon"], a').forEach(el => {
      let url = el.src || el.href;
      
      const pattern = new RegExp(`^${window.location.origin}/(?!${repositoryName}/)`);
      if (url && pattern.test(url)) {
          // console.log("before " + url);
          const fixedUrl = basePath + url.replace(window.location.origin, '');
          if (el.src) {
              el.src = fixedUrl;
          } else if (el.href) {
              el.href = fixedUrl;
          }
          url = el.src || el.href;
          // console.log("after " + url);
        }
    });

    document.querySelectorAll('style').forEach(styleEl => {
        styleEl.textContent = styleEl.textContent.replace(/url\(["']?\/(.*?)["']?\)/g, (match, path) => {
          return `url(/${repositoryName}/${path})`;
        });
    });
  }
}

function setNavigationBarActive(){
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const currentPage = pathParts[pathParts.length - 1]?.toLowerCase() || '';
  if(pathParts.length <= 0 || (isGithubHost && currentPage === repositoryName)) {
    document.getElementById('home').classList.add('active');
    return;
  }

  const pageToMenuMap = {
      // 'game.html': 'projectsMenu',
      // 'other.html': 'projectsMenu',
      'illustration': 'artsMenu',
      'photography': 'artsMenu'
  };

  const navLinks = document.querySelectorAll('#navbar nav ul li a');
  let matched = false;
  if (pageToMenuMap[currentPage]) {
    const parentMenuId = pageToMenuMap[currentPage];
    const parentMenu = document.getElementById(parentMenuId)?.querySelector('a');
    if (parentMenu) {
      parentMenu.classList.add('active');
      matched = true;
    }
  }

  if (!matched) {
      navLinks.forEach(link => {
        let linkHref = link.getAttribute('href');

        if(isGithubHost){
          linkHref = linkHref.replace(window.location.origin + '/' + repositoryName, '');
        }
        linkHref = linkHref.substring(1);

        if (linkHref === currentPage) {
            link.classList.add('active');
          }
      });
  }
}

function setUpNavigationBarDropDown(){
  const dropdowns = {
    // 'projectsMenu': 'projectsDropdown',
    'artsMenu': 'artsDropdown'
  };
  let currentOpen = null;
  let timeoutId = null;

  function showDropdown(menuId) {
    if (currentOpen && currentOpen !== menuId) {
      hideDropdown(currentOpen);
    }
    clearTimeout(timeoutId);
    document.getElementById(dropdowns[menuId]).classList.remove('dropdown-hidden');
    document.getElementById(dropdowns[menuId]).classList.add('dropdown-visible');
    currentOpen = menuId;
  }

  function hideDropdown(menuId) {
    document.getElementById(dropdowns[menuId]).classList.remove('dropdown-visible');
    document.getElementById(dropdowns[menuId]).classList.add('dropdown-hidden');
    if (currentOpen === menuId) {
      currentOpen = null;
    }
  }

  for (const [menuId, dropdownId] of Object.entries(dropdowns)) {
    const menu = document.getElementById(menuId);
    const dropdown = document.getElementById(dropdownId);
    menu.addEventListener('mouseenter', () => {
      showDropdown(menuId);
    });

    menu.addEventListener('mouseleave', () => {
      timeoutId = setTimeout(() => {
        hideDropdown(menuId);
      }, 300);
    });

    dropdown.addEventListener('mouseenter', () => {
      clearTimeout(timeoutId);
    });

    dropdown.addEventListener('mouseleave', () => {
      timeoutId = setTimeout(() => {
        hideDropdown(menuId);
      }, 300);
    });
  }
}

function setUpBackToTopBtn(){
  const backToTopButton = document.getElementById('backToTop');
  if(!backToTopButton){
    return;
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.remove('hidden');
      backToTopButton.classList.add('opacity-100');
    } else {
      backToTopButton.classList.add('hidden');
      backToTopButton.classList.remove('opacity-100');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

}

const photographyPhotos = [
  '/Images/Photography/1.jpg',
  '/Images/Photography/2.jpg',
  '/Images/Photography/3.jpg',
  '/Images/Photography/4.jpg',
  '/Images/Photography/5.jpg',
  '/Images/Photography/6.jpg',
  '/Images/Photography/7.jpg',
  '/Images/Photography/8.jpg',
  '/Images/Photography/9.jpg',
  '/Images/Photography/10.jpg',
  '/Images/Photography/11.jpg',
  '/Images/Photography/12.jpg',
  '/Images/Photography/13.jpg',
  '/Images/Photography/14.jpg',
  '/Images/Photography/15.jpg',
  '/Images/Photography/16.jpg',
  '/Images/Photography/17.jpg',
  '/Images/Photography/18.jpg',
  '/Images/Photography/19.jpg',
  '/Images/Photography/20.jpg',
  '/Images/Photography/21.jpg',
  '/Images/Photography/22.jpg',
  '/Images/Photography/23.jpg',
  '/Images/Photography/24.jpg',
  '/Images/Photography/25.jpg',
];

let loadedCount = 0;
const batchSize = 6;
let isLoading = false;

function setupDynamicGallery(photos) {
  const gallery = document.getElementById('dynamic-photo-gallery');
  if (!gallery) return;

  gallery.innerHTML = `
    <div id="col-0" class="flex-1 flex flex-col gap-4"></div>
    <div id="col-1" class="flex-1 flex flex-col gap-4"></div>
    <div id="col-2" class="flex-1 flex flex-col gap-4"></div>
  `;
  gallery.className = 'flex gap-4';

  loadMorePhotos(photos);

  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !isLoading) {
      loadMorePhotos(photos);
    }
  });
}

function loadMorePhotos(photos) {
  const loading = document.getElementById('loading');
  if (loadedCount >= photos.length) return;

  isLoading = true;
  loading.classList.remove('hidden');

  setTimeout(() => {
    const nextBatch = photos.slice(loadedCount, loadedCount + batchSize);
    const col0 = document.getElementById('col-0');
    const col1 = document.getElementById('col-1');
    const col2 = document.getElementById('col-2');
    const columns = [col0, col1, col2];
    const threshold = 50; // 阈值

    nextBatch.forEach((src, index) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Photo';
      img.className = 'rounded-lg shadow-md object-cover w-full cursor-pointer transition-transform duration-300 hover:scale-105';
      img.addEventListener('click', () => openLightbox(src));

      img.onload = () => {
        // 按序分配目标列
        const targetIndex = (loadedCount + index) % 3;
        const targetCol = columns[targetIndex];

        // 找出目前实际最短的列。手动计算每列的总高度, 因为div.scrollHeight总保持一致
        function getColumnHeight(column) {
          const imgs = column.querySelectorAll('img');
          let totalHeight = 0;
          imgs.forEach(image => {
            totalHeight += image.offsetHeight;
          });
          return totalHeight;
        }
        const sortedColumns = columns.slice().sort((a, b) => getColumnHeight(a) - getColumnHeight(b));
        const shortestCol = sortedColumns[0];

        if(shortestCol != targetCol){
          // 如果当前最短的列与目标列之间差距过大，则放到最短的列
          const targetHeight = getColumnHeight(targetCol);
          const shortestHeight = getColumnHeight(shortestCol);
  
          if (shortestHeight + threshold < targetHeight) {
            shortestCol.appendChild(img);
          } else {
            targetCol.appendChild(img);
          }
        }else{
          targetCol.appendChild(img);
        }

      };
    });

    loadedCount += nextBatch.length;
    isLoading = false;
    loading.classList.add('hidden');
  }, 500);
}

function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = src;
  lightbox.classList.remove('hidden');

  lightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden');
  });
}
