let url = 'https://swapi.dev/api/people';

localStorage.hero = JSON.stringify([]);

let input_arr = []; 

const data = fetch(url, { 
    method: 'GET'});

class Person {
    constructor(name, gender, height, skin, birthday, planet) {
        this.name = name;
        this.gender = gender;
        this.height = height;
        this.skin = skin;
        this.birthday = birthday;
        this.planet = planet;
    }

    output_cards() {
        let character = document.createElement('div');
        character.classList.add('cards_styles');
        let main_container_card = document.querySelector('.main_container_card');
        main_container_card.append(character);
        
        let button_save = document.createElement('input');
        button_save.classList.add('button_save');
        button_save.setAttribute('type', 'button');
        button_save.setAttribute('value', 'Зберегти');
        button_save.setAttribute('id', this.name);

        let paragraph_name = document.createElement('p');
        let paragraph_gender = document.createElement('p');
        let paragraph_height = document.createElement('p');
        let paragraph_skin = document.createElement('p');
        let paragraph_birthday = document.createElement('p');
        let paragraph_planet = document.createElement('p');

        paragraph_name.classList.add('styles_paragraphs');
        paragraph_gender.classList.add('styles_paragraphs');
        paragraph_height.classList.add('styles_paragraphs');
        paragraph_skin.classList.add('styles_paragraphs');
        paragraph_birthday.classList.add('styles_paragraphs');
        paragraph_planet.classList.add('styles_paragraphs');

        character.append(paragraph_name, paragraph_gender, paragraph_height, paragraph_skin, paragraph_birthday, paragraph_planet);
        paragraph_name.innerText = `Name: ${this.name}`;
        paragraph_gender.innerText = `Gender: ${this.gender}`;
        paragraph_height.innerText = `Height: ${this.height}`;
        paragraph_skin.innerText = `Skin: ${this.skin}`;
        paragraph_birthday.innerText = `Birthday: ${this.birthday}`;
        paragraph_planet.innerText = `Planet: ${this.planet}`;

        paragraph_planet.append(button_save);
    }
}

let dataExtraction = data.then((element) => element.json());

dataExtraction.then((rez) => {

    rez.results.forEach(element => {
        let hero = new Person(
            element.name,
            element.gender,
            element.height,
            element.skin_color,
            element.birth_year,
            element.homeworld);

            hero.output_cards();
            input_arr.push(hero);
    });

});

document.querySelector('.main_container_card').addEventListener('click', (e) => {
    if (e.target.type === 'button') {
        input_arr.forEach((element) => {
            if(element.name === e.target.id) {
                let j = JSON.parse(localStorage.hero);
                j.push(element);
                localStorage.hero = JSON.stringify(j);
            }
        })
    }
})