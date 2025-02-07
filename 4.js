$(document).ready(function () {
    const url = new URLSearchParams(window.location.search);
    const countryName = url.get('name');

    $.ajax({
        url: 'https://restcountries.com/v3.1/name/' + (countryName),
        method: 'GET',
        success: function (data) {
            const country = data[0];
            const flag = country.flags.svg;
            const capital = country.capital;
            const region = country.region;
            const population = country.population.toLocaleString();
            const area = country.area.toLocaleString();
            const languages = country.languages ? Object.values(country.languages).join(', ') : 'Tidak diketahui';

            //mengambil  data dari html dan mengembalikan detail
            $('#country-name').text(countryName);
            $('#country-flag').attr('src', flag);
            $('#capital').text(capital);
            $('#region').text(region);
            $('#population').text(population);
            $('#area').text(area);
            $('#languages').text(languages);
        },
        error: function () {
            $('#country-details').html('<p>Gagal mengambil detail negara.</p>');
        }
    });
});
