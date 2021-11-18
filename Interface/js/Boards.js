
Boards = [{

    name : 'Arduino Uno',
    tags : [
        'Arduino',
        'Uno',
        'Microcontroller',
        'Atmel',
        'ATmega328'
    ]

},{

    name : 'Arduino Pro Mini',
    tags: [
        'Arduino',
        'Mini',
        'Microcontroller',
        'Atmel',
        'ATmega328'
    ]

},{

    name : 'Arduino Nano',
    tags: [
        'Arduino',
        'Nano',
        'Microcontroller',
        'Atmel',
        'ATmega328'
    ]

},{

    name : 'Raspberry Pi Zero',
    tags: [
        'Raspberry',
        'Pi',
        'Zero'
    ]

},{

    name : 'Teensy 4.0',
    tags: [
        'Teensy',
        '4.0'
    ]

}];

Boards.forEach((board) => {

    board.search = board.tags.map((tag) => {
        return tag.toLowerCase();
    });
});
