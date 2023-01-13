import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { refs } from './refs';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  const searchQuery = event.target.value;
  console.log(searchQuery);
  if (!searchQuery) {
    return;
  }
  fetchCountries(searchQuery)
    .then(data => {
      console.log(data.length);
      if (data.lenght === 1) {
        renderMarkupOneCountry(data);
      }
      if (data.lenght <= 2 && data.length >= 10) {
        renderMarkupList(data);
      }
    })
    .catch(error => console.log(error));
}

function renderMarkupOneCountry(data) {
  refs.info.innerHTML = '';
  refs.list.innerHTML = '';

  const {
    flags: { svg },
    name: { official },
    capital,
    languages,
    population,
  } = data[0];

  const markupOneCountry = `<img src="${svg}" alt="${official}"  width="40px">
        <h2>${official}</h2>
        <h3>Capital ${capital}</h3>
        <h3>Population ${population}</h3>
        <h3>Languages ${Object.values(languages)}</h3>`;

  refs.info.innerHTML = markupOneCountry;
}

function renderMarkupList(data) {
  refs.list.innerHTML = '';
  refs.info.innerHTML = '';

  const country = data
    .map(
      info =>
        `<li>
        <img src="${info.flags.svg}" alt="${info.name.official}"  width="40px">
        <h2>${info.name.official}</h2>
        <h3>Capital ${info.capital}</h3>
        <h3>Population ${info.population}</h3>
        <h3>Languages ${Object.values(info.languages)}</h3>
        </li>`
    )
    .join('');

  refs.list.innerHTML = country;
}
