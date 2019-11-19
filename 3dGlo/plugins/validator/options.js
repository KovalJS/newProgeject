const valid1 = new Validator ({
    selector : '#form1',
    pattern : {
        phone: /^\+380\d{7}$/
    },
    method : {
        'phone': [
            //пороверяет метод пустое поле млм нет
            ['notEmpty'],
            //метод pattern проверяет поле по определенному паттерну
            ['pattern', 'phone']
        ],

        'email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],

        'name': [
            ['notEmpty'],
            ['pattern', 'name']
        ],

        'message': [
            ['notEmpty'],
            ['pattern', 'message']
        ]
    }
});

valid1.init();

const valid2 = new Validator ({
    selector : '#form2',
    pattern : {
        phone: /^\+380\d{7}$/
    },
    method : {
        'phone': [
            //пороверяет метод пустое поле млм нет
            ['notEmpty'],
            //метод pattern проверяет поле по определенному паттерну
            ['pattern', 'phone']
        ],

        'email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],

        'name': [
            ['notEmpty'],
            ['pattern', 'name']
        ],

        'message': [
            ['notEmpty'],
            ['pattern', 'message']
        ]
    }
});


valid2.init();