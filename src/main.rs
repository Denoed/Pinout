#![allow(non_snake_case)]


use std::process::Command;
use web_view::*;

use std::env;
use std::thread;
use std::time::Duration;



fn main() {

    let mut webserver : String = "".to_owned();

    match env::current_exe() {
        Ok(mut path) => {

            path.pop();

            match path.to_str() {
                Some(dir) => {
                    println!("Webserver Directory: {}",dir);
                    webserver = dir.to_owned();
                },
                None => println!("Source path not found")
            }
        },
        Err (e) => println!("Source path not found: {}",e)
    }


    println!("Stopping Existing Process");

    let stopper = thread::spawn(|| {

        stopWebserver(||{ std::process::exit(1); });

        thread::sleep(Duration::from_millis(200));
    });

    stopper.join().unwrap();


    println!("Starting New Process");


    thread::spawn(move ||{
        startWebserver(webserver);
    });


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
            .invoke_handler(handleBrowserEvents)
            .build()
            .unwrap();


        web.run().unwrap();
    });

    view.join().unwrap();

    println!("Stopping Existing Process");

    stopWebserver(||{});
}

fn startWebserver(dir : String){

    let server = [ dir.trim() , "/Webserver/Server.js" ].join("");
    let imports = [ "--importmap=" , dir.trim() , "/Webserver/Imports.json" ].join("");

    println!("server: {}",server);
    println!("imports: {}",imports);

    let mut command = Command::new("sh");

    command
            .arg("-c")
            .arg([
                "~/.deno/bin/deno run --allow-net --allow-read=" , dir.trim() , " " ,
                &imports , " --unstable " , &server
            ].join(""))
            .output()
            .expect("failed to execute process");

    match command.spawn(){
        Ok(process) => println!("Webserver process: {}",process.id()),
        Err(exception) => {
            println!("Couldn't start webserver!\n{}",exception);
            thread::sleep(Duration::from_millis(20000));
            std::process::exit(1);
        }
    }
}


/**
 *  Stop Webserver Process
 *  by sending a closing
 *  signal via pathname.
 */

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


/**
 *  Events
 *  Browser -> Application
 */

fn handleBrowserEvents(wv : & mut WebView<()>,arg : & str) -> WVResult {

    if arg.starts_with("Change Title|"){
        return wv.set_title(&arg[13..]);
    }

    Ok(())
}
