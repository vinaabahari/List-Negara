$(document).ready(function () {
    //mengambil link yang ada 'continent' nya di api
    const url = new URLSearchParams(window.location.search);
    const benua = url.get('continent');
    
    $('#continent-name').text(benua);

    //fungsi get benua
    function getBenua(benua) {
        $.ajax({
            url: 'https://restcountries.com/v3.1/region/' + (benua),
            method: 'GET',
            success: tampilkanBenua,
            error: function () {
                $('#country-list').html('<p>Gagal mengambil data negara.</p>');
            }
        });
    }
    
    //menampilkan list negara yang ada di benua
    function tampilkanBenua(countries) {
        //menghapus list benua 
        $('#country-list').empty(); 
        countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        //membuat card untuk setiap negara
        countries.forEach(country => {
            //mengambil data dari api
            const countryName = country.name.common;
            const flag = country.flags.svg; 
            const capital = country.capital ? country.capital[0] : 'Tidak diketahui';
            const population = country.population.toLocaleString();
            const region = country.region;

            //membuat card
            const card = `
                <div class="col-md-4 ">
                    <div class="card " style="cursor: pointer;" 
                         onclick="window.location='4.html?name=${(countryName)}&flag=${(flag)}&capital=${(capital)}&region=${(region)}&population=${population}'">
                        <img src="${flag}" class="card-img-top" alt="Flag of ${countryName}">
                        <div class="card-body">
                            <h5 class="card-title">${countryName}</h5>
                            <p class="card-text"><strong>Ibu Kota:</strong> ${capital}</p>
                            <p class="card-text"><strong>Wilayah:</strong> ${region}</p>
                            <p class="card-text"><strong>Populasi:</strong> ${population}</p>
                        </div>
                    </div>
                </div>
            `;
            //menambah card ke country list
            $('#country-list').append(card);
        });
    }
    getBenua(benua.toLowerCase());
});
