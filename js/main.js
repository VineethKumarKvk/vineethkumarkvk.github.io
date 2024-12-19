(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    const calcExp = calculateExperienceInYears(new Date(2020, 9, 22)).toFixed(2)
    const expElem = document.getElementById('expElem');
    expElem.textContent = calcExp;

    $('[data-toggle="experience-counter-up"]').counterUp({
        delay: 5,         // Delay between each digit
        time: 2000,        // Total time for the animation
        decimal: '.',      // Decimal separator
        formatter: function (number) {
            // Ensure we handle decimal values correctly and return 2 decimals
            return parseFloat(number).toFixed(2); // Ensure 2 decimals are always shown
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: false
        });
    }


    // Smooth scrolling to section
    $(".btn-scroll").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 0
            }, 1500, 'easeInOutExpo');
        }
    });
    
    
    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Function to calculate experience in years (with fractional years)
    function calculateExperienceInYears(startDate) {
        const currentDate = new Date();

        // Get the difference in full years
        let years = currentDate.getFullYear() - startDate.getFullYear();

        // Calculate the difference in months
        let months = currentDate.getMonth() - startDate.getMonth();
        
        // Calculate the difference in days
        let days = currentDate.getDate() - startDate.getDate();

        // If the current month is before the start month, subtract 1 year
        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;  // Adjust months to be positive
        }

        // Calculate the fractional year (months/12)
        let fractionalYear = months / 12;

        // If there are days, we also need to account for them in the fractional year (days/365)
        let fractionalDays = days / 365;

        // Combine full years and fractional years
        let totalYears = years + fractionalYear + fractionalDays;

        return totalYears;
    }

    // Your start date (replace with the actual date you started, e.g., 15th May 2014)
    const startDate = new Date(2020, 9, 22); // Month is zero-based (0 = January, 4 = May)

    // Calculate the experience in years (rounded to the nearest year)
    document.addEventListener('DOMContentLoaded', function() {
        const experienceInYears = calculateExperienceInYears(startDate);

        // Round the result to the nearest whole number (optional, if you want to show full years only)
        // const roundedExperience = Math.round(experienceInYears);
        const roundedExperience = experienceInYears.toFixed(2);

        // Display the result
        document.getElementById('experience').textContent = `${roundedExperience} Years`;

    });

})(jQuery);

