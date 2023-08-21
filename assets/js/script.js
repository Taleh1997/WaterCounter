const MAX_METER = 999999999;
const GALLON_TO_METER = 10;


/**
 * Funksiya istifadəçidən prompt vasitəsi ilə müəyyən suallar soruşur və əldə edilən məlumatları 
 * uyğun funksiyalara yönləndirir. Alınan cavabı isə alert vasitəsi ilə istifadəçiyə göstərir.
 * @returns {void} 
 */
const ask = () => {
    const customerCode = prompt('Müştəri kodunu daxil edin (r - əhali, c - kommersial, i - istehsalat)');
    const beginninMeter = parseInt(prompt('Sayğacın başlanğıc göstəricisini daxil edin (tam müsbət rəqəmlə)'));
    const endingMeter = parseInt(prompt('Sayğacın son göstəricisini daxil edin (tam müsbət rəqəmlə)'));

    if (!['r', 'c', 'i'].includes(customerCode)) {
        alert('İstifadəçi kodu səhvdir. r, c və ya i hərflərindən birini daxil edin.');
        return;
    }

    if (
        beginninMeter > MAX_METER ||
        beginninMeter < 0 ||
        endingMeter > MAX_METER ||
        endingMeter < 0 ||
        isNaN(beginninMeter) ||
        isNaN(endingMeter)
    ) {
        alert("Sayğacın başlanğıc və son göstəriciləri 999999999 böyük və ya mənfi ola bilməz!");
        return;
    }

    const gallon = getGallonByMeters(beginninMeter, endingMeter)
    let bill = 0;

    switch (customerCode) {
        case "r":
            bill = redientBill(gallon)
            break;
        case "c":
            bill = commercialBill(gallon)
            break;
        case "i":
            bill = industrialBill(gallon)
            break;
    }

    alert(getAccurateMessage(customerCode, beginninMeter, endingMeter, gallon, bill))
}

/**
 * Əhali üçün borcu qaytarır. Əhali kateqoriyasında olan müştəri 5$ və əlavə 
 * hər işlətdiyi gallon su üçün 0.0005$ pul ödəyir.
 * 
 * @param {number} gallon istifadə edilmiş suyun gallon ilə miqdarı
 * @returns {number} istifadə edilmiş suyun borcu
 */
const redientBill = (gallon) => {
    return (gallon * 0.0005) + 5;
}

/**
 * Kommersial müəssisələr üçün borcu qaytarır. Kommersial müştəri 4 milyon gallona
 * qədər 1000$ və ondan artıq işlətdiyi hər gallon üçün 0.00025$ pul ödəyir.
 * 
 * @param {number} gallon istifadə edilmiş suyun gallon ilə miqdarı
 * @returns {number} istifadə edilmiş suyun borcu
 */
const commercialBill = (gallon) => {
    if (gallon <= 4000_000) {
        return 1000;
    } else if (gallon > 4000_000) {
        return 1000 + ((gallon - 4000_000) * 0.00025);
    }
}

/**
 * İstehsalat müəssisələr üçün borcu qaytarır. Sənaye kateqoriyalı müştəri 4 milyon gallona
 * qədər 1000$, 4-dən 10 milyona qədər 2000$, ondan artıq işlətdiyi hər bir gallona görə isə
 * 0.00025$ pul ödəyir.
 * 
 * @param {number} gallon istifadə edilmiş suyun gallon ilə miqdarı
 * @returns {number} istifadə edilmiş suyun borcu
 */
const industrialBill = (gallon) => {
    if (gallon <= 4000_000) {
        return 1000;
    } else if (gallon > 4000_000 && gallon <= 10_000_000) {
        return 2000;
    } else if (gallon > 10_000_000) {
        return 2000 + ((gallon - 10_000_000) * 0.00025)
    }
}

/**
 * Başlanğıc və son göstəriciyə görə istifadə olunmuş suyun miqdarını hesablayıb
 * gallon ölçü vahidi ilə qaytarır
 * @param {number} beginninMeter 
 * @param {number} endingMeter 
 * @returns {number} sayğacın istifadəsini rəqəmlə qaytarır
 */
const getGallonByMeters = (beginninMeter, endingMeter) => {
    if (endingMeter > beginninMeter) {
        return (endingMeter - beginninMeter) / GALLON_TO_METER;
    } else if (endingMeter < beginninMeter) {
        return ((MAX_METER - beginninMeter) + endingMeter) / GALLON_TO_METER
    }
    return 0;
}

const getAccurateMessage = (customerCode, beginninMeter, endingMeter, totalUsage, bill) => {
    return `
    Customer code: ${customerCode}
    Beginning meter reading: ${beginninMeter}
    Ending meter reading: ${endingMeter}
    Gallons of water used: ${totalUsage} gallon
    Amount billed: $${bill}
    `;
}

ask();