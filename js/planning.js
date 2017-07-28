//Sort functions from stack snippet in https://codegolf.stackexchange.com/questions/133754/one-oeis-after-another

Array.prototype.sortBy = function(f){
    return this.sort(
        function(a, b) {
            if (f) {
                a = f(a);
                b = f(b);
            }
            return (a > b) - (a < b);
        }
    );
};

function sortby(index) {
    var table = document.querySelector('#main-table');
    var _elements = table.querySelectorAll('#content-template tr');
    var elements = [];

    for (let i = 0; i < _elements.length; i++) {
        elements.push(_elements[i]);
    }

    elements.sortBy(function(a) {
        a = a.cells[index].innerText;
        return index == 0 ? a.toLowerCase() : Number(a);
    });

    for (let i = 0; i < elements.length; i++) {
        table.appendChild(elements[i]);
    }
}

function addItem() {
    
}