/*
* @fileoverview Module which provides methods to apply styles to elements.
* @author Arsalan Khan (https://github.com/i24k3)
* @version 1.0.0
* @license MIT
* @copyright (c) 2025 Arsalan Khan. All Rights Reserved.
*/

import { applyResponsiveStyles } from "./create.js";

/**
* Applies a set of CSS styles to an element selected by a query selector.
*
* @param {string} element - A string representing the CSS selector of the element to which the styles will be applied.
* @param {Object} styles - An object containing key-value pairs, where each key is a CSS property and each value is the corresponding style value.
*
* @throws {Warning} Logs a warning if the styles argument is not an object or if the element is not found.
*
* Example usage:
* style('#myDiv', { backgroundColor: 'red', color: 'white' });
* //"--OR--"
* style(select('someselector'), styleObj);
*/

function toNodeList(element) {
  if (element instanceof NodeList) {
    return element;
  }

  if (element instanceof Element) {
    return [element];
  }
  if (typeof element === 'string') {
    try {
      const foundElement = document.querySelectorAll(element);
      if (foundElement) {
        return foundElement;

      } else {
        console.log("The selector (id, class, node) string-name is invalid, no element found!");

      }
    } catch (error) {
      console.error("Invalid selector string:", error);
    }

  }
}

export function style(element, styles) {
  element = toNodeList(element);

  if (typeof styles === 'object' && styles !== null) {
    for (const styleProperty in styles) {
      if (styles.hasOwnProperty(styleProperty)) {
        element.forEach(element => {
          element.style[styleProperty] = styles[styleProperty];
        });
      }
    }
    if (styles.resp) {
      applyResponsiveStyles(htmlElement, styles.resp);
    }
  } else {
    console.warn(`
    The style method takes objects as arguements,
    'style(elementObj, styleObj);' please provide param of suitable datatype`);
  }
}

/**
* Applies a set of CSS styles to the current element (via `this`), typically used as an extension on `HTMLElement` objects.
*
* @param {Object} styles - An object containing key-value pairs, where each key is a CSS property and each value is the corresponding style value.
*
* @throws {Warning} Logs a warning if the styles argument is not an object.
*
* Example usage:
* element.setStyle({ backgroundColor: 'blue', color: 'yellow' });
* //"--OR--"
* element.setStyle(styleObj);
*/


export function setStyle(styles) {
  if (typeof styles === 'object' && styles !== null) {
    // Check if this is a single element or a NodeList
    if (this instanceof NodeList || this instanceof HTMLCollection) {
      // If it's a NodeList (or HTMLCollection), loop through and apply styles
      this.forEach(function (element) {
        element.setStyle(styles);
      });
    } else {
      // If it's a single element, apply styles directly
      this.style.cssText = '';  // Remove all existing inline styles

      for (const styleProperty in styles) {
        if (styles.hasOwnProperty(styleProperty)) {
          this.style[styleProperty] = styles[styleProperty];
        }
      }

      if (styles.resp) {
        applyResponsiveStyles(this, styles.resp);
      }
    }
  } else {
    console.warn("The setStyle method expects an object as an argument.");
  }
}

// Define the setStyle method on HTMLElement prototype
Object.defineProperty(HTMLElement.prototype, 'setStyle', {
  value: function (styles) {
    setStyle.call(this, styles);
  },
  writable: true,
  configurable: true
});

// Also define the setStyle method on NodeList (or HTMLCollection) prototype
Object.defineProperty(NodeList.prototype, 'setStyle', {
  value: function (styles) {
    setStyle.call(this, styles);
  },
  writable: true,
  configurable: true
});


