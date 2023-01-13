import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { refs } from './refs';
import Notiflix, { Notify } from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  const searchQuery = event.target.value.trim();
  if (searchQuery === '') {
    resetMarkup();
    return;
  }
  fetchCountries(searchQuery)
    .then(data => {
      if (data.length === 1) {
        renderMarkupOneCountry(data);
      }
      if (data.length >= 2 && data.length <= 10) {
        renderMarkupList(data);
      }
      if (data.length >= 11) {
        resetMarkup();
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      resetMarkup();
      console.log(error);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderMarkupOneCountry(data) {
  resetMarkup();

  const {
    flags: { svg },
    name: { official },
    capital,
    languages,
    population,
  } = data[0];

  const markupOneCountry = `<div class="container"><img src="${svg}" alt="${official}"  width="60px">
        <h2>${official}</h2></div>
        <h3>Capital: ${capital}</h3>
        <h3>Population: ${population}</h3>
        <h3>Languages: ${Object.values(languages)}</h3>`;

  refs.info.innerHTML = markupOneCountry;
}

function renderMarkupList(data) {
  resetMarkup();

  const country = data
    .map(
      info =>
        `<li class="list-item">
        <img src="${info.flags.svg}" alt="${info.name.official}" width="40px" height="22px">
        <h2>${info.name.official}</h2>
        </li>`
    )
    .join('');

  refs.list.innerHTML = country;
}

function resetMarkup() {
  refs.list.innerHTML = '';
  refs.info.innerHTML = '';
}
