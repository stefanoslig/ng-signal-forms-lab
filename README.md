
# ng-signal-forms-lab

## Commands
### Running the application 
`npm run start`

### Lint and Format
`npm run lint`
`npm run format`

### Running the Unit tests
`npm run test`

### Validate the architecture
`npx depcruise src --exclude '^(node_modules|e2e)'`

### See the architecture 
`npx depcruise src --exclude '^(node_modules|e2e)' --output-type ddot | dot -Tsvg > dependency-graph.html`

The above command generates an html file which you can open in your browser.

