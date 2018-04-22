# react-rubber
Someting can be dragged and resized;

[Demo](https://codepen.io/xiaoshuang/pen/YLyxbZ)

## Installation

```sh
npm install --save react-rubber
```

## API 

### Drag

* onMoveStart: `PropTypes.func`.Trigger when `onMouseDown`.
* onMove: `PropTypes.func`.Trigger between `onMouseDown` and `onMouseUp`.
* onMoveEnd: `PropTypes.func`.Trigger when `onMouseUp`.

```jsx
/**
 * obj = {
 *   x: PropTypes.number,
 *   x: PropTypes.number,
 *   offsetX: PropTypes.number,
 *   offsetY: PropTypes.number,
 * }
 */

onMove = (obj = {}) => {
  console.log(obj);
}
```

### Box

* title: `PropTypes.node`.The content of the bar you can drag, hide the bar when `title === null`;
* clean: `PropTypes.bool`.Use the default style of Box. Default: `false`;
* controlled: `PropTypes.bool`.Controlled component or not. Default: `false`;
* onResize: `PropTypes.func`.Trigger when position or size change;
* rect: The state of box;

```jsx
/**
 * rect = {
 *   top: PropTypes.number,
 *   left: PropTypes.number,
 *   width: PropTypes.number,
 *   height: PropTypes.number,
 * }
 */

onResize = (rect = {}) => {
  console.log(rect);
}
```

### Mac
##### Something like the window of mac, base on Box;

* title: `PropTypes.node`.The content of the bar you can drag, hide the bar when `title === null`;
* controlled: `PropTypes.bool`.Controlled component or not. Default: `false`;
* visible: `PropTypes.bool`.Default: `true`;
* maximize: `PropTypes.bool`.Default: `false`;
* onClickClose: `PropTypes.func`;
* onClickMin: `PropTypes.func`;
* onClickMax: `PropTypes.func`;
* onDoubleClickTitle: `PropTypes.func`;

```jsx
// somethings convenient you can do with Mac;

Mac.open(...macProps)
Mac.close();

```




