#![no_std]

// 1️⃣ External packages (crates) and internal modules import
use codec::{Decode, Encode};
use gstd::{
    debug, exec, msg,
    prelude::*,
    ActorId,
};
use scale_info::TypeInfo;

// 2️⃣ This defines the meta information about the contract
// for the Gear IDEA portal to parse.
// It also defines the communication interface via input / output fields.
gstd::metadata! {
    title: "Guestbook",
    handle:
        input: Action,
    state:
        output: Vec<Message>,
}

#[derive(Debug, TypeInfo, Decode)]
pub enum Action {
    AddMessage(String),
}

#[derive(Clone, Debug, Encode, TypeInfo)]
pub struct Message {
    autor: ActorId,
    text: String,
    timestamp: u32,
}

#[derive(Clone)]
pub struct State {
    messages: Vec<Message>,
}

impl State {
    pub const fn new() -> Self {
        Self {
            messages: Vec::new(),
        }
    }

    pub fn add_message(&mut self, message: Message) {
        self.messages.push(message);
    }
}

// 3️⃣ The state itself (i.e. the variable state will be accessed through)
static mut STATE: State = State::new();

// 5️⃣ Handle function that processes the incoming message
#[no_mangle]
pub unsafe extern "C" fn handle() {
    let action: Action = msg::load().unwrap();

    debug!("Received action: {:?}", action);

    match action {
        Action::AddMessage(text) => {
            let message = Message {
                autor: msg::source(),
                text: text,
                timestamp: exec::block_height(),
            };

            STATE.add_message(message.clone());

            msg::reply((), 0);

            debug!("Added new post: {:?}", message);
        }
    }
}

#[no_mangle]
pub unsafe extern "C" fn meta_state() -> *mut [i32; 2] {
    let messages: Vec<Message> = STATE.messages.clone();
    let encoded = messages.encode();
    let result = gstd::macros::util::to_wasm_ptr(&encoded[..]);
    core::mem::forget(encoded);

    result
}
