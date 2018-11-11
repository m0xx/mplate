# mplate

Render template from command line. Supports multiple engines and is pipeable with your favorites tools!

## Supported template engine

- [ejs](https://ejs.co/) **default**
- [es6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [Handlebars](https://handlebarsjs.com/)

## Installation

    npm install -g mplate
    
## Usage

### Render template to file
Template `welcome.ejs`
```
Welcome <%= username %>!
```
Run:
```
mplate --context "{\"username\": \"admin\"}" -f welcome.ejs -o out.txt
```

### Render template from stream
Run:
```
echo "Welcome <%= username %>!" | mplate --context "{\"username\": \"admin\"}"
Welcome admin!
```
Run:
```
curl -s https://example.com/template/location.ejs | mplate --context "{\"username\": \"admin\"}"
Welcome admin!
```

### Use environment variables
Run:
```
echo "User home:<%= USER_HOME %>" | mplate --use-env
User home: ~/user/home
```

### Load context from file
Context file `context.yaml`
```yaml
user:
    name: admin
```
Run:
```
echo "Welcome <%= user.name %>!" | mplate --context-file context.yaml --context-format yaml
Welcome admin!
```
### Render with a different engine (handlebars)
Run:
```
echo "Welcome {{ username }}!" | mplate --context "{\"username\": \"admin\"}" --engine handlebars
Welcome admin!
```
