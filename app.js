// (function(){ // IIFE runs as soon as it is defined
//     // Declare private vars and functions

//     return{
//         // Declare public var and functions
//     }
// })();

// STANDARD MODULE PATTERN
const UICtrl = (function(){
    let text = 'Hello World';

    const changeText = function(){
        const element = document.querySelector('h1');
        element.textContent = text;
    }

    return{
        callChangeText: function(){
            changeText();
            console.log(text);
        }
    }
})();

UICtrl.callChangeText();

// REVEALING MODULAR PATTERN - directly reveals methods inside of the module
const ItemCtrl = (function(){
    let _data = []; // use underscores for private variables

    function add(item){
        _data.push(item);
        console.log('Item Added...');
    }

    function get(id){
        return _data.find(item => {
            return item.id === id;
        })
    }

    return { // reveal previous methods
        add: add,
        get: get,
    }
})();

ItemCtrl.add({id:1, name: 'John'});
console.log(ItemCtrl.get(1));

// SINGLETON PATTERN
const Singleton = (function(){
    let instance;

    function createInstance(){
        const object = new Object({name: 'Brad'});
        return object;
    }
    return{
        getInstance: function(){
            if(!instance){
                instance = createInstance();
            }
            return instance;
        }
    }
})();

const instanceA = Singleton.getInstance(); // only creates one instance no matter how many times you call
const instanceB = Singleton.getInstance();

console.log(instanceA === instanceB); // true

// FACTORY PATTERN - used to create multiple objects
function MemberFactory(){
    this.createMember = function(name, type){
        let member;

        if(type === 'simple'){
            member = new SimpleMembership(name);
        } else if (type === 'standard') {
            member = new StandardMembership(name);
        } else if (type === 'super') {
            member = new SuperMembership(name);
        }

        member.type = type;

        member.define = function(){
            console.log(`${this.name} (${this.type}): ${this.cost}`);
        }

        return member;
    }
}

const SimpleMembership = function(name){
    this.name = name;;
    this.cost = '$5';
}

const StandardMembership = function(name){
    this.name = name;;
    this.cost = '$15';
}

const SuperMembership = function(name){
    this.name = name;;
    this.cost = '$25';
}

const members = [];
const factory = new MemberFactory();

members.push(factory.createMember('John Doe', 'simple'));
members.push(factory.createMember('Chris Jackson', 'super'));
members.push(factory.createMember('Janice Williams', 'simple'));
members.push(factory.createMember('Tom Smith', 'standard'));

members.forEach(function(member){
    member.define();
});

// OBSERVER PATTERN
function EventObserver(){
    this.observers = [];
}

EventObserver.prototype = {
    subsribe: function(fn){
        this.observers.push(fn);
        console.log(`You are now subscribed to ${fn.name}`);
    },
    unsubsribe: function(fn){
        // Filter out from the list whatever matches the callback function.
        // If there is no match, the callback gets to stay on the list. The filter
        // returns a new list and reassigns the list of observers
        this.observers = this.observers.filter(function(item){
            if(item !== fn){
                return item;
            }
        });
        console.log(`You are now unsubcribed from ${fn.name}`);
    },
    fire: function(){
        this.observers.forEach(function(item){
            item.call();
        });
    }
}

const click = new EventObserver();

// Event Listeners
document.querySelector('.sub-ms').addEventListener('click', function(){
    click.subsribe(getCurMilliseconds);
});

document.querySelector('.unsub-ms').addEventListener('click', function(){
    click.unsubsribe(getCurMilliseconds);
});

document.querySelector('.sub-s').addEventListener('click', function(){
    click.subsribe(getCurSeconds);
});
document.querySelector('.unsub-s').addEventListener('click', function(){
    click.unsubsribe(getCurSeconds);
});

document.querySelector('.fire').addEventListener('click', function(){
    click.fire();
});

// Click Handlers
const getCurMilliseconds = function(){
    console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`);
}

const getCurSeconds = function(){
    console.log(`Current Seconds: ${new Date().getSeconds()}`);
}

// MEDIATOR PATTERN - we use a chatroom as an example
const User = function(name){
    this.name = name;
    this.chatroom = null;
}

User.prototype = {
    send: function(message, to){
        this.chatroom.send(message, this, to); // "this" is the user
    },
    receive: function(message, from){
        console.log(`${from.name} to ${this.name}: ${message}`);
    }
}

const Chatroom = function(){
    let users = {}; // list of users

    return {
        register: function(user){
            users[user.name] = user;
            user.chatroom = this;
        },
        send: function(message, from, to){
            if(to){ // single user message
                to.receive(message, from);
            }else{ // mass message
                for(key in users){
                    if(users[key] !== from){
                        users[key].receive(message, from);
                    }
                }
            }   
        }
    }
}

const brad = new User('Brad');
const jeff = new User('Jeff');
const sara = new User('Sara');

const chatroom = new Chatroom();

chatroom.register(brad);
chatroom.register(jeff);
chatroom.register(sara);

brad.send('Hello Jeff', jeff);
sara.send('Hello Brad, you are the best dev ever!', brad);
jeff.send('Hello Everyone!!!!');

// STATE PATTERN
const PageState = function(){
    let currentState = new homeState(this); // "this" refers to the PageState function

    this.init = function(){
        this.change(new homeState);
    }

    this.change = function(state){
        currentState = state;
    }
};

// Home State
const homeState = function(page){
    document.querySelector('#heading').textContent = null;
    document.querySelector('#content').innerHTML = `
    <div class="jumbotron">
        <h1 class="display-4">Hello, world!</h1>
        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr class="my-4">
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p class="lead">
            <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </p>
    </div>
    `;
};

// About State
const aboutState = function(page){
    document.querySelector('#heading').textContent = 'About Us';
    document.querySelector('#content').innerHTML = `
        <p>This is the about page</p>
    `;
}

// About State
const contactState = function(page){
    document.querySelector('#heading').textContent = 'Contact Us';
    document.querySelector('#content').innerHTML = `
        <form>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control">
            </div>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `;
};

// Instantiate pageState
const page = new PageState();

// Init the first state
page.init();

// UI Vars
const home = document.getElementById('home'),
about = document.getElementById('about'),
contact = document.getElementById('contact');

// Home
home.addEventListener('click', (e) => {
    page.change(new homeState);

    e.preventDefault();
});

// About
about.addEventListener('click', (e) => {
    page.change(new aboutState);

    e.preventDefault();
});

// Contact
contact.addEventListener('click', (e) => {
    page.change(new contactState);

    e.preventDefault();
});