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