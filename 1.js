$(document).ready(function () {

    function tampilNegara() {
        $.ajax({
            url: `https://restcountries.com/v3.1/all`,
            method: 'GET',
            success: function (data) {
                //urutkan abc
                data.sort((a, b) => a.name.common.localeCompare(b.name.common));
                //mengambil id country list 
                const countryList = $('#country-list');
                countryList.empty();

                data.forEach(function (country) {
                    const countryName = country.name.common;
                    const flag = country.flags.svg;
                    const capital = country.capital;
                    const region = country.region;
                    const population = country.population.toLocaleString();

                    //buat card, jika di klik maka akan ke 4.html
                    const countryCard = `
                        <div class="col-md-4 country-card">
                             <div class="card" style="cursor: pointer;" onclick="window.location='4.html?name=${(countryName)}&flag=${(flag)}&capital=${(capital)}&region=${(region)}&population=${population}'">
                                <img src="${flag}" class="card-img-top country-flag" alt="Bendera ${countryName}">
                                <div class="card-body">
                                    <h5 class="card-title">${countryName}</h5>
                                    <p class="card-text"><strong>Ibu Kota:</strong> ${capital}</p>
                                    <p class="card-text"><strong>Wilayah:</strong> ${region}</p>
                                    <p class="card-text"><strong>Populasi:</strong> ${population}</p>
                                </div>
                            </div>
                        </div>
                    `;

                    countryList.append(countryCard);
                });
            },
            error: function () {
                $('#country-list').html('<p>Gagal mengambil data negara.</p>');
            }
        });
    }
    //meanmpilkan hasil
    tampilNegara(); 
});
