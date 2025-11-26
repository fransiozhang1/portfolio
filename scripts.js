document.addEventListener('DOMContentLoaded', () => {
    const leftMenuContainer = document.getElementById('left-menu-container');
    const menuToggle = document.getElementById('menu-toggle');
    const nameLogo = document.getElementById('name-logo');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const dropdownMenu = document.getElementById('dropdown-menu');

    let menuIsActive = false; // 跟踪菜单是否处于打开状态

    // --- 1. 悬停转换：姓名 <-> 汉堡图标 ---
    menuToggle.addEventListener('mouseenter', () => {
        if (menuIsActive) return; // 如果菜单已打开，则不执行悬停转换

        // 姓名淡出并上移
        nameLogo.style.transform = 'translateY(-100%)';
        
        // 汉堡图标淡入
        setTimeout(() => {
            nameLogo.classList.add('hidden');
            hamburgerIcon.classList.remove('hidden');
            hamburgerIcon.style.opacity = '1';
        }, 300);
    });

    menuToggle.addEventListener('mouseleave', () => {
        if (menuIsActive) return; // 如果菜单已打开，则不执行悬停转换

        // 汉堡图标淡出
        hamburgerIcon.style.opacity = '0';
        
        // 姓名淡入并下移
        setTimeout(() => {
            hamburgerIcon.classList.add('hidden');
            nameLogo.classList.remove('hidden');
            nameLogo.style.transform = 'translateY(0)';
        }, 300);
    });

    // --- 2. 点击切换：菜单的显示/隐藏 ---
    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation(); // 阻止点击事件冒泡到 document

        if (!menuIsActive) {
            // 打开菜单
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.maxHeight = '200px'; 
            menuIsActive = true;
            
            // 确保显示为汉堡图标
            nameLogo.classList.add('hidden');
            nameLogo.style.transform = 'translateY(-100%)';
            hamburgerIcon.classList.remove('hidden');
            hamburgerIcon.style.opacity = '1';

        } else {
            // 关闭菜单
            closeMenu();
        }
    });

    // --- 3. 全局点击：点击页面其他地方关闭菜单 ---
    document.addEventListener('click', (event) => {
        // 检查点击是否发生在左侧菜单容器内部
        if (menuIsActive && !leftMenuContainer.contains(event.target)) {
            closeMenu();
        }
    });

    // 通用关闭菜单函数
    function closeMenu() {
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.maxHeight = '0';
        menuIsActive = false;

        // 还原为 WEIYU ZHANG
        setTimeout(() => {
            dropdownMenu.style.visibility = 'hidden';
            hamburgerIcon.style.opacity = '0';
            hamburgerIcon.classList.add('hidden');
            nameLogo.classList.remove('hidden');
            nameLogo.style.transform = 'translateY(0)';
        }, 400); // 400ms 对应 CSS 的 max-height 过渡时间
    }
});