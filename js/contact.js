const $ = document

//css loader actions

const loaderContainer = $.querySelector('.loader__container')
const siteContent = $.querySelector('.site__content')

function loadPage () {
        loaderContainer.classList.add('hidden')
        siteContent.classList.remove('hidden')
}

window.addEventListener('DOMContentLoaded' , loadPage)

// popup form actions

let signInButtons = $.querySelectorAll('.sign__in-btn')
let formInputs = $.querySelectorAll('.popup__form form input')
let loginSignupLink = $.querySelectorAll('.popup__form form .register a')


signInButtons.forEach(btn => {
    btn.addEventListener('click' , () => {
        document.body.classList.add('show-popup' , 'no-scrolling')
        closeHamburgerMenu()
    })
})

let closeFormButton = $.querySelectorAll('.close__form')

closeFormButton.forEach(button => {
    button.addEventListener('click' , () => {
        document.body.className = ''
        clearInputs()
    })
})

loginSignupLink.forEach(link => {
    link.addEventListener('click' , (e) => {
        e.preventDefault();

        document.body.classList[link.id === 'signup__link' ? 'add' : 'remove']('show-signup');
        clearInputs()
    })
})

// show input password

const showBtnIcons = $.querySelectorAll('.input__box a')

showBtnIcons.forEach(btn => {
    btn.addEventListener('click' , (e) => {
        e.preventDefault()
        if(btn.previousElementSibling.previousElementSibling.type == 'password') {
            showPassword(e)
        } else {
            hiddenPassword(e)
        }
    })
})

function showPassword (e) {
    e.target.className = 'fa fa-eye-slash'
    e.target.previousElementSibling.previousElementSibling.type = 'text'
}

function hiddenPassword (e) {
    e.target.className = 'fa fa-eye'
    e.target.previousElementSibling.previousElementSibling.type = 'password'
}

// clear Form inputs

let formPasswordInputs = $.querySelectorAll('.input__box .password__input')

function clearInputs () {
    formInputs.forEach(input => {
        input.value = ''
    })

    formPasswordInputs.forEach(input => {
        input.type = 'password'
    })

    showBtnIcons.forEach(icon => {
        icon.className = 'fa fa-eye'
    })
}

// navbar fixed on scroll

window.addEventListener('scroll' , () => {
    if(window.scrollY > 0) {
        $.querySelector('.nav__sect').classList.add('scrolled')
        $.querySelector('.nav__bar').classList.add('scrolled')
    } else {
        $.querySelector('.nav__sect').classList.remove('scrolled')
        $.querySelector('.nav__bar').classList.remove('scrolled')
    }
})

// hamburger menu

const hamburgerMenuBtn = $.querySelector('.hamburger__menu-btn')
const hamburgerMenuIcon = $.querySelector('.hamburger__menu')
const navList = $.querySelector('.nav__list')
const navLinks = $.querySelectorAll('.nav__list .nav__link')

hamburgerMenuBtn.addEventListener('click' , () => {
    hamburgerMenuIcon.classList.toggle('open')
    navList.classList.toggle('show')
})

navLinks.forEach(navLink => {
    navLink.addEventListener('click' , () => {
        closeHamburgerMenu()
    })
})

const closeHamburgerMenu = () => {
    hamburgerMenuIcon.classList.remove('open')
    navList.classList.remove('show')
}