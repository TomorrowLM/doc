let a = {'a':1,'b':2}
Object.defineProperty(a,'value',{
    value:22,
    enumerable:true
})
for(let i in a){
    console.log(i)
}
console.log(a);

let obj1 = Object.create({'c':1});
console.log(obj1)

