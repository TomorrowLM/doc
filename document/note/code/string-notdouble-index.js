//给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
let s = "loveleetcode";
const tom = (s) => {
    let a = []
    let obj = {};
    a = s.split('')
    let b = a.map((value,index) =>{
        if(obj[value] == undefined){
            obj[value] = 1;
        }
        else    obj[value] += 1;
    })
    for(let i in s){
        console.log(i)
        
        if(obj[s[i]] == 1){
           
            return i
        }
    }
    console.log(obj)
}
console.log(tom(s))