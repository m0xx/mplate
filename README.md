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
`./welcome.ejs`
```ejs
Welcome <%= username %>!
```
```bash
mplate --context "{\"username\": \"admin\"}" -f welcome.ejs -o out.txt
```

### Render template from stream
```bash
echo "Welcome <%= username %>!" | mplate --context "{\"username\": \"admin\"}"
Welcome admin!
```
From file server:
```bash
curl -s https://example.com/template/location.ejs | mplate --context "{\"username\": \"admin\"}"
Welcome admin!
```

### Use environment variables
```bash
echo "User home:<%= USER_HOME %>" | mplate --use-env
User home: ~/user/home
```

### Load context from file
`./context.yaml`
```yaml
user:
    name: admin
```

```bash
echo "Welcome <%= user.name %>!" | mplate --context-file context.yaml --context-format yaml
Welcome admin!
```
### Render with a different engine (handlebars)
```bash
echo "Welcome {{ username }}!" | mplate --context "{\"username\": \"admin\"}" --engine handlebars
Welcome admin!
```
