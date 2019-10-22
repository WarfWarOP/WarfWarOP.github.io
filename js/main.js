$(document).ready(function() {
    
    
    let tirSize, // размер
        pricePaper = 0, //цена за бумагу
        priceForma = 0, // цена за форму
        pricePrint = 0, //цена за печать
        sum = 0, //итого
        color_format = "";

    let paperType = {
        "Выберите бумагу": 0,
        "Мелованная бумага (белая)": 6.8,
        "Бумага повышенной белизны (SPLENDORGEL)": 40.5,
        "Prestige Лён (белый)": 45
    };

    let colorType = {
        "Выберите цветность": { file: 0, print: 0, img: 'cv.jpg' },
        "Односторонняя черно-белая": { file: 14, print: 110, img: '1_0.png'},
        "Двусторонняя черно-белая": { file: 28, print: 220, img: '1_1.png'},
        "Односторонняя цветная": { file: 37, print: 110, img: '4_0.png'},
        "Цветная с лицевой, ч/б с оборотной": { file: 51, print: 220, img: '4_1.png'},
        "Двусторонняя цветная": { file: 74, print: 220, img: '4_4.png'}
    };
    
    selectColor();
    selectPaper();
    
    $('#tiraj').change(getSum);
    $('#typePapper').change(getSum);
    $('#typeColor').change(function() {
        getSum();
        
        $('.capt').hide()
        let id = $(this).val().split('|')[2]
        $(id).removeClass('d-none').show(300)
        
    });

    function getSum() {
        tirSize = +Math.ceil($('#tiraj').val() / 30);
        pricePaper = +$('#typePapper').val();
        priceForma = +$('#typeColor').find(':selected').attr('file');
        pricePrint = +$('#typeColor').find(':selected').attr('print');
        
        img = 'img/'+$('#typeColor').find(':selected').attr('img');
        sum = tirSize * pricePaper + priceForma + pricePrint * tirSize;
        $('.images img').attr('src', img);
        $('#total').html(sum);
    }
    
    function selectPaper() {
        let html = ``;
        for (type in paperType) {
            html += `<option value="${paperType[type]}">${type}</option>`;
        }
        $('#typePapper').html(html);
    }
    function selectColor() {
        let html = ``;
        for (type in colorType) {
            html += `<option file="${colorType[type]["file"]}" print="${colorType[type]["print"]}" img="${colorType[type]["img"]}">${type}</option>`;
        }
        $('#typeColor').html(html);
    }
});
