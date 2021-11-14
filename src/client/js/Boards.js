
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

}];

Boards.forEach((board) => {

    board.search = board.tags.map((tag) => {
        return tag.toLowerCase();
    });
});
