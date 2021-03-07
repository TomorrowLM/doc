

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

编程：

- 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

  你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

  示例:

  给定 nums = [2, 7, 11, 15], target = 9

  因为 nums[0] + nums[1] = 2 + 7 = 9
  所以返回 [0, 1]

  ```
  const twoSum = (nums, target) => {
    const sortNums = Array.from(nums).sort((a, b) => a - b);
    let left = 0;
    let right = sortNums.length - 1;
    while (true) {
      const l = nums[left];
      const r = nums[right];
      const currentNum = l + r;
      if (currentNum === target) {
        return [left, right];
      } else if (currentNum > target) {
        right--;
      } else {
        left++;
      }
    }
  };
  ```

- 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

  ```js
  const firstUniqChar = (s) => {
    const position = new Map();
    for (let i of s) {
      if (position.has(i)) {
        position.set(i, position.get(i) + 1);
      } else {
        position.set(i, 1)
      }
    }
    for(let i = 0; i < s.length; i++) {  
      if (position.get(s[i]) === 1) 
        return i
    }
    return -1
  };
  //s = "leetcode"
  返回 0
  
  //s = "loveleetcode"
  返回 2
  
  ```

- ### 递归

  ### 

  

  

