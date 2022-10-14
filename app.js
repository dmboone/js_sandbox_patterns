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