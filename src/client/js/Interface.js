
(async () => {

    const external = window.webkit
        ? (...args) => window.webkit.messageHandlers.external.postMessage(...args)
        : () => {};


    function setTitle(title){ external(`Change Title|${ title }`); }

    setTitle('Search');

    function byId(id){ return document.getElementById(id); }
    function query(selector){ return document.querySelector(selector); }


    const tabs = {
        view : byId('view'),
        list : byId('list')
    };

    const modes = {
        view : query('.mode > .view'),
        list : query('.mode > .list')
    };

    const diagram = query('#view > .diagram');
    const info = query('#view > .info');


    function useMode(mode){
        for(const type in tabs){
            const tab = tabs[type];
            tab.style.display = (mode === type)
                ? ''
                : 'none';
        }

        if(mode === 'list')
            setTitle('Search');
    }

    function inspect(id,pin){

        for(const element of document.querySelectorAll('[id^=pin-]'))
            element.style = '';

        const element = byId(id);
        element.style.fill = 'white';

        while(info.children[0])
            info.children[0]?.remove();

        function tag(value,color){
            const element = document.createElement('div');
            element.innerHTML = `<div>${ value }</div>`;
            element.style.backgroundColor = color;
            info.appendChild(element);
        }

        if(pin.Digital != undefined)
            tag(`Digital ${ pin.Digital }`,'#146eb5');

        if(pin.Analog != undefined)
            tag(`Analog ${ pin.Analog }`,'#ffc107');

        if(pin.UART)
            tag(`UART ${ pin.UART }`,'#00bcd4');

        if(pin.Type.includes('PWM'))
            tag('PWM','#464646');

        if(pin.Type.includes('GND'))
            tag('GND','black');

        if(pin.Type.includes('VIN'))
            tag('VIN','#fb2d2d');

        if(pin.VIN)
            tag(`VIN ${ pin.VIN }`,'#ffd54f');

        if(pin.Type.includes('Reset'))
            tag('Reset','orange');

        if(pin.Type.includes('MISO'))
            tag('MISO','gray');

        if(pin.Type.includes('MOSI'))
            tag('MOSI','gray');

        if(pin.Type.includes('SCK'))
            tag('SCK','gray');

        if(pin.Type.includes('None'))
            tag('None','red');

        if(pin.Type.includes('RCA Video Output'))
            tag('RCA Video Output','orange');

        if(pin.Supply)
            tag(`Supply ${ pin.Supply }V`,'#fb2d2d');

        if(pin.I2C)
            tag(`I2C ${ pin.I2C }`,'#ffd54f');

        if(pin.GPIO)
            tag(`GPIO ${ pin.GPIO }`,'purple');

        if(pin.Reference)
            tag(`${ pin.Reference } Reference`,'green');
    }


    /*
        Tabs
        Switch to the corresponding
        tab if the tabs button is
        pressed.
    */

    for(const mode in modes)
        modes[mode].addEventListener('click',() => useMode(mode));

    /*
        Boards
        Switch to the view tab
        if a board is selected.
    */

    Boards.forEach((board) => {

        const id = board.name.replaceAll(' ','_');

        const element = byId(id);

        element.addEventListener('click',() => {

            setTitle(board.name);

            fetch(`/svg/${ board.name }.svg`).then((response) => {
                response.text().then((text) => {
                    diagram.innerHTML = text;

                    fetch(`/board/${ board.name }.yaml`).then((response) => {
                        response.text().then((text) => {
                            console.log(text);
                            const board = YAML.eval(text);
                            console.log(board);

                            for(const id in board.pins){
                                const pin = board.pins[id];

                                const element = byId(id);

                                if(!element)
                                    console.log(`${ id } has no svg element`);

                                if(!Array.isArray(pin.Type))
                                    pin.Type = [ pin.Type ];

                                element?.addEventListener('click',() => {
                                    inspect(id,pin);
                                });
                            }
                        });
                    });
                });
            });

            useMode('view');
        });
    });


    /*
        Zoomable Diagram
    */

    diagram.addEventListener('wheel',(event) => {

        const { style } = diagram;

        let zoom = Number(style.zoom.substring(0,style.zoom.length - 1));

        zoom -= event.deltaY * .3;

        if(zoom < 100)
            zoom = 100;

        if(zoom > 200)
            zoom = 200;

        style.zoom = `${ zoom }%`;
    });


    /*
        Search
    */

    const input = query('.search > input');

    input.addEventListener('input',() => {
        const value = input.value
            .toLowerCase()
            .split(/[ -_]/g);

        console.log(value);

        Boards.forEach((board) => {

            const id = board.name.replaceAll(' ','_');

            const element = byId(id);

            const { search } = board;

            let partOf = false;

            for(const item of search)
                if(item.includes(value)){
                    partOf = true;
                    break;
                }

            element.style.display = partOf ? '' : 'none';
        });
    });

})();
