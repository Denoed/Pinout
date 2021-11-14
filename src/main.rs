#![allow(non_snake_case)]


use std::process::Command;
use web_view::*;

use std::thread;
use std::time::Duration;


fn invoke_handler(wv: &mut WebView<()>, arg: &str) -> WVResult {

    println!("INVOKE: {}",arg);

    if arg.starts_with("Change Title|") {
        println!("Changing title to: {}",&arg[13..]);

        wv.set_title(&arg[13..]).unwrap();
    }

    Ok(())
}

fn main() {

    println!("Stopping Existing Process");

    let stopper = thread::spawn(|| {

        stopWebserver(||{ std::process::exit(1); });

        thread::sleep(Duration::from_millis(200));
    });

    stopper.join().unwrap();


    println!("Starting New Process");

    thread::spawn(||{ startWebserver(); });


    println!("STARTING WEBVIEW");

    let view = thread::spawn(|| {

        println!("Waiting for 1000");

        thread::sleep(Duration::from_millis(1000));

        println!("Waited 1000");

        let web = web_view::builder()
            .title("Pinout")
            .content(Content::Url("http://localhost:7805/"))
            .size(600,500)
            .debug(true)
            .user_data(())
            .invoke_handler(invoke_handler)
            .build()
            .unwrap();


        web.run().unwrap();
    });

    view.join().unwrap();

    println!("Stopping Existing Process");

    stopWebserver(||{});
}

fn startWebserver(){

    let mut command = Command::new("deno");
    command.arg("run");
    command.arg("--allow-net");
    command.arg("--allow-read=./");
    command.arg("--importmap=./src/server/Imports.json");
    command.arg("--unstable");
    command.arg("./src/server/Webserver.js");

    match command.spawn(){
        Ok(process) => println!("Webserver process: {}",process.id()),
        Err(exception) => {
            println!("Couldn't start webserver!\n{}",exception);
            std::process::exit(1);
        }
    }
}

fn stopWebserver<F:Fn()>(onError : F){

    let mut command = Command::new("wget");
    command.arg("http://localhost:7805/stop");

    match command.spawn(){
        Ok(_) => println!("Webserver closed"),
        Err(exception) => {
            println!("Couldn't close webserver: {}",exception);
            onError();
        }
    }
}
