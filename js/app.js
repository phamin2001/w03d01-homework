let tomagotchi = class Tomagotchi {
    constructor(name) {
        this.hunger     = 5;
        this.sleepiness = 4;
        this.boredom    = 3;
        this.age        = 5;
        this.name       = name;
    }
}

let hungerTimer;
let ageTimer;
let sleepTimer;
let boredTimer;
let petTimer;
let morphFlag = false;

const stopTimer = () => {
    clearInterval(hungerTimer);
    clearInterval(ageTimer);
    clearInterval(sleepTimer);
    clearInterval(boredTimer);
    clearInterval(petTimer);
}

const dieFunction = (string) => {
    alert(`${tomagotchi.name} died from ${string} !!`);
    stopTimer();

}

const increaseHunger = () => {
    hungerTimer = setInterval((e) => {
        tomagotchi.hunger +=  0.3;
        tomagotchi.hunger = Number((tomagotchi.hunger).toFixed(1));
        displayHungerScore();
    }, 1500);
}

const increaseSleep = () => {
    sleepTimer = setInterval(() => {
        tomagotchi.sleepiness += 0.3;
        tomagotchi.sleepiness = Number((tomagotchi.sleepiness).toFixed(1));
        displaySleepScore();
    }, 900);
}

const increaseBored = () => {
    boredTimer = setInterval(() => {
        tomagotchi.boredom += 0.3;
        tomagotchi.boredom = Number((tomagotchi.boredom).toFixed(1));
        displayBoredomScore();
    }, 900);
}

const increaseAge = () => {
    ageTimer = setInterval(() => {
        tomagotchi.age += 0.5;
        displayAge();
        // if(tomagotchi.age > 7 && !morphFlag) {
        //     morphIt();
        // }
    }, 1100);
}

const feedMe = () => {
    tomagotchi.hunger -= 0.5;
    tomagotchi.hunger = Number((tomagotchi.hunger).toFixed(1));

    tomagotchi.sleepiness -= 0.7;
    tomagotchi.sleepiness = Number((tomagotchi.sleepiness).toFixed(1));

    tomagotchi.boredom -= 0.2;
    tomagotchi.boredom = Number((tomagotchi.boredom).toFixed(1));
}

const displayAge = () => {
    let $bar = $('#age-num');

    if(tomagotchi.age >= 15) {
        dieFunction('age');
        $('.feed-me').off()
    }

    $bar.text(tomagotchi.age);
}

const displayHungerScore = () => {
    let $bar = $('#hunger-score-bar');
    
    if(tomagotchi.hunger >= 10) {
        dieFunction('hunger');
        $('.feed-me').off()
    }
    if(tomagotchi.hunger <= 0) {
        tomagotchi.hunger = 0;
    }
    $('#hunger').text(tomagotchi.hunger);
    let width = (tomagotchi.hunger / 10) * 100;
    $bar.css({'width': width + '%'})
}

const displaySleepScore = () => {
    let $bar = $('#sleep-score-bar');

    if(tomagotchi.sleepiness >= 10) {
        dieFunction('sleep');
        $('.feed-me').off()
    }

    if(tomagotchi.sleepiness <= 0) {
        tomagotchi.sleepiness = 0;
    }

    $('#sleep').text(tomagotchi.sleepiness);
    let width = (tomagotchi.sleepiness / 10) * 100;
    $bar.css({'width': width + '%'})
}

const displayBoredomScore = () => {
    let $bar = $('#boredom-score-bar');

    if(tomagotchi.boredom >= 10) {
        dieFunction('bored');
        $('.feed-me').off()
    }

    if(tomagotchi.boredom <= 0) {
        tomagotchi.boredom = 0;
    }

    $('#boredom').text(tomagotchi.boredom);
    let width = (tomagotchi.boredom / 10) * 100;
    $bar.css({'width': width + '%'})
}

const light = () => {
    $('body').attr('id', "dimmer");

    setTimeout(function () {
        $('body').removeAttr('id');
    },500);
}

const setName = () => {
    tomagotchi = new tomagotchi(name); 
}

const getName = () => {
    name = prompt("Please Enter My Name", "Accitchi");
    setName(name);
}

const animation = () => {
    petTimer = setInterval( () => {
        $("#pet-live").animate({'margin-left': "+=500"}, 4000, () => {
            $('img').removeClass('mirror');
        });
        $("#pet-live").animate({'margin-left': "-=500"}, 4000, () => {
            $('img').addClass('mirror');
        });
    }, 1500);
}

const startGame = () => {
    getName();
    animation();
    displayHungerScore();
    displaySleepScore();
    displayBoredomScore();
    increaseHunger();
    increaseSleep();
    increaseBored();
    increaseAge();
}

$('.light').on('click', (e) => {
    light();
    console.log('light');
})

$('.feed-me').on('click', (e) => {
    feedMe();
})

$('.game').hide();

$('.start-screen').on('click',  (e) => {
    $(e.currentTarget).hide();
    $(".game").show();
    setTimeout(startGame, 500);
});