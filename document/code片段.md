# 兼容性

```js
    function pauseEvent(e) {
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    }
```

```
var ev = ev || window.event 
document.documentElement.clientWidth || document.body.clientWidth 
var target = ev.srcElement||ev.target
```

# 异步

## **async**

```js

let a = async ()=>{
    let b =await new Promise((resolve,reject)=>{
        console.log(1)
        setTimeout(()=>{ console.log(5); resolve(1)},100)
    })
    console.log(2)
    return 6
}
a().then((value)=>{
console.log(value)
})
console.log(3)

//在async中将异步的代码同步执行
1 ​​​​​at ​quokka.js:5:8​

3 ​​​​​at ​quokka.js:14:0​

5 ​​​​​at ​quokka.js:6:8​

2 ​​​​​at ​quokka.js:8:4​

6 ​​​​​at ​​​value​​​ ​quokka.js:12:0​
//没有await
1 ​​​​​at ​quokka.js:5:8​

2 ​​​​​at ​quokka.js:8:4​

3 ​​​​​at ​quokka.js:14:0​

6 ​​​​​at ​​​value​​​ ​quokka.js:12:0​

5 ​​​​​at ​quokka.js:6:8​
```

```
1 ​​​​​at ​quokka.js:2:4​

4 ​​​​​at ​quokka.js:12:0​

2 ​​​​​at ​​​b​​​ ​quokka.js:4:4​

3 ​​​​​at ​​​c​​​ ​quokka.js:6:4​

5 ​​​​​at ​​​index​​​ ​quokka.js:10:4​
```

## **promise**

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

# 数组

- 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

  你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

  示例:

  给定 nums = [2, 7, 11, 15], target = 9

  因为 nums[0] + nums[1] = 2 + 7 = 9
  所以返回 [0, 1]

  ```js
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

- 数组去重

  ```
  
  ```

  

 # 字符串

 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

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

  # 编程题

## 快速排序

  > 采用二分法，取出中间数，数组每次和中间数比较，小的放到左边，大的放到右边

  **快速排序的思想很简单，整个排序过程只需要三步：**

  - （1）在数据集之中，找一个基准点
  - （2）建立两个数组，分别存储左边和右边的数组
  - （3）利用递归进行下次比较

  ```js
  var arr = [3, 1, 4, 6, 5, 7, 2];
  
  function quickSort(arr) {
      if(arr.length == 0) {
          return [];    // 返回空数组
      }
  
      var cIndex = Math.floor(arr.length / 2);
      var c = arr.splice(cIndex, 1);
      var l = [];
      var r = [];
  
      for (var i = 0; i < arr.length; i++) {
          if(arr[i] < c) {
              l.push(arr[i]);
          } else {
              r.push(arr[i]);
          }
      }
  
      return quickSort(l).concat(c, quickSort(r));
  }
  
  console.log(quickSort(arr));
  ```

  ## 递归

  ### 1.阶乘

  ```js
  const factorial = function(n) {
      if (n <= 1) {
          return 1;
      }
      return n * factorial(n - 1);
  }
  ```

  <img src="https://user-gold-cdn.xitu.io/2020/5/18/17226641e33cf0db?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="img" style="zoom:50%;" />

  f(6) = n * f(5)，所以 f(6) 需要拆解成 f(5) 子问题进行求解，以此类推 f(5) = n * f(4) ，也需要进一步拆分 ... 直到 f(1)，「这是递的过程。」 f(1) 解决后，依次可以解决f(2).... f(n)最后也被解决，「这是归的过程。」

  归无非就是把问题拆解成具有相同解决思路的子问题，直到最后被拆解的子问题不能够拆分，这个过程是“递”。当解决了最小粒度可求解的子问题后，在“归”的过程中顺其自然的解决了最开始的问题。

  **复杂度分析**

  - 空间复杂度为 O(n)
  - 时间复杂度 O(2^n)

  ```
  总时间 = 子问题个数 * 解决一个子问题需要的时间
  ```

  - 子问题个数即递归树中的节点总数 2^n
  - 解决一个子问题需要的时间，因为只有一个加法操作 `fib(n-1) + fib(n-2)` ，所以解决一个子问题的时间为 `O(1)`

  二者相乘，得出算法的时间复杂度为 `O(2^n)`

  ### 2.实现深拷贝

  ```js
  function deepClone(target, map = new WeakMap()) {
     if (typeof target === 'object') {
         let cloneTarget = Array.isArray(target) ? [] : {};
         if (map.get(target)) {
             return map.get(target);
         }
         map.set(target, cloneTarget);
         for (const key in target) {
             if (target.hasOwnProperty(key)) {
                 cloneTarget[key] = deepClone(target[key], map);
             }
         }
         return cloneTarget;
     } else {
         return target;
     }
  }
  复制代码
  ```

###   3.案例

- 使用递归实现`getElementsByClassName`

  ```js
  let arr = [];
     function byClass(node, className, arr){
         //得到传入节点的所有子节点
         var lists = node.childNodes;
         for(var i = 0;i< lists.length;i++){
             //判断是否有相同className元素
             if(arr[i],className == className){
                 arr.push(arr[i]);
             }
             //判断子节点是否还有子节点
             if(arr[i].childNodes.length > 0){
                 byClass(arr[i],className,arr);
             }
         }
     }
  复制代码
  ```

  - 有一堆桃子，每天吃掉一半，挑出一个坏的扔掉，第6天的时候发现还剩1个桃子，问原来有多少个桃子。

    ```js
    function fn(n){
        if(n===1){
            return 1
        }
        var a = (fn(n-1)+1)*2
        return a
    }
    console.log(fn(7)) //190
    ```

    

  

  

  

