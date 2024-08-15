# Notes

## Give option arguments to scripts in the `package.json`
To be able to give option arguments to scripts in the `package.json`, you have to prefix it with `--`.
For example:
```bash
npm run ts-node index.ts -- --option-without-argument --option-with-argument option-argument
```
Why do we need `--`?: 
That's a delimiter so everything after -- is treated as an argument to a script itself and is not parsed by npm.

## Generating `tsconfig.json`
After installing typescript, you generally run the `tsc --init` command for more clarity, the following is recommended:
```json
{
    // ..
    "scripts": {
        "tsc": "tsc"
    },
    // .. 
}
```
```bash
npm run tsc -- --init
```


