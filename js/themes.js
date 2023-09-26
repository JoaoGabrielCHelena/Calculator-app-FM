const switchRange = document.querySelector('#theme-switch');
const themeButtons = document.querySelectorAll('[data-theme]');
const label = document.querySelector('.top-row label')

// theme values
const solarizedTheme = {
    "--main-key-background": "hsl(268, 47%, 21%)",
    "--main-key-shadow": "hsl(290, 70%, 36%)",
    "--secondary-key-background": "hsl(281, 89%, 26%)",
    "--secondary-key-shadow": "hsl(285, 91%, 52%)",
    "--tertiary-key-background": "hsl(176, 100%, 44%)",
    "--tertiary-key-shadow": "hsl(177, 92%, 70%)",
    "--primary-text": "hsl(52, 100%, 62%)",
    "--secondary-text": "hsl(0, 0%, 100%)",
    "--tertiary-text": "hsl(198, 20%, 13%)",
    "--main-background": "hsl(268, 75%, 9%)",
    "--keypadToggle-background": "hsl(268, 71%, 12%)",
    "--display-backgound": "hsl(268, 71%, 12%)"
}

const lightTheme = {
    "--main-key-background": "hsl(45, 7%, 89%)",
    "--main-key-shadow": "hsl(35, 11%, 61%)",
    "--secondary-key-background": "hsl(185, 42%, 37%)",
    "--secondary-key-shadow": "hsl(185, 58%, 25%)",
    "--tertiary-key-background": "hsl(25, 98%, 40%)",
    "--tertiary-key-shadow": "hsl(25, 99%, 27%)",
    "--primary-text": "hsl(60, 10%, 19%)",
    "--secondary-text": "hsl(0, 0%, 100%)",
    "--tertiary-text": "hsl(0, 0%, 100%)",
    "--main-background": "hsl(0, 0%, 90%)",
    "--keypadToggle-background": "hsl(0, 5%, 81%)",
    "--display-backgound": "hsl(0, 0%, 93%)"
}

const darkTheme = {
    "--main-key-background": "hsl(30, 25%, 89%)",
    "--main-key-shadow": "hsl(28, 16%, 65%)",
    "--secondary-key-background": "hsl(225, 21%, 49%)",
    "--secondary-key-shadow": "hsl(224, 28%, 35%)",
    "--tertiary-key-background": "hsl(6, 63%, 50%)",
    "--tertiary-key-shadow": "hsl(6, 70%, 34%)",
    "--primary-text": "hsl(221, 14%, 31%)",
    "--secondary-text": "hsl(0, 0%, 100%)",
    "--tertiary-text": "hsl(0, 0%, 100%)",
    "--main-background": "hsl(222, 26%, 31%)",
    "--keypadToggle-background": "hsl(223, 31%, 20%)",
    "--display-backgound": "hsl(224, 36%, 15%)"
}
// event listener to the 1 2 3 above the "switch"
themeButtons.forEach(element => {
    element.addEventListener('click', function() {
        switchRange.value = `${element.textContent}`
        selectTheme()
    })
});

// event listener to the "switch" itself
switchRange.addEventListener('change', function(){
        selectTheme()
    })
    
label.addEventListener('click', function() {
    if (Number(switchRange.value) + 1 > 3) {
        switchRange.value = '1'
        selectTheme()
        return
    }
    switchRange.value = (Number(switchRange.value) + 1).toString()
    selectTheme()
})

// function that actually switches themes
function switchTheme(theme) {
    for (const key in theme) {
        document.documentElement.style.setProperty(`${key}`, `${theme[key]}`)
    }
}

// bit for loading save or prefered theme, preference is given to saved
document.onload = FirstCheck()
function FirstCheck() {
    if(!window.matchMedia && !(localStorage.getItem("theme"))) {
        return;
    } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
        switchRange.value = '1'
    }
    if (localStorage.getItem("theme")) {
        switch (localStorage.getItem("theme")) {
            case 'dark':
                switchRange.value = '1'
                break;
            case 'solarized':
                switchRange.value = '3'
                break;
            default:
                switchRange.value = '2'
                break;
        }
    }
    selectTheme()
}


// it will: switch to the theme, save selected theme locally, and set body attribute for theme-specific styling
function selectTheme() {
    switch (switchRange.value) {
        case '1':
            switchTheme(darkTheme)
            localStorage.setItem('theme', 'dark')
            document.querySelector('body').setAttribute('data-theme', 'dark')
        break 
        case '2':
            switchTheme(lightTheme)
            localStorage.setItem('theme', 'light')
            document.querySelector('body').setAttribute('data-theme', 'light')
        break 
        case '3':
            switchTheme(solarizedTheme)
            localStorage.setItem('theme', 'solarized')
            document.querySelector('body').setAttribute('data-theme', 'solarized')
        break 
        default:
            return 
    }
}