
Boards = [{

    name : 'Arduino Uno',
    tags : [
        'Arduino',
        'Uno',
        'Microcontroller',
        'Atmel',
        'Mega328P'
    ]

},{

    name : 'Arduino Nano',
    tags: [
        'Arduino',
        'Nano',
        'Microcontroller',
        'Atmel',
        'Mega328P'
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
