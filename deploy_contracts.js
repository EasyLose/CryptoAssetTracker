let numbers = [1, 2, 3, 4, 5];
let doubled = [];

for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}
```

```javascript
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(n => n * 2);
```

```javascript
for (let i = 0; i < myArray.length; i++) {
  // Operation on myArray[i]
}
```

```javascript
const length = myArray.length;
for (let i = 0; i < length; i++) {
  // Operation on myArray[i]
}