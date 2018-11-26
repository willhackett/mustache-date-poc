# Mustache Functions POC

Mustache offers the ability to include functions.

Use pipes to separate arguments.

```js:
{{name}} - some date object is {{#d}}{{date}}||DD/MM/YYYY{{/d}}.

// Becomes:
// John S - some date object is 05/05/2005.
```

