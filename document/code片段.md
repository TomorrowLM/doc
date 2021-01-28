**async**

```js
let a = async function(){
    console.log(1) 
    let b = await 2;
    console.log(b)
    let c = await 3;
    console.log(c)
    return 5
}
a().then((index)=>{
    console.log(index)
})
console.log(4)
```

```
1 ​​​​​at ​quokka.js:2:4​

4 ​​​​​at ​quokka.js:12:0​

2 ​​​​​at ​​​b​​​ ​quokka.js:4:4​

3 ​​​​​at ​​​c​​​ ​quokka.js:6:4​

5 ​​​​​at ​​​index​​​ ​quokka.js:10:4​
```

**promise**

```js
let a = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log(3);
    resolve(2)
}, 1000);
});
a.then((index) => {
  console.log(index);
});
console.log(a);
```

```
1 ​​​​​at ​quokka.js:2:2​

Promise {} ​​​​​at ​​​a​​​ ​quokka.js:11:0​

3 ​​​​​at ​quokka.js:4:4​

2 ​​​​​at ​​​index​​​ ​quokka.js:9:2​
```

