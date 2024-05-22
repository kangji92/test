# test

console.log("aa");

var a = "https://script.google.com/macros/s/AKfycbygg0VWJDeGPmcKr3mKSc8DyPb_UQQ_2wqukRaBabdyCxf5CGGh4CenGUCo1XDuXm7KQQ/exec";

console.log(a) // {"myExample":"hi"}
console.log(window.btoa(a)); // ewogICAgIm15RXhhbXBsZSIgOiAiaGkiCn0=
console.log(window.atob(btoa(a))); // {"myExample":"hi"}

var c = "aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J5Z2cwVldKRGVHUG1jS3IzbUtTYzhEeVBiX1VRUV8yd3F1a1JhQmFiZHlDeGY1Q0dHaDRDZW5HVUNvMVhEdVhtN0tRUS9leGVj"

console.log("C>>", window.atob(btoa(a))); 
