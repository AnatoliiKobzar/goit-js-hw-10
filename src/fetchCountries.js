import Notiflix from 'notiflix';

function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1';
  const options = 'fields=name,capital,population,flags,languages';

  return fetch(`${BASE_URL}/name/${name}?${options}`).then(response => {
    console.log('response :>> ', response);
    if (!response.ok) {
      return Notiflix.Notify.failure(
        'Oops, there is no country with that name'
      );
    }
    return response.json();
  });
}

export { fetchCountries };
