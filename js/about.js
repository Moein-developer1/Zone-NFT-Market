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
        document.body.className = '';
        clearInputs()
    })
})

loginSignupLink.forEach(link => {
    link.addEventListener('click' , (e) => {
        e.preventDefault()
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

// carousel , our team

let carouselWraper = $.querySelector('.carousel__wraper')
let carousel = $.querySelector('.carousel')
let arrowButtons = $.querySelectorAll('.carousel__wraper button')
let firstCardWidth = $.querySelector('.card').offsetWidth
let carouselChildren = [...carousel.children]

let isDrag = false , startX , startScrollLeft , timeoutId

let cardPreView = Math.round(carousel.offsetWidth / firstCardWidth)

carouselChildren.slice(-cardPreView).reverse().forEach(card => {
    carousel.insertAdjacentHTML('afterbegin' , card.outerHTML)
})

carouselChildren.slice(0 , cardPreView).forEach(card => {
    carousel.insertAdjacentHTML('beforeend' , card.outerHTML)
})

arrowButtons.forEach(button => {
    button.addEventListener('click' , () => {
        if(button.id === 'next') {
            carousel.scrollLeft += firstCardWidth
        } else {
            carousel.scrollLeft += -firstCardWidth
        }
    })
})

const autoPlay = () => {
    timeoutId = setInterval(() => {
        carousel.scrollLeft += firstCardWidth
    }, 3000);
}

autoPlay()

const dragStart = (e) => {
    isDrag = true
    carousel.classList.add('dragging')
    startX = e.pageX
    startScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
    if(!isDrag) return
    carousel.scrollLeft = startScrollLeft - ( e.pageX - startX )
}

const dragEnd = () => {
    isDrag = false
    carousel.classList.remove('dragging')
}

const infiniteScroll = () => {
    if(carousel.scrollLeft === 0){
        carousel.classList.add('no-transition')
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth)
        carousel.classList.remove('no-transition')
    } 
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add('no-transition')
        carousel.scrollLeft = carousel.offsetWidth
        carousel.classList.remove('no-transition')
    }

    clearInterval(timeoutId)
    if(!carouselWraper.matches(':hover')) autoPlay ();
}

carousel.addEventListener('mousedown' , dragStart)
carousel.addEventListener('mousemove' , dragging)
document.addEventListener('mouseup' , dragEnd)
carousel.addEventListener('scroll' , infiniteScroll)
carouselWraper.addEventListener('mouseenter' , clearInterval(timeoutId))
carouselWraper.addEventListener('mouseleave' , infiniteScroll)

// accordion

let accordionContent = $.querySelectorAll('.accordion__content')

accordionContent.forEach((item,index) => {
    let contentHeader = item.querySelector('.content__header')

    contentHeader.addEventListener('click' , () => {
        item.classList.toggle('open')

        let description = item.querySelector('.description')
        if(item.classList.contains('open')){
            description.style.height = `${description.scrollHeight}px`
            item.querySelector('i').classList.replace('fa-plus' , 'fa-minus')
        } else {
            description.style.height = '0px'
            item.querySelector('i').classList.replace('fa-minus' , 'fa-plus')
        }
        
        removeOpen(index)
    })
})

const removeOpen = (index1) => {
    accordionContent.forEach((item2,index2) => {
        if(index1 != index2) {
            item2.classList.remove('open')
            
            let desc = item2.querySelector('.description')
            desc.style.height = '0'
            item2.querySelector('i').classList.replace('fa-minus' , 'fa-plus')
            
        }
    })
}

if(document.body.classList.contains('no-scroll')){
    document.body.style.overflow = 'hidden'
}